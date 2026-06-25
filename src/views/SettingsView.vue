<script setup>
import { useThemeStore } from '@/stores/theme'
import ProfileForm from '@/components/settings/ProfileForm.vue'
import ToggleSwitch from '@/components/ui/ToggleSwitch.vue'

const themeStore = useThemeStore()
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>

    <section class="bg-white dark:bg-slate-800 rounded-xl p-5 mt-6 shadow-sm">
      <h2 class="font-semibold text-slate-900 dark:text-white mb-4">Profile</h2>
      <ProfileForm />
    </section>

    <section class="bg-white dark:bg-slate-800 rounded-xl p-5 mt-6 shadow-sm flex items-center justify-between max-w-sm">
      <div>
        <h2 class="font-semibold text-slate-900 dark:text-white">Dark Mode</h2>
        <p class="text-slate-500 dark:text-slate-400 text-sm">Switch between light and dark themes.</p>
      </div>
      <ToggleSwitch :model-value="themeStore.isDark" @update:model-value="themeStore.toggleTheme" />
    </section>
  </div>
</template>