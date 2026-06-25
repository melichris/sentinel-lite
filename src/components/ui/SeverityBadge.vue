<script setup>
defineProps({
  severity: {
    type: String,
    required: true,
    validator: (value) => ['critical', 'high', 'medium', 'low'].includes(value),
  },
})

const styles = {
  critical: 'bg-red-500/20 text-red-400 border-red-500/40',
  high: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
  medium: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
  low: 'bg-sky-500/20 text-sky-400 border-sky-500/40',
}
</script>

<template>
  <span
    class="text-xs font-medium px-2.5 py-1 rounded-full border capitalize"
    :class="styles[severity]"
  >
    {{ severity }}
  </span>
</template>