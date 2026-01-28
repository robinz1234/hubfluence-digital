<template>
  <main class="bg-black text-white">
    <PageHeader
      title="About Us"
      description="A results-driven digital marketing agency focused on growth, creativity, and performance"
    />

    <section class="py-16 bg-[#050505]">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="text-3xl font-bold mb-6 text-white">Who We Are</h2>

            <p class="text-[#CAD9DA] mb-4">
              Hubfluence Digital helps brands grow, connect, and stand out in the digital space through strategic planning, creative content, influencer collaborations, and performance-based marketing.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div class="p-6 rounded-xl bg-[#0b0b0b] border border-[#38959D]/20">
                <h3 class="font-bold text-[#31C2B8] mb-2">Mission</h3>
                <p class="text-[#CAD9DA]">
                  Help brands grow with smart and creative digital marketing that increases engagement, builds trust, and supports long-term success.
                </p>
              </div>

              <div class="p-6 rounded-xl bg-[#0b0b0b] border border-[#38959D]/20">
                <h3 class="font-bold text-[#31C2B8] mb-2">Vision</h3>
                <p class="text-[#CAD9DA]">
                  Become a trusted digital growth partner by delivering creative, strategic, and performance-focused solutions that help businesses grow and succeed.
                </p>
              </div>
            </div>

            <h3 class="text-2xl font-bold mt-10 mb-4 text-white">Why Choose Hubfluence</h3>
            <ul class="space-y-3 text-[#CAD9DA]">
              <li class="flex gap-2 items-start">
                <span class="text-[#31C2B8]">•</span>
                Customized marketing strategies tailored to each brand
              </li>
              <li class="flex gap-2 items-start">
                <span class="text-[#31C2B8]">•</span>
                Creative and performance-focused content
              </li>
              <li class="flex gap-2 items-start">
                <span class="text-[#31C2B8]">•</span>
                Consistent brand communication across platforms
              </li>
              <li class="flex gap-2 items-start">
                <span class="text-[#31C2B8]">•</span>
                Transparent reporting and ongoing optimization
              </li>
            </ul>
          </div>

          <div class="relative">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
              alt="Team meeting"
              class="rounded-2xl border border-[#38959D]/20 shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import PageHeader from '@/components/shared/PageHeader.vue';
</script>
