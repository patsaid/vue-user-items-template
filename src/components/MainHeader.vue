<script setup lang="ts">
defineProps<{
  isAuthenticated: boolean | null
}>()

const emit = defineEmits<{
  (e: 'logout'): void
}>()
</script>

<template>
  <nav class="header-container d-flex flex-row align-items px-20">
    <div class="flex-fill d-flex flex-row align-items-center">
      <router-link to="/">
        <h1>TEMPLATE</h1>
      </router-link>
    </div>
    <ul class="d-flex flex-row align-items-center">
      <template v-if="isAuthenticated">
        <li class="mr-20">
          <router-link to="/admin">Admin</router-link>
        </li>
        <li @click="emit('logout')">Sign out</li>
      </template>
      <template v-else>
        <li class="mr-20">
          <router-link to="/signin">Sign in</router-link>
        </li>
        <li>
          <router-link to="/signup">Sign up</router-link>
        </li>
      </template>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.header-container {
  background-color: var(--primary-1);

  a,
  li {
    color: white;
    cursor: pointer;
  }
}
</style>
