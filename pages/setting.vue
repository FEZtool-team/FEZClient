<script lang="ts" setup>
const open = ref(["Users"]);

import profileSettingIcon from "~icons/material-symbols-light/manage-accounts-outline";
import apiKeyIcon from "~icons/material-symbols-light/key-vertical-outline-rounded";

const menu = ref([
  {
    title: "Profile",
    icon: profileSettingIcon,
    link: "/setting",
  },
  {
    title: "Api key",
    icon: apiKeyIcon,
    link: "/setting/api-key",
  },
]);
</script>
<template>
  <v-row class="flex-column ma-0 mt-n1 h-100 w-100">
    <v-col class="pa-0">
      <v-row class="h-100 mt-0">
        <v-col class="pb-0" cols="2">
          <ToolsVGlassCard transparent class="h-100">
            <v-list class="bg-transparent text-primary rounded-xl">
              <v-list-item
                v-for="(page, index) in menu"
                :key="index"
                class="text-primary"
                :title="page.title"
                :to="page.link"
                :prepend-icon="page.icon"
                exact
              >
              </v-list-item>
            </v-list>
          </ToolsVGlassCard>
        </v-col>
        <v-col class="pb-0" cols="10">
          <nuxt-page />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
