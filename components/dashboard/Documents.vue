<script setup>
import geoinformaticsIcon from "~icons/material-symbols-light/satellite-alt-outline-rounded";
import articleIcon from "~icons/material-symbols-light/article-outline-rounded";
import geologyIcon from "~icons/hugeicons/geology-crust";
import softwareIcon from "~icons/iconoir/github";
</script>
<template>
  <ToolsVGlassCard class="h-100" transparent>
    <v-card-title class="pa-4 pa-md-7 text-h2 font-weight-regular">
      Documents
    </v-card-title>
    <v-card-text class="px-md-5 px-4">
      <v-row class="ma-n1">
        <v-col cols="12" md="7">
          <v-btn color="primary" size="x-large" block>
            <v-icon
              class="mr-4 ml-n4"
              :icon="geoinformaticsIcon"
              size="30"
            ></v-icon>
            Geoinformatics
          </v-btn>
        </v-col>
        <v-col cols="12" md="5">
          <v-btn color="primary" size="x-large" block>
            <v-icon class="mr-4 ml-n4" :icon="articleIcon" size="35"></v-icon>
            Article
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="ma-n1">
        <v-col cols="12" md="6">
          <v-btn color="primary" size="x-large" block>
            <v-icon class="mr-4 ml-n4" :icon="geologyIcon" size="30"></v-icon>
            Geology
          </v-btn>
        </v-col>
        <v-col cols="12" md="6">
          <v-btn color="primary" size="x-large" block>
            <v-icon class="mr-4 ml-n4" :icon="softwareIcon" size="28"></v-icon>
            Software
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </ToolsVGlassCard>
</template>
