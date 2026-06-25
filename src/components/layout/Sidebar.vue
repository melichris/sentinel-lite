<script setup>
const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggle-collapse'])

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: '📊' },
  { name: 'Alerts', path: '/alerts', icon: '🚨' },
  { name: 'Devices', path: '/devices', icon: '🖥️' },
  { name: 'Settings', path: '/settings', icon: '⚙️' },
]
</script>

<template>
  <aside
    class="bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col transition-all duration-200"
    :class="collapsed ? 'w-16' : 'w-56'">
    <div class="flex items-center justify-between px-4 py-4 border-b border-slate-200 dark:border-slate-700">
      <span v-if="!collapsed" class="text-emerald-400 font-bold text-lg">🛡️ Sentinel</span>
      <button @click="emit('toggle-collapse')" class="text-slate-400 hover:text-white">
        {{ collapsed ? '»' : '«' }}
      </button>
    </div>

    <nav class="flex-1 mt-4 space-y-1">
      <router-link v-for="item in navItems" :key="item.path" :to="item.path"
        class="flex items-center gap-3 px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition"
        active-class="bg-slate-100 dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 border-r-2 border-emerald-500 dark:border-emerald-400">
        <span>{{ item.icon }}</span>
        <span v-if="!collapsed">{{ item.name }}</span>
      </router-link>
    </nav>
  </aside>
</template>