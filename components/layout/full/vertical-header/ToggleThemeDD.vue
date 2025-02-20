<script setup lang="ts">
import ThemeSwitcher from "../../../tools/ThemeSwitcher.vue";

interface ThemeSwitcherTheme {
  name: string;
  icon: string;
}

const themes: ThemeSwitcherTheme[] = [
  {
    name: "light",
    icon: "mdi-weather-sunny",
  },
  {
    name: "dark",
    icon: "mdi-weather-night",
  },
];
</script>

<template>
  <ThemeSwitcher class="ml-2" :themes="themes" />
</template>
