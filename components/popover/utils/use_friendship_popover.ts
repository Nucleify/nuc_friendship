import { computed, ref } from 'vue'

import type { NucFriendshipTabType } from '../../tabs/types/variables'
import type { GetFriendshipApi } from '../types/interfaces'

export function useFriendshipPopover(getFriendshipApi: GetFriendshipApi) {
  const activeTab = ref<NucFriendshipTabType>('friends')

  const friends = computed(() => {
    const list = getFriendshipApi().results.value ?? []
    return list.filter((f) => String(f.status).toLowerCase() === 'accepted')
  })

  const requests = computed(() => {
    const list = getFriendshipApi().results.value ?? []
    return list.filter(
      (f) => String(f.status).toLowerCase() === 'pending' && f.incoming === true
    )
  })

  const blocked = computed(() => {
    const list = getFriendshipApi().results.value ?? []
    return list.filter((f) => String(f.status).toLowerCase() === 'blocked')
  })

  async function handleAcceptRequest(senderId: number | string) {
    await getFriendshipApi().acceptRequest(senderId)
  }

  async function handleDenyRequest(senderId: number | string) {
    await getFriendshipApi().denyRequest(senderId)
  }

  async function handleRemoveFriend(friendId: number | string) {
    await getFriendshipApi().removeFriend(friendId)
  }

  async function handleBlockFriend(friendId: number | string) {
    await getFriendshipApi().blockFriend(friendId)
  }

  async function handleUnblockFriend(friendId: number | string) {
    await getFriendshipApi().unblockFriend(friendId)
  }

  return {
    activeTab,
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
