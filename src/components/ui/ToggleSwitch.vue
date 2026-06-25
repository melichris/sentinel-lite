<script setup>
defineProps({
  modelValue: { type: Boolean, default: false },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <button
    type="button"
    @click="$emit('update:modelValue', !modelValue)"
    class="w-12 h-6 rounded-full transition-colors relative shrink-0"
    :class="modelValue ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'"
  >
    <span
      class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform"
      :class="modelValue ? 'translate-x-6' : 'translate-x-0'"
    ></span>
  </button>
</template>