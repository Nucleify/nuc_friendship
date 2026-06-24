import type { NucFriendshipObjectInterface } from 'nucleify'

export type FriendshipPopoverResults =
  | NucFriendshipObjectInterface[]
  | { value: NucFriendshipObjectInterface[] | undefined }

export interface UseFriendshipPopoverInterface {
  results: FriendshipPopoverResults
  acceptRequest: (senderId: number) => Promise<void>
  denyRequest: (senderId: number) => Promise<void>
  removeFriend: (friendId: number) => Promise<void>
  blockFriend: (friendId: number) => Promise<void>
  unblockFriend: (friendId: number) => Promise<void>
}
