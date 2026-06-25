<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/api/axios'
import { useAuthStore } from '@/stores/auth'
import StatCard from '@/components/ui/StatCard.vue'

const authStore = useAuthStore()

const alerts = ref([])
const devices = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

async function fetchDashboardData() {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const [alertsRes, devicesRes] = await Promise.all([
      api.get('/alerts'),
      api.get('/devices'),
    ])
    alerts.value = alertsRes.data
    devices.value = devicesRes.data
  } catch (err) {
    errorMessage.value = 'Could not load dashboard data. Is the mock API running?'
  } finally {
    isLoading.value = false
  }
}

const totalAlerts = computed(() => alerts.value.length)

const criticalOrHighAlerts = computed(() =>
  alerts.value.filter((a) => a.severity === 'critical' || a.severity === 'high').length
)

const totalDevices = computed(() => devices.value.length)

const onlineDevices = computed(() =>
  devices.value.filter((d) => d.status === 'online').length
)

const recentAlerts = computed(() =>
  [...alerts.value]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4)
)

onMounted(() => {
  fetchDashboardData()
})
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-white">Welcome, {{ authStore.user?.name }} 👋</h1>
    <p class="text-slate-400 mt-1">Here's what's happening with your security today.</p>

    <p v-if="errorMessage" class="text-red-400 mt-4">{{ errorMessage }}</p>

    <div v-if="isLoading" class="text-slate-400 mt-6">Loading dashboard...</div>

    <template v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatCard title="Total Alerts" :value="totalAlerts" icon="🚨" accent="sky" />
        <StatCard title="Critical / High Alerts" :value="criticalOrHighAlerts" icon="⚠️" accent="red" />
        <StatCard title="Total Devices" :value="totalDevices" icon="🖥️" accent="emerald" />
        <StatCard title="Devices Online" :value="onlineDevices" icon="🟢" accent="amber" />
      </div>

      <div class="bg-slate-800 rounded-xl p-5 mt-6">
        <h2 class="text-white font-semibold mb-3">Recent Alerts</h2>
        <ul class="divide-y divide-slate-700">
          <li
            v-for="alert in recentAlerts"
            :key="alert.id"
            class="flex items-center justify-between py-3 text-sm"
          >
            <span class="text-slate-200">{{ alert.title }}</span>
            <span class="text-slate-500">{{ new Date(alert.createdAt).toLocaleDateString() }}</span>
          </li>
        </ul>
        <p v-if="recentAlerts.length === 0" class="text-slate-500 text-sm">No alerts yet.</p>
      </div>
    </template>
  </div>
</template>