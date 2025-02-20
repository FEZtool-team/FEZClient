<script setup lang="ts">
import FixIcon from "~icons/material-symbols-light/settings-alert-outline-rounded";
</script>
<template>
  <ToolsVGlassCard transparent class="h-100">
    <v-card-item class="h-100 d-flex align-center justify-center">
      <v-card
        border="dashed md primary opacity-75"
        class="rounded-xl text-center"
        color="transparent"
        max-width="500"
        max-height="400"
      >
        <v-card-text
          class="d-flex flex-column justify-center align-center h-100"
        >
          <v-icon color="primary" size="100" :icon="FixIcon"></v-icon>
          <p class="text-primary my-6">
            Exciting changes are coming to this page! We're working hard to
            enhance your remote sensing experience. Please come back soon to
            explore the new features.
          </p>
          <v-btn to="/"> Go back Home</v-btn>
        </v-card-text>
      </v-card>
    </v-card-item>
  </ToolsVGlassCard>
</template>
