import type { Ref } from 'vue'

import type {
  NucFriendshipRequestsInterface,
  NucUserRequestsInterface,
} from 'atomic'

export interface UseAddFriendInterface {
  searchEmail: Ref<string>
  friendship: NucFriendshipRequestsInterface
  users: NucUserRequestsInterface
}
