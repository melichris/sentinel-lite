<script setup>
import { ref } from 'vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import Navbar from '@/components/layout/Navbar.vue'

const isSidebarCollapsed = ref(false)

function toggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}
</script>

<template>
  <!-- <div class="min-h-screen bg-slate-900 flex"> -->
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
    <Sidebar :collapsed="isSidebarCollapsed" @toggle-collapse="toggleSidebar" />

    <div class="flex-1 flex flex-col">
      <Navbar :sidebar-collapsed="isSidebarCollapsed" @toggle-sidebar="toggleSidebar" />

      <main class="flex-1 p-6 overflow-y-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>