export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      origin: [
        "http://localhost:5173",
        "http://localhost:3000",

        // Strapi backend (optional to keep, doesn't hurt)
        "https://hubfluence-digital-1918.onrender.com",

        // Frontend on Render (replace this with your actual frontend Render URL)
        "https://hubfluence-digital-frontend.onrender.com",
      ],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      headers: ["Content-Type", "Authorization", "Origin", "Accept"],
      keepHeaderOnError: true,
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
