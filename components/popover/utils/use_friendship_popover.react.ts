'use client'

import { useMemo, useState } from 'react'

import type {
  NucFriendshipTabType,
  UseFriendshipPopoverInterface,
} from 'nucleify'
import { readFriendshipPopoverResults } from 'nucleify'

export function useFriendshipPopover({
  results,
  acceptRequest,
  denyRequest,
  removeFriend,
  blockFriend,
  unblockFriend,
}: UseFriendshipPopoverInterface) {
  const [activeTab, setActiveTab] = useState<NucFriendshipTabType>('friends')

  const list = useMemo(() => readFriendshipPopoverResults(results), [results])

  const friends = useMemo(
    () => list.filter((f) => String(f.status).toLowerCase() === 'accepted'),
    [list]
  )

  const requests = useMemo(
    () =>
      list.filter(
        (f) =>
          String(f.status).toLowerCase() === 'pending' && f.incoming === true
      ),
    [list]
  )

  const blocked = useMemo(
    () => list.filter((f) => String(f.status).toLowerCase() === 'blocked'),
    [list]
  )

  async function handleAcceptRequest(senderId: number): Promise<void> {
    await acceptRequest(senderId)
  }

  async function handleDenyRequest(senderId: number): Promise<void> {
    await denyRequest(senderId)
  }

  async function handleRemoveFriend(friendId: number): Promise<void> {
    await removeFriend(friendId)
  }

  async function handleBlockFriend(friendId: number): Promise<void> {
    await blockFriend(friendId)
  }

  async function handleUnblockFriend(friendId: number): Promise<void> {
    await unblockFriend(friendId)
  }

  return {
    activeTab,
    setActiveTab,
    friends,
    requests,
    blocked,
    handleAcceptRequest,
    handleDenyRequest,
    handleRemoveFriend,
    handleBlockFriend,
    handleUnblockFriend,
  }
}
