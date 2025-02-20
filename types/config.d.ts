export {};
import { Emitter } from "mitt";
import { ApiKey } from "./userdata/session";

interface PluginsInjections {
  $event: Emitter["emit"];
  $listen: Emitter["on"];
  $off: Emitter["off"];
}

declare module "#app" {
  interface NuxtApp extends PluginsInjections {}
}

declare module "nuxt/dist/app/nuxt" {
  interface NuxtApp extends PluginsInjections {}
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties extends PluginsInjections {}
}

declare global {
  interface SessionApiKey extends ApiKey {}
}
