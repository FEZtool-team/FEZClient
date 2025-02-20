import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { LightTheme } from "@/theme/LightTheme";
import { DarkTheme } from "@/theme/DarkTheme";
import defaults from "./vuetify/defaults";

import "@mdi/font/css/materialdesignicons.css";
import "@/scss/style.scss";

export default defineNuxtPlugin((nuxtApp) => {
  // config variables
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: "dark",
      themes: {
        light: LightTheme,
        dark: DarkTheme,
      },
    },
    defaults,
  });

  nuxtApp.vueApp.use(vuetify);
});
