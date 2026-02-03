const RAW_BASE =
  (import.meta.env.VITE_STRAPI_URL && String(import.meta.env.VITE_STRAPI_URL)) ||
  "http://localhost:1337";

// remove trailing slash so we do not create //api/...
const STRAPI_URL = RAW_BASE.replace(/\/+$/, "");

const joinUrl = (base, path) => {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
};

const toAbsoluteUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return joinUrl(STRAPI_URL, url);
};

const fetchJson = async (path, options = {}) => {
  const url = joinUrl(STRAPI_URL, path);

  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  // Try to read body as text first so we can show a helpful error
  const text = await res.text().catch(() => "");

  let json = null;
  if (text) {
    try {
      json = JSON.parse(text);
    } catch {
      // not json, ignore
    }
  }

  if (!res.ok) {
    const msg =
      json?.error?.message ||
      json?.message ||
      text ||
      `${res.status} ${res.statusText}`;
    throw new Error(`Strapi error: ${msg}`);
  }

  return json ?? {};
};

export const getGlobalSetting = async () => {
  const candidates = [
    "/api/global-setting?populate=*",
    "/api/global-settings?populate=*",
  ];

  let lastErr = null;

  for (const path of candidates) {
    try {
      const json = await fetchJson(path);
      const data = json?.data;
      if (!data) return null;

      // v4 single type: { data: { id, attributes: {...} } }
      // v5 can be:      { data: { id, ...fields } }
      const attributes = data?.attributes ? data.attributes : data;

      const logoCandidate =
        attributes?.logo?.data?.attributes?.url ||
        attributes?.logo?.url ||
        attributes?.logo?.formats?.thumbnail?.url ||
        "";

      return {
        companyName: attributes?.companyName || "Hubfluence Digital",
        tagline: attributes?.tagline || "",
        email: attributes?.email || "",
        phone: attributes?.phone || "",
        address: attributes?.address || "",
        facebookUrl: attributes?.facebookUrl || "",
        instagramUrl: attributes?.instagramUrl || "",
        linkedinUrl: attributes?.linkedinUrl || "",
        logoUrl: toAbsoluteUrl(logoCandidate),
      };
    } catch (e) {
      lastErr = e;
    }
  }

  throw lastErr || new Error("Global setting not found");
};

export const createMessage = async (payload) => {
  // POST should work publicly after you allow permissions in Strapi
  return fetchJson("/api/messages", {
    method: "POST",
    body: JSON.stringify({ data: payload }),
  });
};
