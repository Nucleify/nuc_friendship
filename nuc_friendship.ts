import type { App } from 'vue'

import {
  NucFriendItem,
  NucFriendship,
  NucFriendshipAddFriend,
  NucFriendshipBlockedList,
  NucFriendshipFriendsList,
  NucFriendshipPopover,
  NucFriendshipRequestsList,
  NucFriendshipTabs,
} from 'nucleify'

export function registerNucFriendship(app: App<Element>): void {
  app
    .component('nuc-friendship', NucFriendship)
    .component('nuc-friendship-popover', NucFriendshipPopover)
    .component('nuc-friendship-add-friend', NucFriendshipAddFriend)
    .component('nuc-friendship-tabs', NucFriendshipTabs)
    .component('nuc-friendship-friends-list', NucFriendshipFriendsList)
    .component('nuc-friendship-requests-list', NucFriendshipRequestsList)
    .component('nuc-friendship-blocked-list', NucFriendshipBlockedList)
    .component('nuc-friend-item', NucFriendItem)
}
