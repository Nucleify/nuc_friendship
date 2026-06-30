<template>
  <ad-popover
    dismissable
    :icon="variant === 'sidebar' ? undefined : 'prime:users'"
    :position="position"
    popover-class="friendship-popover"
    :button-text="variant === 'sidebar' ? undefined : isMobile() ? '' : 'Friends'"
    button-class="friendship-popover-toggle"
    @show="syncFriendships"
  >
    <template v-if="variant === 'sidebar'" #trigger="{ toggle }">
      <button type="button" class="nuc-sidebar-link" @click="toggle">
        <ad-icon icon="prime:users" size="1.25em" />
        <span>Friends</span>
      </button>
    </template>

    <nuc-friendship-popover :friendship-requests="friendship" />
  </ad-popover>
</template>

<script setup lang="ts">
import { friendshipRequests } from 'nucleify'

withDefaults(
  defineProps<{
    position: PositionType
    variant?: 'default' | 'sidebar'
  }>(),
  {
    variant: 'default',
  }
)

const friendship = friendshipRequests()

function syncFriendships(): void {
  void friendship.getAllFriendships()
}
</script>

<style lang="scss">
@import 'index';
</style>
