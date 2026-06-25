<script setup>
import SeverityBadge from '@/components/ui/SeverityBadge.vue'

defineProps({
  alert: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <li class="flex items-center justify-between py-3 px-1 border-b border-slate-200 dark:border-slate-700 last:border-0">
    <div class="flex items-center gap-3">
      <SeverityBadge :severity="alert.severity" />
      <span class="text-slate-700 dark:text-slate-200 text-sm">{{ alert.title }}</span>
    </div>
    <span class="text-slate-400 dark:text-slate-500 text-xs">
      {{ new Date(alert.createdAt).toLocaleString() }}
    </span>
  </li>
</template>