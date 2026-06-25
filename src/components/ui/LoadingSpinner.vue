<script setup>
defineProps({
  label: { type: String, default: 'Loading...' },
})
</script>

<template>
  <div class="flex items-center gap-3 text-slate-500 dark:text-slate-400 py-6">
    <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
    </svg>
    <span class="text-sm">{{ label }}</span>
  </div>
</template>