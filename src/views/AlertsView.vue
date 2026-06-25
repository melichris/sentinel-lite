<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/api/axios'
import AlertFilters from '@/components/alerts/AlertFilters.vue'
import AlertListItem from '@/components/alerts/AlertListItem.vue'

const alerts = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

const severityFilter = ref('all')
const searchQuery = ref('')

async function fetchAlerts() {
    isLoading.value = true
    errorMessage.value = ''
    try {
        const response = await api.get('/alerts')
        alerts.value = response.data
    } catch (err) {
        errorMessage.value = 'Could not load alerts. Is the mock API running?'
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    fetchAlerts()
})

const filteredAlerts = computed(() => {
    return alerts.value
        .filter((alert) => {
            const matchesSeverity =
                severityFilter.value === 'all' || alert.severity === severityFilter.value
            const matchesSearch = alert.title
                .toLowerCase()
                .includes(searchQuery.value.toLowerCase())
            return matchesSeverity && matchesSearch
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})
</script>
<template>
    <div>
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-bold text-white">Alerts</h1>
            <span class="text-slate-400 text-sm">{{ filteredAlerts.length }} of {{ alerts.length }}</span>
        </div>

        <AlertFilters v-model:severity="severityFilter" v-model:search="searchQuery" />

        <p v-if="errorMessage" class="text-red-400 mt-4">{{ errorMessage }}</p>
        <div v-if="isLoading" class="text-slate-400 mt-6">Loading alerts...</div>

        <ul v-else class="bg-slate-800 rounded-xl mt-6 px-4">
            <AlertListItem v-for="alert in filteredAlerts" :key="alert.id" :alert="alert" />
        </ul>

        <p v-if="!isLoading && filteredAlerts.length === 0" class="text-slate-500 text-sm mt-4">
            No alerts match your filters.
        </p>
    </div>
</template>
