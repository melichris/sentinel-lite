<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/axios'
import DeviceTable from '@/components/devices/DeviceTable.vue'
import DeviceFormModal from '@/components/devices/DeviceFormModal.vue'

import PageHeader from '@/components/ui/PageHeader.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'

const devices = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

const isModalOpen = ref(false)
const editingDevice = ref(null) // null = add mode

async function fetchDevices() {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const response = await api.get('/devices')
    devices.value = response.data
  } catch (err) {
    errorMessage.value = 'Could not load devices. Is the mock API running?'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchDevices()
})

function openAddModal() {
  editingDevice.value = null
  isModalOpen.value = true
}

function openEditModal(device) {
  editingDevice.value = device
  isModalOpen.value = true
}

async function handleSave(formData) {
  try {
    if (editingDevice.value) {
      const response = await api.put(`/devices/${editingDevice.value.id}`, formData)
      const index = devices.value.findIndex((d) => d.id === editingDevice.value.id)
      devices.value[index] = response.data
    } else {
      const response = await api.post('/devices', formData)
      devices.value.push(response.data)
    }
    isModalOpen.value = false
  } catch (err) {
    errorMessage.value = 'Could not save device.'
  }
}

async function handleDelete(device) {
  const confirmed = window.confirm(`Delete "${device.name}"? This can't be undone.`)
  if (!confirmed) return

  try {
    await api.delete(`/devices/${device.id}`)
    devices.value = devices.value.filter((d) => d.id !== device.id)
  } catch (err) {
    errorMessage.value = 'Could not delete device.'
  }
}
</script>

<template>
  <div>
    <PageHeader title="Devices">
    <button @click="openAddModal"
      class="bg-emerald-500 hover:bg-emerald-600 text-white text-sm px-4 py-2 rounded-lg font-medium">
      + Add Device
    </button>
    </PageHeader>

    <p v-if="errorMessage" class="text-red-400 mb-4">{{ errorMessage }}</p>
    <LoadingSpinner v-if="isLoading" label="Loading devices..." />

    <DeviceTable v-else :devices="devices" @edit="openEditModal" @delete="handleDelete" />

    <DeviceFormModal v-model="isModalOpen" :device="editingDevice" @save="handleSave" />
  </div>
</template>
