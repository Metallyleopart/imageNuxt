// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', 'nuxt-security', '@nuxtjs/google-fonts'],
  runtimeConfig: {
    public: {
      apiKey: process.env.API_KEY,
    },
  },
  googleFonts: {
    families: {
      Poppins: [100, 200, 300, 400, 500, 600, 700, 800, 900]
    }
  },
  security: {
    headers: {
      crossOriginResourcePolicy: 'same-origin',
      contentSecurityPolicy: "img-src 'self' https://images.pexels.com https://www.google-analytics.com",
    },
  },
});
