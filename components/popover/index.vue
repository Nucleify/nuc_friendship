<template>
  <div class="friendship-popover-container">
    <ad-heading
      :tag="3"
      text="Friends"
      class="friendship-header"
    />

    <div class="friendship-content">
      <nuc-friendship-add-friend />

      <nuc-friendship-tabs
        :active-tab="activeTab"
        @update:active-tab="activeTab = $event"
      />

      <nuc-friendship-friends-list
        v-if="activeTab === 'friends'"
        :friends="friends"
        @block="handleBlockFriend"
        @remove="handleRemoveFriend"
      />

      <nuc-friendship-requests-list
        v-if="activeTab === 'requests'"
        :requests="requests"
        @accept="handleAcceptRequest"
        @deny="handleDenyRequest"
      />

      <nuc-friendship-blocked-list
        v-if="activeTab === 'blocked'"
        :blocked="blocked"
        @unblock="handleUnblockFriend"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { friendshipRequests } from 'nucleify'

import { useFriendshipPopover } from './utils'

const {
  results,
  acceptRequest,
  denyRequest,
  removeFriend,
  blockFriend,
  unblockFriend,
  getAllFriendships,
} = friendshipRequests()

const {
  activeTab,
  friends,
  requests,
  blocked,
  handleAcceptRequest,
  handleDenyRequest,
  handleRemoveFriend,
  handleBlockFriend,
  handleUnblockFriend,
} = useFriendshipPopover({
  results,
  acceptRequest,
  denyRequest,
  removeFriend,
  blockFriend,
  unblockFriend,
})

onMounted(() => {
  getAllFriendships()
})
</script>

<style lang="scss">
@import 'index';
</style>
