import type { ThemeTypes } from "@/types/themeTypes/ThemeType";
import type { ThemeDefinition } from "vuetify";

const LightTheme: ThemeTypes & ThemeDefinition = {
  name: "LightTheme",
  dark: false,
  variables: {
    "border-color": "#AFB3B6",
    "carousel-control-size": 10,
  },
  colors: {
    primary: "#5D87FF",
    secondary: "#49BEFF",
    info: "#539BFF",
    success: "#13DEB9",
    accent: "#FFAB91",
    warning: "#FFAE1F",
    error: "#FA896B",
    muted: "#5a6a85",
    lightprimary: "#ECF2FF",
    lightsecondary: "#E8F7FF",
    lightsuccess: "#E6FFFA",
    lighterror: "#FDEDE8",
    lightwarning: "#FEF5E5",
    textPrimary: "#2A3547",
    textSecondary: "#2A3547",
    borderColorLight: "#e5eaef",
    borderColor: "#BBBFC3",
    inputBorder: "#000",
    containerBg: "#ffffff",
    hoverColor: "#f6f9fc",
    surface: "#fff",
    "on-surface-variant": "#fff",
    grey100: "#F2F6FA",
    grey200: "#EAEFF4",
  },
};
export { LightTheme };
