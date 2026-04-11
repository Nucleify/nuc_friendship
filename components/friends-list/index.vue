<template>
  <div class="friends-list">
    <div v-if="friends.length === 0" class="empty-state">
      <ad-paragraph text="No friends found" />
    </div>
    <nuc-friend-item
      v-for="friendship in friends"
      :key="friendship.id"
      :friendship="friendship"
    >
      <template #actions="{ friendId }">
        <ad-button
          icon="prime:ban"
          text
          rounded
          ad-type="main"
          @click="$emit('block', friendId)"
        />
        <ad-button
          icon="prime:trash"
          text
          rounded
          severity="danger"
          @click="$emit('remove', friendId)"
        />
      </template>
    </nuc-friend-item>
  </div>
</template>

<script setup lang="ts">
import type { NucFriendshipObjectInterface } from 'nucleify'

defineProps<{
  friends: NucFriendshipObjectInterface[]
}>()

defineEmits<{
  block: [friendId: number]
  remove: [friendId: number]
}>()
</script>

<style lang="scss" scoped>
@import 'index';
</style>
