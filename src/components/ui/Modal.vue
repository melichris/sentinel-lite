<script setup>
defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])

function close() {
  emit('update:modelValue', false)
}
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/60" @click="close"></div>
      <div class="relative bg-slate-800 rounded-xl w-full max-w-md mx-4 p-6 z-10">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-white">{{ title }}</h2>
          <button @click="close" class="text-slate-400 hover:text-white text-xl leading-none">&times;</button>
        </div>
        <slot />
      </div>
    </div>
  </Teleport>
</template>