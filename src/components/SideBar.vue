<template>
  <div class="sidebar">
    <router-link to="/admin/items">Items</router-link>
    <router-link to="/admin/profile">Profile</router-link>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.sidebar {
  width: 200px;
  background-color: #333;
  color: white;
  padding: 1rem;
}
.sidebar a {
  color: white;
  display: block;
  margin: 1rem 0;
}
</style>
