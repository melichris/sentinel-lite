<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

async function handleRegister() {
  errorMessage.value = ''

  if (!name.value || !email.value || !password.value) {
    errorMessage.value = 'All fields are required.'
    return
  }
  if (password.value.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters.'
    return
  }

  isLoading.value = true
  try {
    await authStore.register(name.value, email.value, password.value)
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
    <form @submit.prevent="handleRegister" class="bg-slate-800 p-8 rounded-xl w-full max-w-sm space-y-4">
      <h1 class="text-2xl font-bold text-white mb-2">Create your account</h1>

      <div>
        <label class="block text-slate-300 text-sm mb-1">Name</label>
        <input v-model="name" type="text"
          class="w-full px-3 py-2 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-emerald-500" />
      </div>

      <div>
        <label class="block text-slate-300 text-sm mb-1">Email</label>
        <input v-model="email" type="email"
          class="w-full px-3 py-2 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-emerald-500" />
      </div>

      <div>
        <label class="block text-slate-300 text-sm mb-1">Password</label>
        <input v-model="password" type="password"
          class="w-full px-3 py-2 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-emerald-500" />
      </div>

      <p v-if="errorMessage" class="text-red-400 text-sm">{{ errorMessage }}</p>

      <button type="submit" :disabled="isLoading"
        class="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded transition disabled:opacity-50">
        {{ isLoading ? 'Creating account...' : 'Register' }}
      </button>

      <p class="text-slate-400 text-sm text-center">
        Already have an account?
        <router-link to="/login" class="text-emerald-400 hover:underline">Sign in</router-link>
      </p>
    </form>
  </div>
</template>