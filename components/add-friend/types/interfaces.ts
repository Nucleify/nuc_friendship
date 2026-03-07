import type { Ref } from 'vue'

import type {
  NucFriendshipRequestsInterface,
  NucUserRequestsInterface,
} from 'nucleify'

export interface UseAddFriendInterface {
  searchEmail: Ref<string>
  friendship: NucFriendshipRequestsInterface
  users: NucUserRequestsInterface
}
