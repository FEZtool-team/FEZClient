// ===============================|| Blank Layout
||=============================== //
<script setup lang="ts">
const { localeProperties } = useI18n();
const { dir } = localeProperties.value;
</script>
<template>
  <v-app>
    <v-locale-provider :rtl="dir == 'rtl'">
      <NuxtPage />
    </v-locale-provider>
  </v-app>
</template>
