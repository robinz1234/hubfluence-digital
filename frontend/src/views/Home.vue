<script setup>
import { ref, onMounted } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import { fetchWithAuth } from '../lib/strapi'

const posts = ref([])
const loading = ref(true)
const error = ref(null)

const loadPosts = async () => {
  try {
    loading.value = true
    error.value = null

    // Assumes Strapi collection type "blogs"
    // and you want featured ones
    const data = await fetchWithAuth('/api/blogs?filters[featured][$eq]=true&populate=*')
    posts.value = data?.data || []
  } catch (err) {
    error.value = err?.message || 'Failed to load blogs'
  } finally {
    loading.value = false
  }
}

onMounted(loadPosts)
</script>

<template>
  <main class="bg-black text-white">
    <PageHeader
      title="Hubfluence Digital"
      description="A results-driven digital marketing agency focused on growth, creativity, and performance"
    />

    <section class="container mx-auto px-4 py-16">
      <h2 class="text-2xl font-semibold mb-6">Featured Blogs</h2>

      <div v-if="loading">Loading...</div>
      <div v-else-if="error" class="text-red-400">{{ error }}</div>

      <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="post in posts"
          :key="post.id"
          class="border border-white/10 rounded-lg p-5 hover:border-white/20 transition"
        >
          <h3 class="text-xl font-semibold mb-2">
            {{ post?.attributes?.title || 'Untitled' }}
          </h3>
          <p class="text-white/70 text-sm line-clamp-3">
            {{ post?.attributes?.excerpt || '' }}
          </p>
        </article>
      </div>
    </section>
  </main>
</template>
