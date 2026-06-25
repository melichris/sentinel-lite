<script setup>
import { ref, watch } from 'vue'
import Modal from '@/components/ui/Modal.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  device: { type: Object, default: null }, // null = add mode
})

const emit = defineEmits(['update:modelValue', 'save'])

const form = ref({ name: '', type: 'router', status: 'online' })

watch(
  () => props.device,
  (newDevice) => {
    form.value = newDevice ? { ...newDevice } : { name: '', type: 'router', status: 'online' }
  },
  { immediate: true }
)

function handleSubmit() {
  if (!form.value.name.trim()) return
  emit('save', { ...form.value })
}

function close() {
  emit('update:modelValue', false)
}
</script>

<template>
  <Modal
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    :title="device ? 'Edit Device' : 'Add Device'"
  >
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-slate-300 text-sm mb-1">Name</label>
        <input v-model="form.name" type="text"
          class="w-full px-3 py-2 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-emerald-500" />
      </div>

      <div>
        <label class="block text-slate-300 text-sm mb-1">Type</label>
        <select v-model="form.type"
          class="w-full px-3 py-2 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-emerald-500">
          <option value="router">Router</option>
          <option value="camera">Camera</option>
          <option value="server">Server</option>
          <option value="storage">Storage</option>
        </select>
      </div>

      <div>
        <label class="block text-slate-300 text-sm mb-1">Status</label>
        <select v-model="form.status"
          class="w-full px-3 py-2 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-emerald-500">
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
      </div>

      <div class="flex justify-end gap-2 pt-2">
        <button type="button" @click="close" class="px-4 py-2 rounded text-slate-300 hover:text-white">
          Cancel
        </button>
        <button type="submit" class="px-4 py-2 rounded bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
          {{ device ? 'Save Changes' : 'Add Device' }}
        </button>
      </div>
    </form>
  </Modal>
</template>