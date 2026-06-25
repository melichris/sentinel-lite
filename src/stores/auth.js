import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/api/axios'

export const useAuthStore = defineStore('auth', () => {
  // state
  const user = ref(null)
  const token = ref(localStorage.getItem('sentinel_token') || null)

  // getter
  const isAuthenticated = computed(() => !!token.value)

  function setSession(userData, fakeToken) {
    user.value = userData
    token.value = fakeToken
    localStorage.setItem('sentinel_token', fakeToken)
    localStorage.setItem('sentinel_user', JSON.stringify(userData))
  }

  async function login(email, password) {
    const response = await api.get('/users', { params: { email, password } })
    const foundUser = response.data[0]

    if (!foundUser) {
      throw new Error('Invalid email or password')
    }

    const fakeToken = btoa(`${foundUser.id}:${Date.now()}`)
    setSession(foundUser, fakeToken)
    return foundUser
  }

  async function register(name, email, password) {
    const existing = await api.get('/users', { params: { email } })
    if (existing.data.length > 0) {
      throw new Error('That email is already registered')
    }

    const response = await api.post('/users', { name, email, password })
    const fakeToken = btoa(`${response.data.id}:${Date.now()}`)
    setSession(response.data, fakeToken)
    return response.data
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('sentinel_token')
    localStorage.removeItem('sentinel_user')
  }

  function restoreSession() {
    const savedUser = localStorage.getItem('sentinel_user')
    if (savedUser) user.value = JSON.parse(savedUser)
  }

  return { user, token, isAuthenticated, login, register, logout, restoreSession }
})