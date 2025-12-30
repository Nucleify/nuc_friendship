import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'

import * as atomic from 'atomic'

import { useAddFriend } from '.'

describe('useAddFriend', (): void => {
  let searchEmail: ReturnType<typeof ref<string>>
  let friendship: atomic.NucFriendshipRequestsInterface
  let users: atomic.NucUserRequestsInterface
  let useAddFriendInstance: ReturnType<typeof useAddFriend>

  beforeEach((): void => {
    searchEmail = ref('')
    friendship = atomic.friendshipRequests()
    users = atomic.userRequests()

    useAddFriendInstance = useAddFriend({
      searchEmail,
      friendship,
      users,
    })

    vi.clearAllMocks()
  })

  it('should return early when searchEmail is empty', async (): Promise<void> => {
    searchEmail.value = ''
    const getAllUsersSpy = vi.spyOn(users, 'getAllUsers')
    const sendRequestSpy = vi.spyOn(friendship, 'sendRequest')

    await useAddFriendInstance.handleAddFriend()

    expect(getAllUsersSpy).not.toHaveBeenCalled()
    expect(sendRequestSpy).not.toHaveBeenCalled()
  })

  it('should return early when searchEmail is only whitespace', async (): Promise<void> => {
    searchEmail.value = '   '
    const getAllUsersSpy = vi.spyOn(users, 'getAllUsers')
    const sendRequestSpy = vi.spyOn(friendship, 'sendRequest')

    await useAddFriendInstance.handleAddFriend()

    expect(getAllUsersSpy).not.toHaveBeenCalled()
    expect(sendRequestSpy).not.toHaveBeenCalled()
  })

  it('should send friend request when user is found', async (): Promise<void> => {
    searchEmail.value = 'test@example.com'
    const mockUser: atomic.NucUserObjectInterface = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      role: 'user',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    atomic.mockGlobalFetch(vi, [mockUser])
    const getAllUsersSpy = vi.spyOn(users, 'getAllUsers')
    const sendRequestSpy = vi.spyOn(friendship, 'sendRequest')

    await useAddFriendInstance.handleAddFriend()

    expect(getAllUsersSpy).toHaveBeenCalled()
    expect(sendRequestSpy).toHaveBeenCalledWith(1)
  })

  it('should handle case-insensitive email matching', async (): Promise<void> => {
    searchEmail.value = 'TEST@EXAMPLE.COM'
    const mockUser: atomic.NucUserObjectInterface = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      role: 'user',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    atomic.mockGlobalFetch(vi, [mockUser])
    const getAllUsersSpy = vi.spyOn(users, 'getAllUsers')
    const sendRequestSpy = vi.spyOn(friendship, 'sendRequest')

    await useAddFriendInstance.handleAddFriend()

    expect(getAllUsersSpy).toHaveBeenCalled()
    expect(sendRequestSpy).toHaveBeenCalledWith(1)
  })

  it('should return early when user is not found', async (): Promise<void> => {
    searchEmail.value = 'notfound@example.com'

    atomic.mockGlobalFetch(vi, [])
    const getAllUsersSpy = vi.spyOn(users, 'getAllUsers')
    const sendRequestSpy = vi.spyOn(friendship, 'sendRequest')

    await useAddFriendInstance.handleAddFriend()

    expect(getAllUsersSpy).toHaveBeenCalled()
    expect(sendRequestSpy).not.toHaveBeenCalled()
  })

  it('should return early when user has no id', async (): Promise<void> => {
    searchEmail.value = 'test@example.com'
    const mockUser = {
      name: 'Test User',
      email: 'test@example.com',
      role: 'user',
    } as unknown as atomic.NucUserObjectInterface

    atomic.mockGlobalFetch(vi, [mockUser])
    const getAllUsersSpy = vi.spyOn(users, 'getAllUsers')
    const sendRequestSpy = vi.spyOn(friendship, 'sendRequest')

    await useAddFriendInstance.handleAddFriend()

    expect(getAllUsersSpy).toHaveBeenCalled()
    expect(sendRequestSpy).not.toHaveBeenCalled()
  })

  it('should handle errors gracefully', async (): Promise<void> => {
    searchEmail.value = 'test@example.com'
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation()
    const getAllUsersSpy = vi
      .spyOn(users, 'getAllUsers')
      .mockRejectedValue(new Error('Network error'))

    await useAddFriendInstance.handleAddFriend()

    expect(getAllUsersSpy).toHaveBeenCalled()
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error adding friend:',
      expect.any(Error)
    )

    consoleErrorSpy.mockRestore()
  })
})
