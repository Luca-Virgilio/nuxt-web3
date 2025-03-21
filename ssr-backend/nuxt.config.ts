// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "shadcn-nuxt"],
  devtools: { enabled: false },

  typescript: {
    strict: true,
    shim: false,
  },

  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },

  build: {
    transpile: ["ethers", "bn.js", "bignumber.js"],
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  vite: {
    optimizeDeps: {
      include: ["ethers", "bn.js"],
      exclude: ["@ethersproject/hash"],
    },
    build: {
      commonjsOptions: {
        include: [/bn\.js/, /ethers/, /node_modules/],
      },
    },
  },

  compatibilityDate: "2025-03-21",
});
