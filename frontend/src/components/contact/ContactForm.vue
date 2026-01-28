<template>
  <form @submit.prevent="submit" class="space-y-5">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm text-[#CAD9DA] mb-2">Name</label>
        <input
          v-model="form.name"
          type="text"
          class="w-full rounded-xl border border-[#38959D]/40 bg-white text-black placeholder-gray-500 px-4 py-3 outline-none focus:border-[#31C2B8] focus:ring-2 focus:ring-[#31C2B8]/30"
          placeholder="Your name"
        />
      </div>

      <div>
        <label class="block text-sm text-[#CAD9DA] mb-2">Email</label>
        <input
          v-model="form.email"
          type="email"
          class="w-full rounded-xl border border-[#38959D]/40 bg-white text-black placeholder-gray-500 px-4 py-3 outline-none focus:border-[#31C2B8] focus:ring-2 focus:ring-[#31C2B8]/30"
          placeholder="you@email.com"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm text-[#CAD9DA] mb-2">Phone (optional)</label>
        <input
          v-model="form.phone"
          type="text"
          class="w-full rounded-xl border border-[#38959D]/40 bg-white text-black placeholder-gray-500 px-4 py-3 outline-none focus:border-[#31C2B8] focus:ring-2 focus:ring-[#31C2B8]/30"
          placeholder="+880..."
        />
      </div>

      <div>
        <label class="block text-sm text-[#CAD9DA] mb-2">Subject</label>
        <input
          v-model="form.subject"
          type="text"
          class="w-full rounded-xl border border-[#38959D]/40 bg-white text-black placeholder-gray-500 px-4 py-3 outline-none focus:border-[#31C2B8] focus:ring-2 focus:ring-[#31C2B8]/30"
          placeholder="How can we help?"
        />
      </div>
    </div>

    <div>
      <label class="block text-sm text-[#CAD9DA] mb-2">Message</label>
      <textarea
        v-model="form.message"
        rows="6"
        class="w-full rounded-xl border border-[#38959D]/40 bg-white text-black placeholder-gray-500 px-4 py-3 outline-none focus:border-[#31C2B8] focus:ring-2 focus:ring-[#31C2B8]/30"
        placeholder="Write your message..."
      ></textarea>
    </div>

    <div v-if="error" class="text-red-500 text-sm">
      {{ error }}
    </div>

    <div v-if="success" class="text-green-500 text-sm">
      Message sent successfully.
    </div>

    <Button
      type="submit"
      label="Send Message"
      icon="pi pi-send"
      class="p-button-rounded"
      :loading="loading"
      style="background:#31C2B8;color:#000;border:none;"
    />
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { createMessage } from '@/lib/strapi';

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
});

const loading = ref(false);
const error = ref('');
const success = ref(false);

const submit = async () => {
  error.value = '';
  success.value = false;

  if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
    error.value = 'Please fill in name, email, subject, and message.';
    return;
  }

  loading.value = true;

  try {
    await createMessage({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
      messageStatus: 'new'
    });

    success.value = true;

    form.name = '';
    form.email = '';
    form.phone = '';
    form.subject = '';
    form.message = '';
  } catch (e) {
    console.error(e);
    error.value = 'Failed to send message. Check Strapi Public permission for Message: create.';
  } finally {
    loading.value = false;
  }
};
</script>
