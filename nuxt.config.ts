// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,

  app: {
    baseURL: '/srt-to-text/',
  },

  modules: ['@nuxt/eslint', '@nuxt/ui'],

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
