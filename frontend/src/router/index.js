import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Services from "../views/Services.vue";
import Portfolio from "../views/Portfolio.vue";
import Contact from "../views/Contact.vue";

const SITE_NAME = "Hubfluence Digital";

// Set this on Render (frontend service) as:
// VITE_SITE_URL=https://www.hubfluencedigital.com
const getSiteUrl = () => {
  const envUrl = import.meta.env.VITE_SITE_URL;
  const base = (envUrl && String(envUrl).trim()) || window.location.origin;
  return base.replace(/\/+$/, "");
};

const upsertMeta = ({ key, attr, value }) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
};

const upsertLink = ({ rel, href }) => {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
      description:
        "Hubfluence Digital helps brands grow with strategy, creative content, and performance-driven digital marketing.",
    },
  },
  {
    path: "/services",
    name: "Services",
    component: Services,
    meta: {
      title: "Services",
      description:
        "Explore Hubfluence Digital services including strategy, creative production, performance marketing, and more.",
    },
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    component: Portfolio,
    meta: {
      title: "Portfolio",
      description:
        "See Hubfluence Digital work highlights, showreel, and recent outcomes for clients.",
    },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      title: "About",
      description:
        "Learn about Hubfluence Digital, our approach, and how we deliver marketing results.",
    },
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
    meta: {
      title: "Contact",
      description:
        "Contact Hubfluence Digital to discuss your goals, services, and next steps.",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: "smooth" };
    return { top: 0 };
  },
});

router.afterEach((to) => {
  const siteUrl = getSiteUrl();
  const pageTitle = to?.meta?.title ? `${to.meta.title} | ${SITE_NAME}` : SITE_NAME;
  const description =
    to?.meta?.description ||
    "Hubfluence Digital helps brands grow with strategy, creative content, and performance-driven digital marketing.";

  const canonicalUrl = `${siteUrl}${to.fullPath}`.replace(/\/+$/, "") || `${siteUrl}/`;

  document.title = pageTitle;

  // Basic SEO
  upsertMeta({ key: "description", attr: "name", value: description });
  upsertMeta({ key: "robots", attr: "name", value: "index,follow" });
  upsertLink({ rel: "canonical", href: canonicalUrl });

  // Open Graph
  upsertMeta({ key: "og:site_name", attr: "property", value: SITE_NAME });
  upsertMeta({ key: "og:type", attr: "property", value: "website" });
  upsertMeta({ key: "og:title", attr: "property", value: pageTitle });
  upsertMeta({ key: "og:description", attr: "property", value: description });
  upsertMeta({ key: "og:url", attr: "property", value: canonicalUrl });

  // Optional Twitter Card (safe even if you do not use it)
  upsertMeta({ key: "twitter:card", attr: "name", value: "summary" });
  upsertMeta({ key: "twitter:title", attr: "name", value: pageTitle });
  upsertMeta({ key: "twitter:description", attr: "name", value: description });
});

export default router;
