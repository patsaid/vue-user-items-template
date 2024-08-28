import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from './shared/guards'
import { useUser } from './shared/stores'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/HomePage.vue')
    },
    {
      path: '/signin',
      beforeEnter: [isNotAuthenticatedGuard],
      component: () => import('@/views/SignIn.vue')
    },
    {
      path: '/signup',
      beforeEnter: [isNotAuthenticatedGuard],
      component: () => import('@/views/SignUp.vue')
    },
    {
      path: '/admin',
      beforeEnter: [isAuthenticatedGuard],
      component: () => import('@/views/AdminPage.vue'),
      children: [
        {
          path: 'items',
          component: () => import('@/components/ItemList.vue')
        },
        {
          path: 'items/add',
          component: () => import('@/components/AddItem.vue')
        },
        {
          path: 'items/update/:id',
          component: () => import('@/components/UpdateItem.vue')
        },
        {
          path: 'profile',
          component: () => import('@/views/ProfilePage.vue')
        }
      ]
    },
    {
      path: '/admin',
      beforeEnter: [isAuthenticatedGuard],
      component: () => import('@/views/ProfilePage.vue')
    },
    {
      path: '/profile',
      beforeEnter: [isAuthenticatedGuard],
      component: () => import('@/views/ProfilePage.vue')
    },
    {
      path: '/:notfound(.*)*',
      component: () => import('@/views/NotFound.vue')
    }
  ]
})

router.beforeEach(async () => {
  const userStore = useUser()
  if (!userStore.loaded) {
    await userStore.fetchCurrentUser()
  }
})
