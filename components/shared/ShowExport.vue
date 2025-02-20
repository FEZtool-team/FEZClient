<template>
  <ToolsVGlassCard transparent class="h-100">
    <div
      class="position-absolute d-flex flex-column right-0 top-0 pr-3 pt-3 z-10"
    >
      <a
        :href="output.file_path"
        :download="`${output.title}.${output.extension}`"
      >
        <v-btn class="mb-3" icon>
          <v-icon :icon="DownloadIcon"></v-icon>
          <v-tooltip activator="parent"> Delete Export </v-tooltip>
        </v-btn>
      </a>

      <v-btn class="mb-3" icon @click="deleteExport">
        <v-icon :icon="TrashIcon"></v-icon>
        <v-tooltip activator="parent"> Delete Export </v-tooltip>
      </v-btn>
    </div>
    <v-card-text class="h-100 d-flex align-center justify-center">
      <v-img :src="output?.image_path" height="100%"></v-img>
    </v-card-text>
  </ToolsVGlassCard>
</template>

<script setup lang="ts">
import type { ExportedFile } from "~/types/projects/projects";
import TrashIcon from "~icons/material-symbols/delete-outline-rounded";
import DownloadIcon from "~icons/material-symbols/download-rounded";

const projects = useProjectStore();

const props = defineProps<{
  projectId: number;
  output: ExportedFile;
}>();

const deleteExport = () => {
  if (props.output && props.projectId != 0) {
    projects.showDeleteDialog("Export", props.output, props.projectId);
  }
};
</script>

<style scoped></style>
