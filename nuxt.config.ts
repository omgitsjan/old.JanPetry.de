export default defineNuxtConfig({
  extends: ['@nuxt-themes/docus', 'nuxt-lego'],
  modules: [
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@nuxt/image-edge',
    'nuxt-windicss',
    // custom content modules, need to come before the content module
    '~/app/module',
    '~/modules/unplugin-icons',
    '@nuxt/content',
    '@nuxtseo/module',
    'nuxt-link-checker',
    'nuxt-simple-sitemap',
    '@nuxthq/studio',
    "@nuxthub/core"
  ],

  site: {
    name: 'Jan Petry',
    logo: '/jan-petry.webp',
    url: 'https://janpetry.de/',
    description: 'Full stack developer, doing things with Vue, Nuxt, and .NET ecosystems.',
    defaultLocale: 'en-US',
  },

  devtools: {
    enabled: true,
  },

  linkChecker: {
    enabled: false,
    excludeLinks: [
      'https://twitter.com/omgitsjan',
    ],
  },

  css: [
    '@/resources/scrollbars.css',
    '@/resources/main.scss',
  ],
  // https://color-mode.nuxtjs.org
  colorMode: {
    fallback: 'dark',
    classSuffix: '',
  },

  pinceau: {
    configFileName: 'tokens.config',
    studio: false,
    debug: true,
    followSymbolicLinks: false,
  },

  app: {
    head: {
      title: 'Jan Petry',
      templateParams: {
        separator: '·',
      },
      link: [
        { rel: 'preconnect', href: 'https://res.cloudinary.com' },
      ],
    },
  },
  // https://content.nuxtjs.org
  content: {
    documentDriven: {
      injectPage: false,
    },
    highlight: {
      // See the available themes on https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-theme
      theme: 'dracula',
    },
  },

  image: {
    cloudinary: {
      baseURL: "https://res.cloudinary.com/dwl1vhp3v/image/upload/v1686178087/images",
      modifiers: {
        quality: 'auto:best',
        dpr: 'auto',
      },
    },
    domains: [
      'avatars0.githubusercontent.com',
    ],
  },

  nitro: {
    prerender: {
      failOnError: false,
      crawlLinks: true,
      routes: [
        '/',
        '/feed.xml',
        '/feed.json',
        '/feed.atom',
      ],
    },
  },
  hooks: {
    // Related to https://github.com/nuxt/nuxt/pull/22558
    // Adding all global components to the main entry
    // To avoid lagging during page navigation on client-side
    // Downside: bigger JS bundle
    // With sync: 465KB, gzip: 204KB
    // Without: 418KB, gzip: 184KB
    'components:extend': function (components: any) {
      for (const comp of components) {
        if (comp.global)
          comp.global = 'sync'
      }
    },
  },
})