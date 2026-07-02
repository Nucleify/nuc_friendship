<template>
  <div class="friends-list">
    <div v-if="!friends.length" class="empty-state">
      <ad-paragraph text="No friends found" />
    </div>
    <template v-else>
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
            nui-type="main"
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
    </template>
  </div>
</template>

<script setup lang="ts">
import type { NucFriendshipObjectInterface } from 'nucleify'

withDefaults(
  defineProps<{
    friends?: NucFriendshipObjectInterface[]
  }>(),
  { friends: () => [] }
)

defineEmits<{
  block: [friendId: number | string]
  remove: [friendId: number | string]
}>()
</script>

<style lang="scss">
@import 'index';
</style>
