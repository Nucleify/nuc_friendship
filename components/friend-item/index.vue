<template>
  <div class="friend-item">
    <div class="friend-info">
      <ad-icon icon="prime:user" size="1.5em" />
      <div class="friend-details">
        <p class="friend-name">{{ friendName }}</p>
        <p class="friend-email">{{ friendEmail }}</p>
      </div>
    </div>
    <div class="friend-actions">
      <slot name="actions" :friend-id="friendship.friend.id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { NucFriendshipObjectInterface } from 'nucleify'

const props = defineProps<{
  friendship: NucFriendshipObjectInterface
}>()

const friendName = computed(() => props.friendship.friend?.name?.trim() || '—')
const friendEmail = computed(() => props.friendship.friend?.email?.trim() ?? '')
</script>

<style lang="scss">
@import 'index';
</style>
