<!-- <script setup>
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
</template> -->

<script setup>
defineProps({
  collapsed: { type: Boolean, default: false },
  mobileOpen: { type: Boolean, default: false },
})

const emit = defineEmits(['toggle-collapse', 'close-mobile'])

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: '📊' },
  { name: 'Alerts', path: '/alerts', icon: '🚨' },
  { name: 'Devices', path: '/devices', icon: '🖥️' },
  { name: 'Settings', path: '/settings', icon: '⚙️' },
]
</script>

<template>
  <!-- mobile-only backdrop, tap to close -->
  <div
    v-if="mobileOpen"
    @click="emit('close-mobile')"
    class="fixed inset-0 bg-black/60 z-30 md:hidden"
  ></div>

  <aside
    class="fixed md:static inset-y-0 left-0 z-40 flex flex-col bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-transform md:transition-[width] duration-200 w-64"
    :class="[
      mobileOpen ? 'translate-x-0' : '-translate-x-full',
      'md:translate-x-0',
      collapsed ? 'md:w-16' : 'md:w-56',
    ]"
  >
    <div class="flex items-center justify-between px-4 py-4 border-b border-slate-200 dark:border-slate-700">
      <span v-if="!collapsed || mobileOpen" class="text-emerald-600 dark:text-emerald-400 font-bold text-lg">
        🛡️ Sentinel
      </span>

      <button @click="emit('toggle-collapse')" class="hidden md:block text-slate-400 hover:text-slate-900 dark:hover:text-white">
        {{ collapsed ? '»' : '«' }}
      </button>
      <button @click="emit('close-mobile')" class="md:hidden text-slate-400 hover:text-slate-900 dark:hover:text-white text-xl leading-none">
        &times;
      </button>
    </div>

    <nav class="flex-1 mt-4 space-y-1">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition"
        active-class="bg-slate-100 dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 border-r-2 border-emerald-500 dark:border-emerald-400"
      >
        <span>{{ item.icon }}</span>
        <span v-if="!collapsed || mobileOpen">{{ item.name }}</span>
      </router-link>
    </nav>
  </aside>
</template>