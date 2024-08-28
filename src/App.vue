<script setup lang="ts">
import MainHeader from '@/components/MainHeader.vue'
import MainFooter from './components/MainFooter.vue'
import { useRouter } from 'vue-router'
import { useUser } from './shared/stores'

const userStore = useUser()
const router = useRouter()

async function logout() {
  await userStore.logout()
  router.push('/signin')
}
</script>

<template>
  <div class="d-flex flex-column app-container">
    <MainHeader :isAuthenticated="userStore.isAuthenticated" @logout="logout" />
    <router-view class="flex-fill"></router-view>
    <MainFooter />
  </div>
</template>

<style lang="scss">
@import './assets/scss/base.scss';

.app-container {
  min-height: 100vh;
}
</style>
