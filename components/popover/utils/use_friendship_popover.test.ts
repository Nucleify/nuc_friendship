import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'

import * as nucleify from 'nucleify'

import { useFriendshipPopover } from '.'

describe('useFriendshipPopover', (): void => {
  let results: ReturnType<typeof ref<nucleify.NucFriendshipObjectInterface[]>>
  let friendship: nucleify.NucFriendshipRequestsInterface
  let useFriendshipPopoverInstance: ReturnType<typeof useFriendshipPopover>

  const mockFriendshipAccepted: nucleify.NucFriendshipObjectInterface = {
    id: 1,
    friend: {
      id: 2,
      name: 'Friend 1',
      email: 'friend1@example.com',
      role: 'user',
    },
    status: 'accepted',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  const mockFriendshipPending: nucleify.NucFriendshipObjectInterface = {
    id: 2,
    friend: {
      id: 3,
      name: 'Friend 2',
      email: 'friend2@example.com',
      role: 'user',
    },
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  const mockFriendshipBlocked: nucleify.NucFriendshipObjectInterface = {
    id: 3,
    friend: {
      id: 4,
      name: 'Friend 3',
      email: 'friend3@example.com',
      role: 'user',
    },
    status: 'blocked',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  beforeEach((): void => {
    vi.clearAllMocks()
    nucleify.mockGlobalFetch(vi, [])

    friendship = nucleify.friendshipRequests()
    results = friendship.results

    results.value = [
      mockFriendshipAccepted,
      mockFriendshipPending,
      mockFriendshipBlocked,
    ]

    useFriendshipPopoverInstance = useFriendshipPopover({
      results,
      acceptRequest: friendship.acceptRequest,
      denyRequest: friendship.denyRequest,
      removeFriend: friendship.removeFriend,
      blockFriend: friendship.blockFriend,
      unblockFriend: friendship.unblockFriend,
    })
  })

  it('should initialize activeTab as friends', (): void => {
    expect(useFriendshipPopoverInstance.activeTab.value).toBe('friends')
  })

  it('should filter friends correctly', (): void => {
    expect(useFriendshipPopoverInstance.friends.value).toEqual([
      mockFriendshipAccepted,
    ])
  })

  it('should filter requests correctly', (): void => {
    expect(useFriendshipPopoverInstance.requests.value).toEqual([
      mockFriendshipPending,
    ])
  })

  it('should filter blocked correctly', (): void => {
    expect(useFriendshipPopoverInstance.blocked.value).toEqual([
      mockFriendshipBlocked,
    ])
  })

  it('should return empty array when results is undefined', (): void => {
    results.value =
      undefined as unknown as nucleify.NucFriendshipObjectInterface[]

    expect(useFriendshipPopoverInstance.friends.value).toEqual([])
    expect(useFriendshipPopoverInstance.requests.value).toEqual([])
    expect(useFriendshipPopoverInstance.blocked.value).toEqual([])
  })

  it('should return empty array when results is empty', (): void => {
    results.value = []

    expect(useFriendshipPopoverInstance.friends.value).toEqual([])
    expect(useFriendshipPopoverInstance.requests.value).toEqual([])
    expect(useFriendshipPopoverInstance.blocked.value).toEqual([])
  })

  function createTestInstance(
    methodName:
      | 'acceptRequest'
      | 'denyRequest'
      | 'removeFriend'
      | 'blockFriend'
      | 'unblockFriend'
  ) {
    const testFriendship = nucleify.friendshipRequests()
    const spy = vi.spyOn(testFriendship, methodName)
    const instance = useFriendshipPopover({
      results,
      acceptRequest: testFriendship.acceptRequest,
      denyRequest: testFriendship.denyRequest,
      removeFriend: testFriendship.removeFriend,
      blockFriend: testFriendship.blockFriend,
      unblockFriend: testFriendship.unblockFriend,
    })
    return { instance, spy }
  }

  it('should call acceptRequest when handleAcceptRequest is called', async (): Promise<void> => {
    const { instance, spy } = createTestInstance('acceptRequest')
    await instance.handleAcceptRequest(1)
    expect(spy).toHaveBeenCalledWith(1)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should call denyRequest when handleDenyRequest is called', async (): Promise<void> => {
    const { instance, spy } = createTestInstance('denyRequest')
    await instance.handleDenyRequest(2)
    expect(spy).toHaveBeenCalledWith(2)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should call removeFriend when handleRemoveFriend is called', async (): Promise<void> => {
    const { instance, spy } = createTestInstance('removeFriend')
    await instance.handleRemoveFriend(3)
    expect(spy).toHaveBeenCalledWith(3)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should call blockFriend when handleBlockFriend is called', async (): Promise<void> => {
    const { instance, spy } = createTestInstance('blockFriend')
    await instance.handleBlockFriend(4)
    expect(spy).toHaveBeenCalledWith(4)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should call unblockFriend when handleUnblockFriend is called', async (): Promise<void> => {
    const { instance, spy } = createTestInstance('unblockFriend')
    await instance.handleUnblockFriend(5)
    expect(spy).toHaveBeenCalledWith(5)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should update filtered lists when results change', (): void => {
    const newFriendship: nucleify.NucFriendshipObjectInterface = {
      id: 4,
      friend: {
        id: 5,
        name: 'Friend 4',
        email: 'friend4@example.com',
        role: 'user',
      },
      status: 'accepted',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    results.value = [newFriendship]

    expect(useFriendshipPopoverInstance.friends.value).toEqual([newFriendship])
    expect(useFriendshipPopoverInstance.requests.value).toEqual([])
    expect(useFriendshipPopoverInstance.blocked.value).toEqual([])
  })
})
