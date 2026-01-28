<template>
  <Menubar :model="items" class="fixed w-full z-50 border-none shadow-sm">
    <template #start>
      <router-link to="/" class="flex items-center">
        <span class="font-extrabold text-2xl md:text-3xl tracking-tight text-[#31C2B8]">
          {{ global.companyName || 'Hubfluence Digital' }}
        </span>
      </router-link>
    </template>

    <template #end>
      <router-link to="/contact">
        <Button
          label="Contact"
          icon="pi pi-send"
          class="p-button-rounded nav-contact-btn"
        />
      </router-link>
    </template>
  </Menubar>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getGlobalSetting } from '@/lib/strapi';

const route = useRoute();
const router = useRouter();

const global = ref({
  companyName: 'Hubfluence Digital',
  logoUrl: '',
});

const handleNavigation = (id) => {
  if (route.path === '/') {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  } else {
    router.push({ path: '/', hash: `#${id}` });
  }
};

const items = [
  { label: 'Home', icon: 'pi pi-home', command: () => router.push('/') },
  { label: 'Services', icon: 'pi pi-star', command: () => (route.path === '/' ? handleNavigation('services') : router.push('/services')) },
  { label: 'Portfolio', icon: 'pi pi-images', command: () => (route.path === '/' ? handleNavigation('portfolio') : router.push('/portfolio')) },
  { label: 'About', icon: 'pi pi-users', command: () => (route.path === '/' ? handleNavigation('about') : router.push('/about')) },
];

onMounted(async () => {
  try {
    const gs = await getGlobalSetting();
    if (gs) global.value = gs;
  } catch (e) {
    console.error(e);
  }
});
</script>

<style>
/* Make Menubar items bolder and bigger */
.p-menubar .p-menuitem-link,
.p-menubar .p-menuitem-text {
  font-weight: 800 !important;
  font-size: 1.05rem !important;
}

/* Hover and active stronger */
.p-menubar .p-menuitem-link:hover .p-menuitem-text {
  font-weight: 900 !important;
}

.p-menubar .p-menuitem-link.router-link-active .p-menuitem-text,
.p-menubar .p-menuitem-link.router-link-exact-active .p-menuitem-text {
  font-weight: 900 !important;
}

/* Contact button: bigger pill, bigger padding, bold text, keeps text inside */
.nav-contact-btn {
  background: #31C2B8 !important;
  color: #000 !important;
  border: none !important;

  font-weight: 900 !important;
  font-size: 1.05rem !important;

  padding: 0.75rem 1.25rem !important; /* bigger inner space */
  min-width: 140px; /* ensures "Contact" sits nicely */
  height: 46px; /* bigger outer rounded shape */
  border-radius: 9999px !important; /* full pill */
}

/* Space between icon and text */
.nav-contact-btn .p-button-icon {
  margin-right: 0.5rem !important;
}

/* Hover effect */
.nav-contact-btn:hover {
  filter: brightness(1.05);
}
</style>
