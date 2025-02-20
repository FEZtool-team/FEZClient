<script setup lang="ts">
import { useTheme } from "vuetify";

const themeCookie = useCookie("theme:mode");

interface ThemeSwitcherTheme {
  name: string;
  icon: string;
}

const props = defineProps<{
  themes: ThemeSwitcherTheme[];
}>();

const { name: themeName, global: globalTheme } = useTheme();
const {
  state: currentThemeName,
  next: getNextThemeName,
  index: currentThemeIndex,
} = useCycleList(
  props.themes.map((t) => t.name),
  { initialValue: themeName }
);

const changeTheme = () => {
  const changed = getNextThemeName();
  globalTheme.name.value = changed;
  themeCookie.value = changed;
};

// Update icon if theme is changed from other sources
watch(
  () => globalTheme.name.value,
  (val) => {
    currentThemeName.value = val;
  }
);

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

prefersDarkScheme.addEventListener("change", (e) => {
  if (e.matches) {
    if (!globalTheme.current.value.dark) {
      globalTheme.name.value = "dark";
    }
  } else {
    if (globalTheme.current.value.dark) {
      globalTheme.name.value = "light";
    }
  }
});

onBeforeMount(() => {
  if (!themeCookie.value) {
    if (prefersDarkScheme.matches) {
      if (!globalTheme.current.value.dark) {
        globalTheme.name.value = "dark";
        themeCookie.value = "dark";
      }
    } else {
      if (globalTheme.current.value.dark) {
        globalTheme.name.value = "light";
        themeCookie.value = "light";
      }
    }
  } else {
    globalTheme.name.value = themeCookie.value;
  }
});
</script>

<template>
  <v-btn icon variant="text" @click="changeTheme">
    <VIcon :size="24" :icon="props.themes[currentThemeIndex].icon" />
    <VTooltip activator="parent" open-delay="1000" scroll-strategy="close">
      <span class="text-capitalize">{{ currentThemeName }}</span>
    </VTooltip>
  </v-btn>
</template>
