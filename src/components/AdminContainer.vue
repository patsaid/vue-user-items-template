<template>
  <div class="admin-container">
    <Sidebar />
    <div class="admin-content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/SideBar.vue'
</script>

<style scoped>
.admin-container {
  display: flex;
}
.admin-content {
  flex: 1;
  padding: 1rem;
}
</style>
