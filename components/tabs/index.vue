<template>
  <div class="friendship-tabs">
    <ad-button
      v-for="tab in tabs"
      :key="tab"
      :label="toTitleCase(tab)"
      :text="activeTab !== tab"
      ad-type="main"
      class="tab-button"
      @click="$emit('update:activeTab', tab)"
    />
  </div>
</template>

<script setup lang="ts">
import type { NucFriendshipTabType } from 'nucleify'

defineProps<{
  activeTab: NucFriendshipTabType
}>()

defineEmits<{
  'update:activeTab': [value: NucFriendshipTabType]
}>()

const tabs: NucFriendshipTabType[] = ['friends', 'requests', 'blocked']

function toTitleCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
</script>

<style lang="scss">
@import 'index';
</style>
