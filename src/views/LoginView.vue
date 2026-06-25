<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

async function handleLogin() {
  errorMessage.value = ''

  if (!email.value || !password.value) {
    errorMessage.value = 'Please fill in both fields.'
    return
  }

  isLoading.value = true
  try {
    await authStore.login(email.value, password.value)
    router.push('/dashboard')
  } catch (err) {
    errorMessage.value = err.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-900">
    <form @submit.prevent="handleLogin" class="bg-slate-800 p-8 rounded-xl w-full max-w-sm space-y-4">
      <h1 class="text-2xl font-bold text-white mb-2">Sentinel Lite</h1>
      <p class="text-slate-400 text-sm mb-4">Sign in to your dashboard</p>

      <div>
        <label class="block text-slate-300 text-sm mb-1">Email</label>
        <input v-model="email" type="email"
          class="w-full px-3 py-2 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="abc@example.com" />
      </div>

      <div>
        <label class="block text-slate-300 text-sm mb-1">Password</label>
        <input v-model="password" type="password"
          class="w-full px-3 py-2 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="••••••••" />
      </div>

      <p v-if="errorMessage" class="text-red-400 text-sm">{{ errorMessage }}</p>

      <button type="submit" :disabled="isLoading"
        class="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded transition disabled:opacity-50">
        {{ isLoading ? 'Signing in...' : 'Sign In' }}
      </button>

      <p class="text-slate-400 text-sm text-center">
        No account?
        <router-link to="/register" class="text-emerald-400 hover:underline">Register</router-link>
      </p>
    </form>
  </div>
</template>