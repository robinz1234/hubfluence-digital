<template>
  <main class="bg-black text-white">
    <PageHeader
      title="Contact Us"
      description="Get in touch with our team. We'd love to hear from you!"
    />

    <section class="py-16 bg-[#050505]">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <!-- Contact Form -->
          <div class="bg-[#0b0b0b] p-8 rounded-2xl border border-[#38959D]/20">
            <h2 class="text-2xl font-bold mb-6 text-white">Send Us a Message</h2>
            <ContactForm />
          </div>

          <!-- Contact Information -->
          <div class="lg:pl-8">
            <h2 class="text-2xl font-bold mb-6 text-white">Get in Touch</h2>
            <ContactInfo />

            <!-- Social Media Links -->
            <div class="mt-12">
              <h3 class="font-semibold text-lg mb-4 text-white">Follow Us</h3>
              <div class="flex gap-4">
                <a
                  v-for="social in socialLinks"
                  :key="social.icon"
                  href="#"
                  class="p-3 bg-[#0b0b0b] border border-[#38959D]/20 rounded-full hover:bg-[#31C2B8]/10 hover:text-[#31C2B8] transition-colors"
                >
                  <i :class="social.icon + ' text-xl'"></i>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import PageHeader from '@/components/shared/PageHeader.vue';
import ContactForm from '@/components/contact/ContactForm.vue';
import ContactInfo from '@/components/contact/ContactInfo.vue';

const socialLinks = [
  { icon: 'pi pi-facebook' },
  { icon: 'pi pi-twitter' },
  { icon: 'pi pi-instagram' },
  { icon: 'pi pi-linkedin' }
];
</script>
