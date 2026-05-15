import type {
  EntityResultsType,
  LoadingRefType,
  NucFriendshipObjectInterface,
} from 'nucleify'

export interface NucFriendshipRequestsInterface {
  results: EntityResultsType<NucFriendshipObjectInterface>
  loading: LoadingRefType
  getAllFriendships: (loading?: boolean) => Promise<void>
  sendRequest: (recipientId: number | string) => Promise<void>
  acceptRequest: (senderId: number | string) => Promise<void>
  denyRequest: (senderId: number | string) => Promise<void>
  removeFriend: (friendId: number | string) => Promise<void>
  blockFriend: (friendId: number | string) => Promise<void>
  unblockFriend: (friendId: number | string) => Promise<void>
}
