<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

function handleLogout() {
    authStore.logout()
    router.push('/login')
}
</script>

<template>
    <div class="min-h-screen bg-slate-900 text-white p-8">
        <h1 class="text-2xl font-bold">Welcome, {{ authStore.user?.name }} 👋</h1>
        <p class="text-slate-400 mt-2">Here's what's happening with your security today.</p>
        <button @click="handleLogout" class="mt-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
            Logout
        </button>
    </div>
</template>