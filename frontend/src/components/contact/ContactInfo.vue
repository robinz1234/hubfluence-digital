<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-xl font-bold text-white mb-2">Contact</h3>
      <p class="text-[#94A3B8]">Reach out and we will respond quickly.</p>
    </div>

    <div class="space-y-3 text-[#CAD9DA]">
      <p v-if="global.email" class="flex items-center gap-3">
        <i class="pi pi-envelope text-[#31C2B8]"></i>
        <span>{{ global.email }}</span>
      </p>
      <p v-if="global.phone" class="flex items-center gap-3">
        <i class="pi pi-phone text-[#31C2B8]"></i>
        <span>{{ global.phone }}</span>
      </p>
      <p v-if="global.address" class="flex items-start gap-3">
        <i class="pi pi-map-marker text-[#31C2B8] mt-1"></i>
        <span>{{ global.address }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getGlobalSetting } from '@/lib/strapi';

const global = ref({
  email: '',
  phone: '',
  address: ''
});

onMounted(async () => {
  try {
    const gs = await getGlobalSetting();
    if (gs) {
      global.value.email = gs.email;
      global.value.phone = gs.phone;
      global.value.address = gs.address;
    }
  } catch (e) {
    console.error(e);
  }
});
</script>
