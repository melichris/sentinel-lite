<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from '@/components/layout/Sidebar.vue'
import Navbar from '@/components/layout/Navbar.vue'

const route = useRoute()

const isSidebarCollapsed = ref(false)
const isMobileSidebarOpen = ref(false)

function toggleSidebarCollapse() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

function toggleMobileSidebar() {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value
}

watch(() => route.path, () => {
  isMobileSidebarOpen.value = false
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
    <Sidebar
      :collapsed="isSidebarCollapsed"
      :mobile-open="isMobileSidebarOpen"
      @toggle-collapse="toggleSidebarCollapse"
      @close-mobile="isMobileSidebarOpen = false"
    />

    <div class="flex-1 flex flex-col min-w-0">
      <Navbar @toggle-sidebar="toggleMobileSidebar" />

      <main class="flex-1 p-4 md:p-6 overflow-y-auto">
        <div class="max-w-6xl mx-auto">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>