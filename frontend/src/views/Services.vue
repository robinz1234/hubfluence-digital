<template>
  <main class="bg-black text-white">
    <PageHeader
      title="Our Services"
      description="Comprehensive digital solutions tailored to your business needs"
    />

    <section class="py-16 bg-[#050505]">
      <div class="container mx-auto px-4">
        <div v-if="loading" class="text-center text-[#94A3B8]">
          Loading services...
        </div>

        <div v-else-if="error" class="text-center text-red-500">
          {{ error }}
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard
            v-for="service in services"
            :key="service.title"
            v-bind="service"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import PageHeader from "@/components/shared/PageHeader.vue";
import ServiceCard from "@/components/services/ServiceCard.vue";
import { fetchJson } from "@/lib/strapi";

const services = ref([]);
const loading = ref(true);
const error = ref("");

const normalizeIcon = (iconName) => {
  if (!iconName) return "pi pi-star";
  if (iconName.startsWith("pi-")) return `pi ${iconName}`;
  if (iconName.startsWith("pi ")) return iconName;
  return iconName;
};

const pickAttrs = (item) => (item?.attributes ? item.attributes : item);

const fetchServices = async () => {
  loading.value = true;
  error.value = "";

  try {
    const json = await fetchJson("/api/services?populate=*");
    const items = Array.isArray(json?.data) ? json.data : [];

    services.value = items
      .map((it) => {
        const a = pickAttrs(it);
        return {
          icon: normalizeIcon(a?.iconName || a?.icon || ""),
          title: a?.title || "",
          description: a?.shortDescription || a?.description || "",
          features: Array.isArray(a?.features) ? a.features : [],
          order: a?.order ?? 999,
        };
      })
      .sort((a, b) => a.order - b.order);
  } catch (e) {
    console.error(e);
    error.value =
      "Could not load services. Check VITE_STRAPI_URL on Render, and Strapi Public role permission for Services: find.";
    services.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(fetchServices);
</script>
