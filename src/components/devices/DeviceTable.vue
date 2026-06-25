<script setup>
defineProps({
  devices: { type: Array, required: true },
})

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="bg-slate-800 rounded-xl overflow-hidden">
    <table class="w-full text-sm">
      <thead class="bg-slate-900/50 text-slate-400 text-left">
        <tr>
          <th class="px-4 py-3">Name</th>
          <th class="px-4 py-3">Type</th>
          <th class="px-4 py-3">Status</th>
          <th class="px-4 py-3 text-right">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-700">
        <tr v-for="device in devices" :key="device.id" class="text-slate-200">
          <td class="px-4 py-3">{{ device.name }}</td>
          <td class="px-4 py-3 capitalize text-slate-400">{{ device.type }}</td>
          <td class="px-4 py-3">
            <span
              class="text-xs px-2.5 py-1 rounded-full border"
              :class="device.status === 'online'
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'bg-slate-600/30 text-slate-400 border-slate-600/40'"
            >
              {{ device.status }}
            </span>
          </td>
          <td class="px-4 py-3 text-right space-x-3">
            <button @click="emit('edit', device)" class="text-sky-400 hover:text-sky-300">Edit</button>
            <button @click="emit('delete', device)" class="text-red-400 hover:text-red-300">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="devices.length === 0" class="text-slate-500 text-sm px-4 py-6 text-center">
      No devices yet.
    </p>
  </div>
</template>