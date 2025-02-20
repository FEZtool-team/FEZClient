<template>
  <v-list class="bg-transparent text-primary rounded-xl">
    <p class="text-primary py-3 pl-4">Exports</p>
    <v-divider></v-divider>
    <v-list-item
      v-for="(exported, index) in exports"
      :key="index"
      class="text-primary"
      :class="[{ 'px-0': noPadding }]"
      :title="exported.title"
      @click="emit('showExport', exported)"
    ></v-list-item>
    <p
      v-if="exports.length < 1"
      class="text-primary text-center text-body-1 py-3"
    >
      There is no export yet!
      <br />
      try to export something
    </p>
  </v-list>
</template>

<script setup lang="ts">
import type { ExportedFile } from "~/types/projects/projects";

const props = defineProps<{
  exports: ExportedFile[];
  noPadding?: boolean;
}>();

const emit = defineEmits<{
  (e: "showExport", exported: ExportedFile): void;
}>();
</script>

<style scoped></style>
