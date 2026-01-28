const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

const toAbsoluteUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
};

const fetchJson = async (path) => {
  const res = await fetch(`${STRAPI_URL}${path}`);
  if (!res.ok) throw new Error(`Strapi error: ${res.status} ${res.statusText}`);
  return res.json();
};

export const getGlobalSetting = async () => {
  // Try both, different Strapi versions can differ in single type route naming
  const candidates = [
    '/api/global-setting?populate=*',
    '/api/global-settings?populate=*'
  ];

  let lastErr = null;

  for (const path of candidates) {
    try {
      const json = await fetchJson(path);

      // Expected shapes:
      // v4 single type: { data: { id, attributes: { ... } } }
      // v5 can be:     { data: { id, ...fields } } or { data: { ... } }
      const data = json?.data;

      if (!data) return null;

      const attributes = data?.attributes ? data.attributes : data;

      const logoCandidate =
        attributes?.logo?.data?.attributes?.url ||
        attributes?.logo?.url ||
        attributes?.logo?.formats?.thumbnail?.url ||
        '';

      return {
        companyName: attributes?.companyName || 'Hubfluence Digital',
        tagline: attributes?.tagline || '',
        email: attributes?.email || '',
        phone: attributes?.phone || '',
        address: attributes?.address || '',
        facebookUrl: attributes?.facebookUrl || '',
        instagramUrl: attributes?.instagramUrl || '',
        linkedinUrl: attributes?.linkedinUrl || '',
        logoUrl: toAbsoluteUrl(logoCandidate)
      };
    } catch (e) {
      lastErr = e;
    }
  }

  throw lastErr;
};

export const createMessage = async (payload) => {
  const res = await fetch(`${STRAPI_URL}/api/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: payload })
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Message submit failed: ${res.status} ${res.statusText} ${text}`);
  }

  return res.json();
};
