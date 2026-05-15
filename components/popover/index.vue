<template>
  <div class="friendship-popover-container">
    <ad-heading :tag="3" text="Friends" class="friendship-header" />

    <div class="friendship-content">
      <nuc-friendship-add-friend :friendship-requests="friendship" />

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
import type { NucFriendshipRequestsInterface } from '../../atomic/bosons/types/api/interfaces'

import { useFriendshipPopover } from './utils'

/** Jedna instancja z `NucFriendship` (prop) — bez inject przez Teleport. */
const props = defineProps<{
  friendshipRequests: NucFriendshipRequestsInterface
}>()

const friendship = props.friendshipRequests

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
} = useFriendshipPopover(() => props.friendshipRequests)
</script>

<style lang="scss">
@import 'index';
</style>
