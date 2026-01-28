<template>
  <main class="bg-black text-white">
    <PageHeader
      title="Our Portfolio"
      description="Explore our latest work and success stories"
    />

    <section class="py-16 bg-[#050505]">
      <div class="container mx-auto px-4">
        <!-- Video Section -->
        <div class="max-w-5xl mx-auto">
          <div class="mb-6 text-center">
            <h2 class="text-3xl md:text-4xl font-extrabold text-white">
              Where Strategy Meets Creativity
            </h2>
            <p class="mt-3 text-[#CAD9DA]">
              Tap to play. Tap again to pause.
            </p>
          </div>

          <div
            class="relative rounded-2xl overflow-hidden border border-[#38959D]/25 bg-black shadow-lg"
          >
            <!-- IMPORTANT:
              Put your video here:
              frontend/public/video/portfolio.mp4
              Best export: MP4 (H.264 video + AAC audio), 1080p, good bitrate.
            -->
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

        </div>

        <!-- Stats Section (only 3, centered) -->
        <div class="mt-20 flex flex-wrap justify-center gap-8">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="w-full sm:w-[260px] text-center p-6 rounded-xl bg-[#0b0b0b] border border-[#38959D]/20"
          >
            <div class="text-3xl font-bold text-[#31C2B8] mb-2">
              {{ stat.value }}
            </div>
            <div class="text-[#CAD9DA]">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import PageHeader from '@/components/shared/PageHeader.vue';

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

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Support Available' }
];
</script>

<style scoped>
/* Video clarity:
   "blurry" usually happens because the actual file is low-res or low bitrate.
   This CSS ensures we display it crisply and avoid unnecessary blur effects.
*/
.video-fit {
  display: block;
  height: auto;
  object-fit: cover;
  image-rendering: auto;
  filter: none;
  transform: translateZ(0);
}

/* Floating play/pause button sizing */
.video-fab {
  width: 52px;
  height: 52px;
  font-size: 18px;
}

/* Optional hover */
.video-fab:hover {
  filter: brightness(1.05);
}
</style>
