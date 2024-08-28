import { defineStore } from 'pinia'
import type { SignInForm, SignUpForm, User } from '../interfaces'
import { fetchCurrentUser, signin, logout, updateUser } from '../services'

interface UserState {
  currentUser: User | null
  loaded: boolean
}

export const useUser = defineStore('user', {
  state: (): UserState => ({
    currentUser: null,
    loaded: false
  }),
  getters: {
    isAuthenticated(state): boolean | null {
      if (state.currentUser) {
        return true
      } else if (!state.currentUser && state.loaded) {
        return false
      } else {
        return null
      }
    }
  },
  actions: {
    async login(signInForm: SignInForm) {
      this.currentUser = await signin(signInForm)
    },
    async logout() {
      await logout()
      this.currentUser = null
    },
    async fetchCurrentUser() {
      this.currentUser = await fetchCurrentUser()
      this.loaded = true
    },
    async updateUser(signUpForm: SignUpForm) {
      this.currentUser = await updateUser(signUpForm)
      this.loaded = true
    }
  }
})
