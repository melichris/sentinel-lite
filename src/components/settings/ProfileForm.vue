<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const form = ref({ name: '', email: '' })
const successMessage = ref('')
const errorMessage = ref('')
const isSaving = ref(false)

watch(
  () => authStore.user,
  (user) => {
    if (user) form.value = { name: user.name, email: user.email }
  },
  { immediate: true }
)

async function handleSubmit() {
  successMessage.value = ''
  errorMessage.value = ''
  isSaving.value = true
  try {
    await authStore.updateProfile({ name: form.value.name, email: form.value.email })
    successMessage.value = 'Profile updated successfully.'
  } catch (err) {
    errorMessage.value = 'Could not update profile.'
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4 max-w-sm">
    <div>
      <label class="block text-sm mb-1 text-slate-600 dark:text-slate-300">Name</label>
      <input v-model="form.name" type="text"
        class="w-full px-3 py-2 rounded bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500" />
    </div>
    <div>
      <label class="block text-sm mb-1 text-slate-600 dark:text-slate-300">Email</label>
      <input v-model="form.email" type="email"
        class="w-full px-3 py-2 rounded bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500" />
    </div>

    <p v-if="successMessage" class="text-emerald-500 text-sm">{{ successMessage }}</p>
    <p v-if="errorMessage" class="text-red-400 text-sm">{{ errorMessage }}</p>

    <button type="submit" :disabled="isSaving"
      class="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-2 rounded disabled:opacity-50">
      {{ isSaving ? 'Saving...' : 'Save Changes' }}
    </button>
  </form>
</template>