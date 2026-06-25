<script setup>
defineProps({
  title: { type: String, required: true },
  value: { type: [Number, String], required: true },
  icon: { type: String, default: '📊' },
  accent: {
    type: String,
    default: 'emerald', // emerald | red | amber | sky
  },
})

const accentClasses = {
  emerald: 'border-emerald-500 text-emerald-400',
  red: 'border-red-500 text-red-400',
  amber: 'border-amber-500 text-amber-400',
  sky: 'border-sky-500 text-sky-400',
}
</script>

<template>
  <div class="bg-slate-800 rounded-xl p-5 border-l-4" :class="accentClasses[accent]">
    <div class="flex items-center justify-between">
      <span class="text-slate-400 text-sm">{{ title }}</span>
      <span class="text-xl">{{ icon }}</span>
    </div>
    <p class="text-3xl font-bold text-white mt-2">{{ value }}</p>
  </div>
</template>