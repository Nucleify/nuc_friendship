<template>
  <div class="add-friend">
    <div class="add-friend-input">
      <ad-input-text
        v-model="searchEmail"
        placeholder="User email"
        ad-type="main"
        class="search-input"
        @keyup.enter="handleAddFriend"
      />
      <ad-button
        label="Invite"
        icon="prime:user-plus"
        ad-type="main"
        :loading="loading"
        @click="handleAddFriend"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { friendshipRequests, userRequests } from 'atomic'

import { useAddFriend } from './utils'

const friendship = friendshipRequests()
const users = userRequests()

const searchEmail = ref('')
const loading = computed(() => friendship.loading.value)

const { handleAddFriend: handleAddFriendFn } = useAddFriend({
  searchEmail,
  friendship,
  users,
})

async function handleAddFriend() {
  await handleAddFriendFn()
  searchEmail.value = ''
}
</script>

<style lang="scss" scoped>
@import 'index';
</style>

