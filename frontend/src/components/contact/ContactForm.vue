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
import { reactive, ref } from "vue";

/**
 * IMPORTANT:
 * Put your backend base URL in frontend/.env like:
 * VITE_STRAPI_URL=http://localhost:1337
 * For production build on Render, set it to your Render backend URL.
 *
 * This component will post to: `${VITE_STRAPI_URL}/api/messages`
 */
const STRAPI_BASE_URL = (import.meta.env.VITE_STRAPI_URL || "").replace(/\/+$/, "");

// Form state
const form = reactive({
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
});

const loading = ref(false);
const error = ref("");
const success = ref(false);

// Helper: POST message to Strapi (public create)
const createMessagePublic = async (payload) => {
  if (!STRAPI_BASE_URL) {
    throw new Error("VITE_STRAPI_URL is missing in frontend/.env");
  }

  const res = await fetch(`${STRAPI_BASE_URL}/api/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // Strapi expects { data: {...} }
    body: JSON.stringify({ data: payload }),
  });

  // If forbidden, it means Public role does not have create permission
  if (res.status === 403) {
    const text = await res.text();
    throw new Error(
      `403 Forbidden. Enable Public permission: Message -> create. Server says: ${text}`
    );
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed (${res.status}). Server says: ${text}`);
  }

  return res.json();
};

const submit = async () => {
  error.value = "";
  success.value = false;

  if (
    !form.name.trim() ||
    !form.email.trim() ||
    !form.subject.trim() ||
    !form.message.trim()
  ) {
    error.value = "Please fill in name, email, subject, and message.";
    return;
  }

  loading.value = true;

  try {
    await createMessagePublic({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
      // keep this only if your Message content-type has this field
      messageStatus: "new",
    });

    success.value = true;

    form.name = "";
    form.email = "";
    form.phone = "";
    form.subject = "";
    form.message = "";
  } catch (e) {
    console.error(e);
    error.value =
      e?.message ||
      "Failed to send message. Check Strapi Public permission for Message: create.";
  } finally {
    loading.value = false;
  }
};
</script>
