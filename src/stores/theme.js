import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(localStorage.getItem('sentinel_theme') === 'dark')

  watch(
    isDark,
    (value) => {
      document.documentElement.classList.toggle('dark', value)
      localStorage.setItem('sentinel_theme', value ? 'dark' : 'light')
    },
    { immediate: true }
  )

  function toggleTheme() {
    isDark.value = !isDark.value
  }

  return { isDark, toggleTheme }
})