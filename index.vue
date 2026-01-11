<template>
  <ad-popover
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
defineProps<{
  position: PositionType
}>()
</script>

<style lang="scss">
@import '.';
</style>