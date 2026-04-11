<template>
  <div class="friend-item">
    <div class="friend-info">
      <ad-icon icon="prime:user" size="1.5em" />
      <div class="friend-details">
        <ad-paragraph :text="friendship.friend.name" />
        <ad-paragraph :text="friendship.friend.email" class="friend-email" />
      </div>
    </div>
    <div class="friend-actions">
      <slot name="actions" :friend-id="friendship.friend.id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NucFriendshipObjectInterface } from 'nucleify'

defineProps<{
  friendship: NucFriendshipObjectInterface
}>()
</script>

<style lang="scss">
@import 'index';
</style>
