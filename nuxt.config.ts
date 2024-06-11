// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', 'nuxt-security', '@nuxtjs/google-fonts', 'nuxt-icon'],
  // cara menambahkan global head pada nuxt
  app: {
    head: {
      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      title: 'Image search with Pexel API',
    },
  },

  runtimeConfig: {
    public: {
      apiKey: process.env.API_KEY,
    },
  },

  googleFonts: {
    families: {
      Poppins: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  },
  
  security: {
    headers: {
      crossOriginResourcePolicy: 'self',
      contentSecurityPolicy: "img-src 'self' https://images.pexels.com https://www.google-analytics.com",
    },
  },
});