<template>
  <main class="bg-black text-white">
    <!-- Hero Section -->
    <section id="home" class="min-h-screen flex items-center relative overflow-hidden bg-black">
      <div
        class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-8 pt-8 md:mt-0 md:pt-4"
      >
        <!-- Left Content -->
        <div class="text-left">
          <h1
            class="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#31C2B8] to-[#38959D]"
            style="line-height: 1.25!important;"
          >
            We Create
            <span class="relative">
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#31C2B8] to-[#38959D]">
                Digital
              </span>
              <span class="absolute left-0 -bottom-2 w-full h-2 bg-[#31C2B8] rounded-md"></span>
            </span>
            Experiences
          </h1>

          <p class="text-xl text-[#CAD9DA] mb-8">
            Transform your brand with strategy, creative content, and performance-driven digital marketing.
          </p>

          <div class="flex gap-4">
            <Button
              @click="navigateToSection('services')"
              label="Get Started"
              icon="pi pi-arrow-right"
              class="p-button-rounded p-button-lg custom-get-started"
            />
            <Button
              @click="navigateToSection('portfolio')"
              label="Our Work"
              icon="pi pi-images"
              class="p-button-rounded p-button-lg custom-our-work"
            />
          </div>
        </div>

        <!-- Right Illustration -->
        <div class="relative">
          <img
            src="/hero-img.svg"
            alt="Creative workspace"
            class="rounded-2xl transform hover:scale-105 transition-transform duration-300"
          />
          <!-- Decorative Elements -->
          <div class="absolute -top-8 -right-8 w-32 h-32 bg-[#31C2B8]/10 rounded-full blur-2xl"></div>
          <div class="absolute -bottom-8 -left-8 w-32 h-32 bg-[#38959D]/10 rounded-full blur-2xl"></div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="py-20 bg-[#050505]">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-white">Our Services</h2>

        <div v-if="servicesLoading" class="text-center text-[#94A3B8]">
          Loading services...
        </div>

        <div v-else-if="servicesError" class="text-center text-red-500">
          {{ servicesError }}
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard
            v-for="service in services"
            :key="service.title"
            v-bind="service"
          />
        </div>

        <div class="text-center mt-12">
          <router-link to="/services">
            <Button
              label="View All Services"
              icon="pi pi-arrow-right"
              severity="secondary"
              class="p-button-rounded"
            />
          </router-link>
        </div>
      </div>
    </section>

    <!-- Portfolio Preview (Synced with new Portfolio page: Video instead of projects) -->
    <section id="portfolio" class="py-20 bg-black">
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <div class="mb-6 text-center">
            <h2 class="text-3xl md:text-4xl font-extrabold text-white">
              Portfolio
            </h2>
            <p class="mt-3 text-[#CAD9DA]">
              Previous Works
            </p>
          </div>

          <div class="relative rounded-2xl overflow-hidden border border-[#38959D]/25 bg-black shadow-lg">
            <video
              ref="videoEl"
              class="video-fit w-full"
              preload="metadata"
              playsinline
              controlslist="nodownload noremoteplayback noplaybackrate"
              @click="togglePlay"
              @ended="handleEnded"
            >
              <source src="/video/portfolio.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <!-- Floating Play/Pause Button -->
            <button
              type="button"
              @click.stop="togglePlay"
              class="absolute bottom-4 right-4 flex items-center justify-center rounded-full bg-[#31C2B8] text-black shadow-lg video-fab"
              :aria-label="isPlaying ? 'Pause video' : 'Play video'"
              title="Play/Pause"
            >
              <i v-if="!isPlaying" class="pi pi-play"></i>
              <i v-else class="pi pi-pause"></i>
            </button>
          </div>

          <div class="text-center mt-10">
            <router-link to="/portfolio">
              <Button
                label="Open Portfolio"
                icon="pi pi-arrow-right"
                severity="secondary"
                class="p-button-rounded"
              />
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- About Preview -->
    <section id="about" class="py-20 bg-[#050505]">
      <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold mb-6 text-white">Who We Are</h2>
          <p class="text-[#CAD9DA] mb-8">
            Hubfluence Digital is a results-driven marketing agency focused on strategic planning, creative content, influencer collaborations, and performance marketing.
          </p>
          <router-link to="/about">
            <Button label="Learn More" icon="pi pi-arrow-right" severity="secondary" class="p-button-rounded" />
          </router-link>
        </div>
        <div class="relative">
          <img
            src="/about-logo.svg"
            alt="Our team"
            class="rounded-2xl transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section id="contact" class="py-20 text-white" style="background: linear-gradient(90deg, #000000, #38959D, #31C2B8);">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto text-white/90">
          Let’s create influence that turns into real business growth.
        </p>
        <router-link to="/contact">
          <Button label="Contact Us" icon="pi pi-send" class="p-button-rounded p-button-lg p-button-outlined" />
        </router-link>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ServiceCard from '@/components/services/ServiceCard.vue';

const services = ref([]);
const servicesLoading = ref(true);
const servicesError = ref('');

/* Video state for homepage portfolio preview */
const videoEl = ref(null);
const isPlaying = ref(false);

const togglePlay = async () => {
  if (!videoEl.value) return;

  try {
    if (videoEl.value.paused) {
      await videoEl.value.play();
      isPlaying.value = true;
    } else {
      videoEl.value.pause();
      isPlaying.value = false;
    }
  } catch (e) {
    console.error('Video play failed:', e);
  }
};

const handleEnded = () => {
  isPlaying.value = false;
};

const normalizeIcon = (iconName) => {
  if (!iconName) return 'pi pi-star';
  if (iconName.startsWith('pi-')) return `pi ${iconName}`;
  if (iconName.startsWith('pi ')) return iconName;
  return iconName;
};

const fetchHomeServices = async () => {
  servicesLoading.value = true;
  servicesError.value = '';

  try {
    const res = await fetch('http://localhost:1337/api/services?populate=*');
    if (!res.ok) throw new Error(`Strapi error: ${res.status} ${res.statusText}`);

    const json = await res.json();
    const items = Array.isArray(json.data) ? json.data : [];

    const mapped = items
      .map((item) => ({
        icon: normalizeIcon(item.iconName),
        title: item.title || '',
        description: item.shortDescription || '',
        features: [],
        order: item.order ?? 999,
        featured: item.featured === true,
      }))
      .sort((a, b) => a.order - b.order);

    const featuredOnly = mapped.filter((s) => s.featured).slice(0, 3);
    services.value = featuredOnly.length > 0 ? featuredOnly : mapped.slice(0, 3);
  } catch (e) {
    console.error(e);
    services.value = [];
    servicesError.value =
      'Could not load services from Strapi. Make sure Strapi is running and Public role allows Service: find.';
  } finally {
    servicesLoading.value = false;
  }
};

const navigateToSection = (id) => {
  const element = document.getElementById(id);
  if (element) element.scrollIntoView({ behavior: 'smooth' });
};

onMounted(fetchHomeServices);
</script>

<style scoped>
.custom-get-started {
  background-color: #31C2B8 !important;
  color: #000 !important;
  border: none !important;
  width: 160px;
  height: 42px;
  padding: 8px 12px;
}

.custom-get-started:hover {
  background-color: #38959D !important;
  color: #000 !important;
}

.custom-our-work {
  background-color: transparent !important;
  color: #F8FAFC !important;
  border: 2px solid #38959D !important;
  width: 160px;
  height: 42px;
  padding: 8px 12px;
}

.custom-our-work:hover {
  background-color: #38959D !important;
  color: #000 !important;
}

/* Video clarity */
.video-fit {
  display: block;
  height: auto;
  object-fit: cover;
  image-rendering: auto;
  filter: none;
  transform: translateZ(0);
}

/* Floating play/pause button */
.video-fab {
  width: 52px;
  height: 52px;
  font-size: 18px;
}

.video-fab:hover {
  filter: brightness(1.05);
}
</style>
