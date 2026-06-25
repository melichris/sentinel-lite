<script setup>
defineProps({
  severity: { type: String, default: 'all' },
  search: { type: String, default: '' },
})

const emit = defineEmits(['update:severity', 'update:search'])

const severityOptions = [
  { label: 'All', value: 'all' },
  { label: 'Critical', value: 'critical' },
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Low', value: 'low' },
]
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
    <div class="flex gap-2 flex-wrap">
      <button
        v-for="option in severityOptions"
        :key="option.value"
        @click="emit('update:severity', option.value)"
        class="text-sm px-3 py-1.5 rounded-full border transition"
        :class="severity === option.value
          ? 'bg-emerald-500 border-emerald-500 text-white'
          : 'border-slate-600 text-slate-300 hover:border-slate-400'"
      >
        {{ option.label }}
      </button>
    </div>

    <input
      :value="search"
      @input="emit('update:search', $event.target.value)"
      type="text"
      placeholder="Search alerts..."
      class="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white outline-none focus:ring-2 focus:ring-emerald-500 w-full sm:w-64"
    />
  </div>
</template>