<template>
  <v-card-item class="h-100 d-flex align-center justify-center">
    <SharedChooseFile
      :choose-file-dialog="chooseFileDialog"
      :selected-band="'RED'"
      :project-id="projectId"
      @choose="(e) => selectFile(e)"
      @close="chooseFileDialog = false"
    >
    </SharedChooseFile>
    <v-row>
      <v-col cols="12">
        <v-card
          v-if="!modelValue"
          border="dashed md primary opacity-75"
          class="rounded-xl text-center"
          color="transparent"
          max-width="500"
          max-height="400"
        >
          <v-card-text
            class="d-flex flex-column justify-center align-center h-100"
          >
            <h2 class="text-h4 text-primary">Tif File</h2>
            <p class="text-primary mb-6 mt-2">
              Upload *.tif image for processing.
            </p>

            <v-btn @click="openChooseFile"> Upload File or Choose one </v-btn>
          </v-card-text>
        </v-card>
        <v-hover v-else v-slot="{ isHovering, props }">
          <v-card
            border="dashed md primary opacity-75"
            class="rounded-xl text-center overflow-hidden"
            color="transparent"
            height="100%"
            max-width="500"
            max-height="400"
            v-bind="props"
          >
            <v-card-text
              class="d-flex flex-column justify-center align-center h-100 pa-0"
            >
              <v-img
                :src="modelValue.thumbnail_path"
                height="100%"
                max-height="100%"
                min-width="500"
                width="auto"
              >
                <v-expand-transition>
                  <div
                    v-if="isHovering"
                    class="d-flex flex-column align-center justify-center transition-fast-in-fast-out opacity-25 v-card--reveal text-h2"
                    style="
                      height: 100%;
                      background-color: rgba(var(--v-theme-primary), 0.4);
                    "
                  >
                    <h3 class="text-h3 text-center text-white">Tif file</h3>
                    <v-btn
                      color="white"
                      icon
                      variant="text"
                      size="60"
                      @click="clearFile()"
                    >
                      <v-icon size="60" :icon="CloseIcon"></v-icon>
                    </v-btn>
                  </div>
                </v-expand-transition>
              </v-img>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-card-item>
</template>

<script setup lang="ts">
import type { ChooseFileDto } from "~/types/dto/components/ChooseFileDto";
import type { ProjectFile } from "~/types/projects/projects";
import CloseIcon from "~icons/material-symbols/cancel-outline-rounded";

const chooseFileDialog = ref(false);

const emit = defineEmits<{
  (e: "update:model-value", value: ProjectFile | null): void;
}>();

const props = defineProps<{
  projectId: number;
  modelValue: ProjectFile | null;
}>();

const openChooseFile = () => {
  chooseFileDialog.value = true;
};

const selectFile = (e: ChooseFileDto) => {
  emit("update:model-value", e.file);
  chooseFileDialog.value = false;
};

const clearFile = () => {
  emit("update:model-value", null);
};
</script>

<style scoped></style>
