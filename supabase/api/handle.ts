import type {
  ApiContext,
  ApiHandlerResult,
} from '../../../../nuxt/server/api/_types'
import { formatRowResponseTimestamps } from '../../../../nuxt/server/api/format_timestamptz_response'
import { gatewayUserFromJwt } from '../../../../nuxt/server/api/gateway_auth'

type FriendshipRow = Record<string, unknown>

function normalizeUuid(v: unknown): string {
  if (v == null || v === '') return ''
  return String(v).trim()
}

/** Sender/initiator side (legacy: requester_id or sender_id). */
function primaryParticipantId(row: FriendshipRow): string {
  const req = row.requester_id
  if (req != null && req !== '') return normalizeUuid(req)
  return normalizeUuid(row.sender_id)
}

function recipientParticipantId(row: FriendshipRow): string {
  return normalizeUuid(row.recipient_id)
}

/** Other party relative to the authenticated user. */
function computeFriendUserId(row: FriendshipRow, selfId: string): string {
  const self = normalizeUuid(selfId)
  const a = primaryParticipantId(row)
  const b = recipientParticipantId(row)
  if (a === self) return b
  if (b === self) return a
  return b || a
}

async function fetchFriendProfiles(
  supabase: ApiContext['supabase'],
  ids: string[]
): Promise<Map<string, Record<string, unknown>>> {
  const uniq = [...new Set(ids.filter(Boolean))]
  if (uniq.length === 0) return new Map()
  const { data, error } = await supabase
    .from('user_profiles')
    .select('id,name,email,role')
    .in('id', uniq)
  if (error || !data) return new Map()
  const m = new Map<string, Record<string, unknown>>()
  for (const row of data) {
    const r = row as Record<string, unknown>
    const id = normalizeUuid(r.id)
    if (id) m.set(id, r)
  }
  return m
}

async function listRowsForUser(
  supabase: ApiContext['supabase'],
  userId: string
): Promise<{ rows: FriendshipRow[]; error: string | null }> {
  const uid = normalizeUuid(userId)
  const orFilter = `recipient_id.eq.${uid},sender_id.eq.${uid},requester_id.eq.${uid}`
  const { data, error } = await supabase
    .from('friendships')
    .select('*')
    .or(orFilter)
    .order('created_at', { ascending: false })
  if (error) return { rows: [], error: error.message }
  return { rows: (data ?? []) as FriendshipRow[], error: null }
}

async function deleteFriendshipsBetween(
  supabase: ApiContext['supabase'],
  userId: string,
  otherId: string
): Promise<{ error: string | null }> {
  const uid = normalizeUuid(userId)
  const oid = normalizeUuid(otherId)
  const { rows, error } = await listRowsForUser(supabase, uid)
  if (error) return { error }
  const ids = rows
    .filter((r) => computeFriendUserId(r, uid) === oid)
    .map((r) => r.id)
    .filter((id) => id != null)
  if (ids.length === 0) return { error: null }
  const { error: delErr } = await supabase
    .from('friendships')
    .delete()
    .in('id', ids as number[])
  return { error: delErr?.message ?? null }
}

async function updateFriendshipsBetween(
  supabase: ApiContext['supabase'],
  userId: string,
  otherId: string,
  patch: Record<string, unknown>
): Promise<{ error: string | null }> {
  const uid = normalizeUuid(userId)
  const oid = normalizeUuid(otherId)
  const { rows, error } = await listRowsForUser(supabase, uid)
  if (error) return { error }
  const ids = rows
    .filter((r) => computeFriendUserId(r, uid) === oid)
    .map((r) => r.id)
    .filter((id) => id != null)
  if (ids.length === 0) return { error: null }
  const { error: upErr } = await supabase
    .from('friendships')
    .update(patch)
    .in('id', ids as number[])
  return { error: upErr?.message ?? null }
}

