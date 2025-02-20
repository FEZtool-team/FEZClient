import * as dotenv from "dotenv";
dotenv.config({
  path: `./.env.${process.env.NODE_ENV}.local`,
  override: false,
});
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "FEZtool - Free and Easy",
      titleTemplate: "%s - FEZtool",
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: {
      name: "slide",
      mode: "out-in",
    },
  },

  modules: [
    "@sidebase/nuxt-auth",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/google-fonts",
    "unplugin-icons/nuxt",
  ],

  plugins: ["~/plugins/plugins"],

  googleFonts: {
    outputDir: "assets",
    preload: true,
    families: {
      Poppins: true,
    },
  },

  auth: {
    baseURL: process.env.BASE_URL,
    provider: {
      type: "local",
      pages: {
        login: "/auth/login",
      },
      endpoints: {
        signOut: {
          path: "/auth/logout",
          method: "get",
        },
        signIn: {
          path: "/auth/token",
          method: "post",
        },
        signUp: {
          path: "/auth/signup",
          method: "post",
        },
        getSession: {
          path: "/user/",
          method: "get",
        },
      },
      sessionDataType: {
        created_at: "string",
        email: "string",
        id: "number",
        name: "string",
        role: "string",
        updated_at: "string",
        api_keys: "SessionApiKey[]",
      },
      token: {
        maxAgeInSeconds: 60 * 60 * 24,
      },
    },
    globalAppMiddleware: {
      isEnabled: true,
    },
  },

  i18n: {
    vueI18n: "./i18n/i18n.config.ts",
    locales: [
      { code: "en", language: "en-US", dir: "ltr" },
      { code: "fa", language: "fa-IR", dir: "rtl" },
    ],
    defaultLocale: "en",
  },

  ssr: false,

  typescript: {
    shim: false,
  },

  build: {
    transpile: ["vuetify"],
  },

  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          verbose: true,
          logger: {
            warn(message: any, options: any) {
              if (!message.includes("deprec")) {
                console.warn(message, options);
              }
            },
          },
        },
      },
    },
  },

  nitro: {
    serveStatic: true,
  },

  devServer: {
    port: parseInt(process.env.PORT ?? "3000"),
  },

  runtimeConfig: {
    public: {
      disableConsole: process.env.NODE_ENV === "production",
    },
  },

  devServerHandlers: [],
  hooks: {},
  compatibilityDate: "2024-07-14",
});
