export default defineNuxtConfig({
  extends: ['nuxt-seo-kit', '@nuxt-themes/docus'],
  modules: [
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@nuxt/image-edge',
    'nuxt-windicss',
    // custom content modules, need to come before the content module
    '~/app/module',
    '~/modules/unplugin-icons',
    '@nuxt/content',
    'nuxt-seo-ui',
  ],

  site: {
    name: 'Harlan Wilton',
    logo: '/harlan-wilton.jpeg',
  },

  devtools: {
    enabled: false,
  },

  runtimeConfig: {
    public: {
      titleSeparator: '·',
      siteUrl: 'https://janpetry.de/',
      siteName: 'Jan Petry',
      siteDescription:
        'Developer, working for KÜS Data GmbH and in my free im coding a bit and playing some video games.',
      language: 'en-US',
    },
  },

  css: ['@/resources/scrollbars.css', '@/resources/main.scss'],
  // https://color-mode.nuxtjs.org
  colorMode: {
    fallback: 'dark',
    classSuffix: '',
  },

  devtools: {
    isEnabled: true,
  },

  pinceau: {
    configFileName: 'tokens.config',
    studio: false,
    debug: true,
    followSymbolicLinks: false,
  },

  app: {
    head: {
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        { rel: 'preconnect', href: 'https://res.cloudinary.com' },
      ],
      meta: [{ 'http-equiv': 'accept-ch', content: 'DPR' }],
    },
  },
  // https://content.nuxtjs.org
  content: {
    documentDriven: true,
    highlight: {
      // See the available themes on https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-theme
      theme: 'dracula',
    },
  },

  image: {
    cloudinary: {
      baseURL:
        'https://res.cloudinary.com/dwl1vhp3v/image/upload/v1686178087/images',
      modifiers: {
        quality: 'auto:best',
        dpr: 'auto',
      },
    },
    domains: ['avatars0.githubusercontent.com'],
  },

  studio: {
    enabled: false,
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/feed.xml', '/feed.json', '/feed.atom'],
    }
  },
})
