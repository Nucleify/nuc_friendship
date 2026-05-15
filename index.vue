<template>
  <ad-popover
    dismissable
    icon="prime:users"
    :position="position"
    popover-class="friendship-popover"
    :button-text="isMobile() ? '' : 'Friends'"
    button-class="friendship-popover-toggle"
    @show="syncFriendships"
  >
    <nuc-friendship-popover :friendship-requests="friendship" />
  </ad-popover>
</template>

<script setup lang="ts">
import { friendshipRequests } from 'nucleify'

defineProps<{
  position: PositionType
}>()

const friendship = friendshipRequests()

function syncFriendships(): void {
  void friendship.getAllFriendships()
}
</script>

<style lang="scss">
@import '.';
</style>
