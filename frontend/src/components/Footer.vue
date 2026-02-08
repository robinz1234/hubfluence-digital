<template>
  <footer class="bg-[#050505] text-white py-12 border-t border-[#31C2B8]/20">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <img
              v-if="global.logoUrl"
              :src="global.logoUrl"
              alt="Logo"
              class="h-10 w-10 rounded-md border border-[#38959D]/30"
            />
            <h3 class="font-bold text-xl text-[#31C2B8]">
              {{ global.companyName || 'Hubfluence Digital' }}
            </h3>
          </div>
          <p class="text-[#CAD9DA]">
            {{ global.tagline || 'Driving growth through digital influence.' }}
          </p>
        </div>

        <div>
          <h3 class="font-bold mb-4 text-[#31C2B8]">Company</h3>
          <ul class="space-y-2 text-[#94A3B8]">
            <li><router-link to="/about" class="hover:text-[#31C2B8]">About</router-link></li>
            <li><router-link to="/services" class="hover:text-[#31C2B8]">Services</router-link></li>
            <li><router-link to="/portfolio" class="hover:text-[#31C2B8]">Portfolio</router-link></li>
            <li><router-link to="/contact" class="hover:text-[#31C2B8]">Contact</router-link></li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold mb-4 text-[#31C2B8]">Connect</h3>

          <div class="flex gap-4 text-[#94A3B8]">
            <!-- Facebook -->
            <a
              href="https://www.facebook.com/share/1GHjboxdgE/"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-[#31C2B8]"
              aria-label="Facebook"
              title="Facebook"
            >
              <i class="pi pi-facebook text-xl"></i>
            </a>

            <!-- Instagram -->
            <a
              href="https://www.instagram.com/hubfluence.digital?igsh=M2cxaWYwbDYweW8w"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-[#31C2B8]"
              aria-label="Instagram"
              title="Instagram"
            >
              <i class="pi pi-instagram text-xl"></i>
            </a>

            <!-- Call -->
            <a
              href="tel:+8801345061575"
              class="hover:text-[#31C2B8]"
              aria-label="Call +8801345061575"
              title="Call +8801345061575"
            >
              <i class="pi pi-phone text-xl"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-[#31C2B8]/20 mt-8 pt-8 relative text-center text-[#94A3B8]">
        <p>&copy; 2025 {{ global.companyName || 'Hubfluence Digital' }}. All rights reserved.</p>

        <span
          class="absolute right-0 bottom-0 text-[11px] text-white/20 select-none"
          style="pointer-events: none;"
        >
          Developed by Tajwar AL Haque Robin
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getGlobalSetting } from '@/lib/strapi';

const global = ref({
  companyName: 'Hubfluence Digital',
  tagline: '',
  email: '',
  phone: '',
  address: '',
  facebookUrl: '',
  instagramUrl: '',
  linkedinUrl: '',
  logoUrl: ''
});

onMounted(async () => {
  try {
    const gs = await getGlobalSetting();
    if (gs) global.value = gs;
  } catch (e) {
    console.error(e);
  }
});
</script>
