<template>
  <ad-popover
    v-if="!loading"
    dismissable
    icon="prime:users"
    :position="position"
    popover-class="friendship-popover"
    :button-text="isMobile() ? '' : 'Friends'"
    button-class="friendship-popover-toggle"
  >
    <nuc-friendship-popover />
  </ad-popover>
</template>

<script setup lang="ts">
import { friendshipRequests } from 'atomic'

defineProps<{
  position: PositionType
}>()

const { loading, getAllFriendships } = friendshipRequests()

onMounted(() => {
  getAllFriendships(true)
})
</script>

<style lang="scss">
@import '.';
</style>