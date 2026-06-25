<script setup>
defineProps({
  icon: { type: String, default: '📭' },
  message: { type: String, required: true },
})
</script>

<template>
  <div class="text-center py-10">
    <p class="text-3xl mb-2">{{ icon }}</p>
    <p class="text-slate-500 dark:text-slate-400 text-sm">{{ message }}</p>
  </div>
</template>