export async function handleFriendshipApi(
  ctx: ApiContext
): Promise<ApiHandlerResult> {
  const { segments, method, supabase, ok } = ctx
  if (segments[0] !== 'friendship') return { handled: false }

  const auth = await gatewayUserFromJwt(supabase, ctx.event)
  if ('error' in auth)
    return {
      handled: true,
      status: auth.status,
      body: { error: auth.error },
    }

  const userId = normalizeUuid(auth.user.id)

  /** GET /friendship/all — tylko znajomości zalogowanego użytkownika (jak Laravel auth()->user()). */
  if (segments[1] === 'all' && method === 'GET') {
    const { rows, error } = await listRowsForUser(supabase, userId)
    if (error) return { handled: true, status: 500, body: { error } }

    const friendIds = rows.map((r) => computeFriendUserId(r, userId))
    const profiles = await fetchFriendProfiles(supabase, friendIds)

    const items = rows.map((r) => {
      const formatted = formatRowResponseTimestamps(r) as Record<
        string,
        unknown
      >
      const fid = computeFriendUserId(r, userId)
      const prof = profiles.get(fid) ?? {}
      const stat = String(formatted.status ?? '')
      const incoming =
        recipientParticipantId(r as FriendshipRow) === userId &&
        stat === 'pending'
      return {
        id: formatted.id,
        friend: {
          id: fid,
          name: String((prof as Record<string, unknown>).name ?? ''),
          email: String((prof as Record<string, unknown>).email ?? ''),
          role: String((prof as Record<string, unknown>).role ?? 'user'),
        },
        status: formatted.status,
        incoming,
        created_at: formatted.created_at,
        updated_at: formatted.updated_at,
      }
    })

    return { handled: true, body: ok(items) }
  }

  /** POST /friendship/send-request/:recipientId */
  if (segments[1] === 'send-request' && method === 'POST' && segments[2]) {
    const recipientId = normalizeUuid(segments[2])
    if (!recipientId || recipientId === userId)
      return {
        handled: true,
        status: 422,
        body: { error: 'Invalid recipient' },
      }

    const { data: target } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('id', recipientId)
      .maybeSingle()
    if (!target)
      return { handled: true, status: 404, body: { error: 'User not found' } }

    const { rows: existingRows } = await listRowsForUser(supabase, userId)
    const already = existingRows.some(
      (r) => computeFriendUserId(r, userId) === recipientId
    )
    if (already)
      return {
        handled: true,
        status: 409,
        body: { error: 'Friendship already exists' },
      }

    const insertRow: Record<string, unknown> = {
      recipient_id: recipientId,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    insertRow.requester_id = userId
    insertRow.sender_id = userId

    const { error } = await supabase.from('friendships').insert(insertRow)
    if (error)
      return { handled: true, status: 400, body: { error: error.message } }

    return {
      handled: true,
      body: { message: 'Friend request sent successfully' },
    }
  }

  /** POST /friendship/accept-request/:senderId */
  if (segments[1] === 'accept-request' && method === 'POST' && segments[2]) {
    const senderId = normalizeUuid(segments[2])
    const { rows: pending } = await listRowsForUser(supabase, userId)
    const toAccept = pending.filter(
      (r) =>
        String(r.status) === 'pending' &&
        recipientParticipantId(r) === userId &&
        primaryParticipantId(r) === senderId
    )
    const ids = toAccept.map((r) => r.id).filter((id) => id != null) as number[]
    if (ids.length === 0)
      return {
        handled: true,
        status: 404,
        body: { error: 'No pending request found' },
      }

    const { error } = await supabase
      .from('friendships')
      .update({
        status: 'accepted',
        updated_at: new Date().toISOString(),
      })
      .in('id', ids)

    if (error)
      return { handled: true, status: 400, body: { error: error.message } }

    return {
      handled: true,
      body: { message: 'Friend request accepted successfully' },
    }
  }

  /** POST /friendship/deny-request/:senderId */
  if (segments[1] === 'deny-request' && method === 'POST' && segments[2]) {
    const senderId = normalizeUuid(segments[2])
    const { rows: pending } = await listRowsForUser(supabase, userId)
    const toDeny = pending.filter(
      (r) =>
        String(r.status) === 'pending' &&
        recipientParticipantId(r) === userId &&
        primaryParticipantId(r) === senderId
    )
    const ids = toDeny.map((r) => r.id).filter((id) => id != null) as number[]
    if (ids.length === 0)
      return {
        handled: true,
        status: 404,
        body: { error: 'No pending request found' },
      }

    const { error } = await supabase.from('friendships').delete().in('id', ids)
    if (error)
      return { handled: true, status: 400, body: { error: error.message } }

    return {
      handled: true,
      body: { message: 'Friend request denied successfully' },
    }
  }

  /** DELETE /friendship/remove/:friendId */
  if (segments[1] === 'remove' && method === 'DELETE' && segments[2]) {
    const friendId = normalizeUuid(segments[2])
    const { error } = await deleteFriendshipsBetween(supabase, userId, friendId)
    if (error) return { handled: true, status: 400, body: { error } }

    return {
      handled: true,
      body: { message: 'Friend removed successfully' },
    }
  }

  /** POST /friendship/block/:friendId */
  if (segments[1] === 'block' && method === 'POST' && segments[2]) {
    const friendId = normalizeUuid(segments[2])
    const { error } = await updateFriendshipsBetween(
      supabase,
      userId,
      friendId,
      {
        status: 'blocked',
        updated_at: new Date().toISOString(),
      }
    )
    if (error) return { handled: true, status: 400, body: { error } }

    return {
      handled: true,
      body: { message: 'Friend blocked successfully' },
    }
  }

  /** DELETE /friendship/unblock/:friendId */
  if (segments[1] === 'unblock' && method === 'DELETE' && segments[2]) {
    const friendId = normalizeUuid(segments[2])
    const { rows } = await listRowsForUser(supabase, userId)
    const blocked = rows.filter(
      (r) =>
        String(r.status) === 'blocked' &&
        computeFriendUserId(r, userId) === friendId
    )
    const ids = blocked.map((r) => r.id).filter((id) => id != null) as number[]
    if (ids.length === 0)
      return {
        handled: true,
        status: 404,
        body: { error: 'No blocked friendship found' },
      }

    const { error } = await supabase.from('friendships').delete().in('id', ids)
    if (error)
      return { handled: true, status: 400, body: { error: error.message } }

    return {
      handled: true,
      body: { message: 'Friend unblocked successfully' },
    }
  }

  return { handled: true, status: 405, body: { error: 'Method not allowed' } }
}
