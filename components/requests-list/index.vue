<template>
  <div class="requests-list">
    <div v-if="requests.length === 0" class="empty-state">
      <ad-paragraph text="No requests found" />
    </div>
    <nuc-friend-item
      v-for="friendship in requests"
      :key="friendship.id"
      :friendship="friendship"
    >
      <template #actions="{ friendId }">
        <ad-button
          icon="prime:check"
          text
          rounded
          nui-type="main"
          @click="$emit('accept', friendId)"
        />
        <ad-button
          icon="prime:times"
          text
          rounded
          severity="danger"
          @click="$emit('deny', friendId)"
        />
      </template>
    </nuc-friend-item>
  </div>
</template>

<script setup lang="ts">
import type { NucFriendshipObjectInterface } from 'nucleify'

defineProps<{
  requests: NucFriendshipObjectInterface[]
}>()

defineEmits<{
  accept: [senderId: number | string]
  deny: [senderId: number | string]
}>()
</script>

<style lang="scss">
@import 'index';
</style>
