export default defineNuxtConfig({
  ssr: false,
  extends: ["@nuxt-themes/docus", "nuxt-lego"],
  modules: [
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@nuxt/image-edge",
    "nuxt-windicss",
    // custom content modules, need to come before the content module
    "~/app/module",
    "~/modules/unplugin-icons",
    "@nuxt/content",
    "@nuxtseo/module",
    "nuxt-link-checker",
    "nuxt-simple-sitemap",
  ],

  site: {
    name: "Jan Petry",
    logo: "/jan-petry.webp",
    titleSeparator: "·",
    url: "https://janpetry.de/",
    description:
      "Developer, working for KÜS Data GmbH and in my free im coding a bit and playing some video games.",
    language: "en-US",
  },

  experimental: {
    headNext: true,
  },

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  linkChecker: {
    enabled: false,
  },

  css: ["@/resources/scrollbars.css", "@/resources/main.scss"],
  // https://color-mode.nuxtjs.org
  colorMode: {
    fallback: "dark",
    classSuffix: "",
  },

  pinceau: {
    configFileName: "tokens.config",
    studio: false,
    debug: true,
    followSymbolicLinks: false,
  },

  app: {
    head: {
      title: "Jan Petry",
      link: [{ rel: "preconnect", href: "https://res.cloudinary.com" }],
    },
  },
  // https://content.nuxtjs.org
  content: {
    documentDriven: {
      injectPage: false,
    },
    highlight: {
      // See the available themes on https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-theme
      theme: "dracula",
    },
  },

  image: {
    cloudinary: {
      baseURL:
        "https://res.cloudinary.com/dwl1vhp3v/image/upload/v1686178087/images",
      modifiers: {
        quality: "auto:best",
        dpr: "auto",
      },
    },
    domains: ["avatars0.githubusercontent.com"],
  },

  studio: {
    enabled: true,
  },

  nitro: {
    prerender: {
      failOnError: false,
      crawlLinks: true,
      routes: ["/", "/feed.xml", "/feed.json", "/feed.atom"],
    },
    static: true,
  },
  hooks: {
    // Related to https://github.com/nuxt/nuxt/pull/22558
    // Adding all global components to the main entry
    // To avoid lagging during page navigation on client-side
    // Downside: bigger JS bundle
    // With sync: 465KB, gzip: 204KB
    // Without: 418KB, gzip: 184KB
    "components:extend": function (components) {
      for (const comp of components) {
        if (comp.global) comp.global = "sync";
      }
    },
  },
});
