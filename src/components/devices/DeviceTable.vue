<script setup>
import EmptyState from '@/components/ui/EmptyState.vue'

defineProps({
  devices: { type: Array, required: true },
})

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-sm min-w-[480px]">
        <thead class="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-left">
          <tr>
            <th class="px-4 py-3">Name</th>
            <th class="px-4 py-3">Type</th>
            <th class="px-4 py-3">Status</th>
            <th class="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
          <tr v-for="device in devices" :key="device.id" class="text-slate-700 dark:text-slate-200">
            <td class="px-4 py-3">{{ device.name }}</td>
            <td class="px-4 py-3 capitalize text-slate-500 dark:text-slate-400">{{ device.type }}</td>
            <td class="px-4 py-3">
              <span
                class="text-xs px-2.5 py-1 rounded-full border"
                :class="device.status === 'online'
                  ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40'
                  : 'bg-slate-200/60 dark:bg-slate-600/30 text-slate-500 dark:text-slate-400 border-slate-400/40 dark:border-slate-600/40'"
              >
                {{ device.status }}
              </span>
            </td>
            <td class="px-4 py-3 text-right space-x-3">
              <button @click="emit('edit', device)" class="text-sky-600 dark:text-sky-400 hover:text-sky-500">Edit</button>
              <button @click="emit('delete', device)" class="text-red-500 dark:text-red-400 hover:text-red-400">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <EmptyState v-if="devices.length === 0" icon="🖥️" message="No devices yet." />
  </div>
</template>