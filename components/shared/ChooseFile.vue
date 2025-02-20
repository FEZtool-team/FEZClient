<script setup lang="ts">
import uploadBtnIcon from "~icons/material-symbols-light/upload-rounded";
import type { Project, ProjectFile } from "~/types/projects/projects";
import type { ChooseFileDto } from "~/types/dto/components/ChooseFileDto";
import moment from "jalali-moment";
import type { Band } from "~/types/tools/tools";

const emit = defineEmits<{
  (e: "choose", value: ChooseFileDto): void;
  (e: "close"): void;
}>();

const props = defineProps<{
  projectId: string | number;
  selectedBand: Band;
  chooseFileDialog: boolean;
}>();

const axios = useApi();
const notify = useSnackbarStore();
const projects = useProjectStore();
const { mediaRules } = useValidation();

const loading = ref(false);

const selectedProject = ref<Project | null>(null);
const file = ref<File | null>(null);

const uploading = ref(false);
const uploadProgress = ref(0);

const selectFile = (file: ProjectFile) => {
  emit("choose", { file, band: props.selectedBand });
};

const uploadFile = () => {
  if (!uploading.value) {
    uploading.value = true;

    const uploadData = {
      file: file.value,
      filename: file.value?.name,
    };

    axios
      .postForm(
        `/file/upload?project_id=${selectedProject.value?.id}`,
        uploadData,
        {
          onUploadProgress: (progressEvent) => {
            uploadProgress.value = Math.floor(
              (progressEvent.progress ?? 0) * 100
            );
          },
        }
      )
      .then(({ data: newFile }) => {
        console.log(newFile);
        projects.addFileToProject(selectedProject.value?.id ?? 0, newFile);
        uploading.value = false;
        file.value = null;
        uploadProgress.value = 0;
      })
      .catch((e) => {
        console.log(e);
        uploading.value = false;
        uploadProgress.value = 0;
        notify.handleCatch(e);
      });
  }
};

const clearDialog = () => {
  file.value = null;
};

onMounted(async () => {
  if (!projects.isLoaded) {
    loading.value = true;
    await projects.loadProjects();
    loading.value = false;
  }
  selectedProject.value = projects.findProject(props.projectId);
});
</script>
<template>
  <v-dialog
    :model-value="chooseFileDialog"
    max-width="600"
    @update:modelValue="clearDialog"
  >
    <template #activator="{ props: activatorProps }">
      <slot :props="activatorProps"></slot>
    </template>
    <v-scroll-y-transition leave-absolute>
      <v-card rounded="xl" border="primary sm opacity-75">
        <v-card-title class="d-flex align-center px-6 pt-5">
          Choose file or upload one
          <v-btn
            class="ml-auto"
            icon
            variant="text"
            color="white"
            @click="emit('close')"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="overflow-y-auto" style="height: 500px">
          <v-row>
            <v-col>
              <v-file-input
                v-model="file"
                label="File"
                accept="image/tiff"
                :disabled="uploading"
                :rules="[mediaRules.justTif]"
              >
                <template #append>
                  <v-btn icon @click="uploadFile" :disabled="!file">
                    <v-progress-circular
                      v-if="uploading"
                      color="white"
                      size="30"
                      :model-value="uploadProgress"
                    ></v-progress-circular>
                    <v-icon v-else :icon="uploadBtnIcon"></v-icon>
                  </v-btn>
                </template>
              </v-file-input>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              v-if="!selectedProject?.files || selectedProject.files.length < 1"
              class="text-center"
            >
              No file uploaded yet!
            </v-col>
            <v-col
              v-for="(files, index) in selectedProject?.files"
              :key="index"
              cols="12"
              md="6"
            >
              <v-card
                border="primary sm opacity-75"
                class="mx-auto pb-4 rounded-xl overflow-hidden"
                @click="selectFile(files)"
              >
                <v-img
                  height="200px"
                  :src="files.thumbnail_path ?? ''"
                  cover
                ></v-img>

                <v-card-title>
                  {{ files.filename }}
                </v-card-title>

                <v-card-subtitle>
                  {{
                    moment(selectedProject?.created_at).format("DD MMMM YYYY")
                  }}
                </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-scroll-y-transition>
  </v-dialog>
</template>

<style scoped></style>
~/types/dto/ChooseFileDto
