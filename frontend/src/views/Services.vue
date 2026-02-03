<script setup>
import { ref, onMounted } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import { fetchWithAuth } from '../lib/strapi'

const services = ref([])
const loading = ref(true)
const error = ref(null)

const loadServices = async () => {
  try {
    loading.value = true
    error.value = null

    // Assumes Strapi collection type "services"
    const data = await fetchWithAuth('/api/services?populate=*')
    services.value = data?.data || []
  } catch (err) {
    error.value = err?.message || 'Failed to load services'
  } finally {
    loading.value = false
  }
}

onMounted(loadServices)
</script>

<template>
  <main class="bg-black text-white">
    <PageHeader
      title="Services"
      description="What we do to help your brand grow"
    />

    <section class="container mx-auto px-4 py-16">
      <div v-if="loading">Loading...</div>
      <div v-else-if="error" class="text-red-400">{{ error }}</div>

      <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="service in services"
          :key="service.id"
          class="border border-white/10 rounded-lg p-5 hover:border-white/20 transition"
        >
          <h3 class="text-xl font-semibold mb-2">
            {{ service?.attributes?.title || 'Untitled' }}
          </h3>
          <p class="text-white/70 text-sm">
            {{ service?.attributes?.description || '' }}
          </p>
        </article>
      </div>
    </section>
  </main>
</template>
