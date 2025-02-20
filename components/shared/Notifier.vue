<!-- components/Snackbar.vue -->
<template>
  <v-snackbar
    v-model="snackbar.visible"
    :color="snackbar.color"
    :timeout="snackbar.timeout"
    location="left"
  >
    {{ snackbar.content }}
    <template v-slot:actions>
      <v-btn size="small" color="white" @click="snackbar.hideMessage()">
        CLOSE
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useSnackbarStore } from "@/stores/snackbar";
const snackbar = useSnackbarStore();
</script>
