<script setup lang="ts">
import { useTheme } from "vuetify";
const theme = useTheme();
import wLogo from "~/assets/logo/white-logo.png";
const props = defineProps({
  width: {
    type: String,
    default: "70",
  },
});
</script>
<template>
  <div class="logo">
    <NuxtLink to="/">
      <v-img
        v-if="theme.global.current.value.dark"
        :src="wLogo"
        :width="width"
      ></v-img>
      <v-img v-else :src="wLogo" :width="width"></v-img>
    </NuxtLink>
  </div>
</template>
