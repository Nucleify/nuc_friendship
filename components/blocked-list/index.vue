<template>
  <div class="blocked-list">
    <div v-if="blocked.length === 0" class="empty-state">
      <ad-paragraph text="No blocked users" />
    </div>
    <nuc-friend-item
      v-for="friendship in blocked"
      :key="friendship.id"
      :friendship="friendship"
    >
      <template #actions="{ friendId }">
        <ad-button
          icon="prime:unlock"
          text
          rounded
          ad-type="main"
          @click="$emit('unblock', friendId)"
        />
      </template>
    </nuc-friend-item>
  </div>
</template>

<script setup lang="ts">
import type { NucFriendshipObjectInterface } from 'nucleify'

defineProps<{
  blocked: NucFriendshipObjectInterface[]
}>()

defineEmits<{
  unblock: [friendId: number]
}>()
</script>

<style lang="scss" scoped>
@import 'index';
</style>

