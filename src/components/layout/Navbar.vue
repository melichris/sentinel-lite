<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

defineProps({
  sidebarCollapsed: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['toggle-sidebar'])

const router = useRouter()
const authStore = useAuthStore()

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <header
    class="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6">
    <button @click="$emit('toggle-sidebar')"
      class="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white md:hidden text-xl"> ☰
    </button>

    <div></div>

    <div class="flex items-center gap-4">
      <span class="text-slate-600 dark:text-slate-300 text-sm">{{ authStore.user?.name }}</span> <button
        @click="handleLogout" class="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded transition">
        Logout
      </button>
    </div>
  </header>
</template>