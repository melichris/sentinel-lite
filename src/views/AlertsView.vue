<script setup>

import PageHeader from '@/components/ui/PageHeader.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
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
        <PageHeader title="Alerts">
            <span class="text-slate-500 dark:text-slate-400 text-sm">{{ filteredAlerts.length }} of {{ alerts.length
            }}</span>
        </PageHeader>

        <AlertFilters v-model:severity="severityFilter" v-model:search="searchQuery" />

        <p v-if="errorMessage" class="text-red-400 mt-4">{{ errorMessage }}</p>
        <LoadingSpinner v-if="isLoading" label="Loading alerts..." />
        <ul v-else class="bg-white dark:bg-slate-800 rounded-xl mt-6 px-4 shadow-sm">
            <AlertListItem v-for="alert in filteredAlerts" :key="alert.id" :alert="alert" />
        </ul>

        <EmptyState v-if="!isLoading && filteredAlerts.length === 0" icon="🔍" message="No alerts match your filters." />
    </div>
</template>
