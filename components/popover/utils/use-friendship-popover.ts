import { computed, ref } from 'vue'

import type {
  NucFriendshipTabType,
  UseFriendshipPopoverInterface,
} from 'atomic'

export function useFriendshipPopover({
  results,
  acceptRequest,
  denyRequest,
  removeFriend,
  blockFriend,
  unblockFriend,
}: UseFriendshipPopoverInterface) {
  const activeTab = ref<NucFriendshipTabType>('friends')

  const friends = computed(
    () => results?.value?.filter((f) => f.status === 'accepted') ?? []
  )

  const requests = computed(
    () => results?.value?.filter((f) => f.status === 'pending') ?? []
  )

  const blocked = computed(
    () => results?.value?.filter((f) => f.status === 'blocked') ?? []
  )

  async function handleAcceptRequest(senderId: number) {
    await acceptRequest(senderId)
  }

  async function handleDenyRequest(senderId: number) {
    await denyRequest(senderId)
  }

  async function handleRemoveFriend(friendId: number) {
    await removeFriend(friendId)
  }

  async function handleBlockFriend(friendId: number) {
    await blockFriend(friendId)
  }

  async function handleUnblockFriend(friendId: number) {
    await unblockFriend(friendId)
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
