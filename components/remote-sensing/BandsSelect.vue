<template>
  <v-card-item class="h-100 d-flex align-center justify-center">
    <SharedChooseFile
      :choose-file-dialog="chooseFileDialog"
      :selected-band="selectedBand"
      :project-id="projectId"
      @choose="selectFile"
      @close="chooseFileDialog = false"
    >
    </SharedChooseFile>
    <v-row>
      <v-col v-for="band in bands" :key="band" cols="4">
        <v-card
          v-if="!modelValue[band]"
          border="dashed md primary opacity-75"
          class="rounded-xl text-center"
          color="transparent"
          max-width="500"
          max-height="400"
        >
          <v-card-text
            class="d-flex flex-column justify-center align-center h-100"
          >
            <h2 class="text-h4 text-primary">{{ band }}</h2>
            <p class="text-primary mb-6 mt-2">
              Upload different image bands for processing. Band validation is
              currently unavailable. Please upload correct bands.
            </p>

            <v-btn @click="openChooseFile(band)">
              Upload File or Choose one
            </v-btn>
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
                :src="modelValue[band].thumbnail_path"
                height="100%"
                max-height="100%"
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
                    <h3 class="text-h3 text-center text-white">
                      {{ band }}
                    </h3>
                    <v-btn
                      color="white"
                      icon
                      variant="text"
                      size="60"
                      @click="clearFile(band)"
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
import type { Band, SelectedBands } from "~/types/tools/tools";
import CloseIcon from "~icons/material-symbols/cancel-outline-rounded";

const chooseFileDialog = ref(false);
const selectedBand = ref<Band>("RED");

const emit = defineEmits<{
  (e: "update:model-value", value: SelectedBands): void;
}>();

const props = defineProps<{
  projectId: number;
  modelValue: SelectedBands;
}>();

const openChooseFile = (band: Band) => {
  selectedBand.value = band;
  chooseFileDialog.value = true;
};

const selectFile = (data: ChooseFileDto) => {
  props.modelValue[data.band] = data.file;
  chooseFileDialog.value = false;
  emit("update:model-value", props.modelValue);
};

const clearFile = (band: Band) => {
  props.modelValue[band] = null;
};

const bands: Band[] = ["RED", "GREEN", "BLUE", "NIR", "SWIR1", "SWIR2"];
</script>

<style scoped></style>
