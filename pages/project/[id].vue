<script lang="ts" setup>
import TrashIcon from "~icons/material-symbols/delete-outline-rounded";
import NoFileIcon from "~icons/circum/file-off";

import moment from "jalali-moment";
import type {
  Project,
  ExportedFile,
  ProjectFile,
} from "~/types/projects/projects";

const route = useRoute();
const router = useRouter();
const axios = useApi();
const projects = useProjectStore();
const { mediaRules } = useValidation();
const notify = useSnackbarStore();
const { $listen, $off } = useNuxtApp();

const id = route.params.id;
const project = ref<Project | null>(null);

const selectedImageIndex = ref(0);
const selectedImage = computed(() => {
  return project.value?.files[selectedImageIndex.value];
});

const selectImage = (index: number) => {
  selectedImageIndex.value = index;
};

const view = ref<"showFiles" | "showExport">("showFiles");
const selectedExport = ref<ExportedFile | null>(null);
const showExport = (exported: ExportedFile) => {
  selectedExport.value = exported;
  view.value = "showExport";
  console.log(exported);
};

const clearShowExport = () => {
  selectedExport.value = null;
  view.value = "showFiles";
};

const uploadFileDialog = ref(false);
const file = ref<File | null>(null);
const uploading = ref(false);
const uploadProgress = ref(0);

const uploadFile = () => {
  if (!uploading.value) {
    uploading.value = true;

    const uploadData = {
      file: file.value,
      filename: file.value?.name,
    };

    axios
      .postForm(`/file/upload?project_id=${id}`, uploadData, {
        onUploadProgress: (progressEvent) => {
          uploadProgress.value = Math.floor(
            (progressEvent.progress ?? 0) * 100
          );
        },
      })
      .then(({ data: newFile }) => {
        console.log(newFile);
        project.value?.files.push(newFile);
        projects.addFileToProject(project.value?.id ?? 0, newFile);
        uploading.value = false;
        file.value = null;
        uploadProgress.value = 0;
        uploadFileDialog.value = false;
      })
      .catch((e) => {
        console.log(e);
        uploading.value = false;
        uploadProgress.value = 0;
        notify.handleCatch(e);
      });
  }
};

const deleteProject = () => {
  if (project.value) {
    projects.showDeleteDialog("Project", project.value);
  }
};

const deleteFile = (file: ProjectFile) => {
  if (file && project.value) {
    projects.showDeleteDialog("File", file, project.value.id);
  }
};

const getProjectData = async () => {
  project.value = await projects.getProject(`${id}`);
};

onMounted(() => {
  $listen("project:delete-project", () => {
    router.push("/");
  });

  $listen("project:delete-file", () => {
    getProjectData();
    selectImage(0);
  });

  $listen("project:delete-export", (id: number) => {
    if (project.value?.operation_output) {
      project.value.operation_output = project.value.operation_output.filter(
        (operation) => operation.id != id
      );
    }
    getProjectData();
    clearShowExport();
  });

  getProjectData();
});

onBeforeUnmount(() => {
  $off("project:delete-project");
  $off("project:delete-file");
  $off("project:delete-export");
});
</script>
<template>
  <div v-if="project" class="flex flex-column ma-0 h-100 w-100">
    <div class="tool-topbor overflow-x-auto">
      <ToolsVGlassCard
        class="overflow-hidden d-flex align-center"
        :card-props="{ height: 100 }"
        transparent
      >
        <v-card-title class="d-flex align-center w-100 text-h2 text-primary">
          {{ project.name.toUpperCase() }}
          <span class="text-white text-h5 font-weight-regular">
            {{ project.subtitle }}
          </span>

          <v-btn class="ml-auto" icon variant="text" @click="deleteProject">
            <v-icon :icon="TrashIcon"></v-icon>
            <v-tooltip activator="parent"> Delete Project </v-tooltip>
          </v-btn>
        </v-card-title>
      </ToolsVGlassCard>
    </div>
    <div class="tool-content-2">
      <div class="d-flex pt-3 h-100">
        <v-col class="pa-0" cols="2">
          <!-- sidebar -->
          <ToolsVGlassCard
            transparent
            class="h-100 d-flex flex-column overflow-hidden"
          >
            <v-card-text class="overflow-y-auto">
              <div class="mb-2 pl-2 text-body-2">
                <div>
                  Last action:
                  <span class="text-primary">
                    {{ project.last_action ?? "No action yet" }}
                  </span>
                </div>
                <div class="desc-text mt-2">
                  Description:
                  <span class="text-primary">
                    {{ project.description }}
                  </span>
                </div>
              </div>
              <div class="mb-2 pl-2 text-body-2">
                <div>
                  Created at:
                  <span class="text-primary">
                    {{ moment(project.created_at).format("DD MMMM YYYY") }}
                  </span>
                </div>
                <div class="mt-2">
                  Modified
                  <span class="text-primary">
                    {{ moment(project.updated_at).format("DD MMMM YYYY") }}
                  </span>
                </div>
                <div class="mt-2">
                  <div class="mb-1">Tags :</div>
                  <span>
                    <v-chip density="compact" color="primary">
                      {{ project.tag }}
                    </v-chip>
                  </span>
                </div>
                <SharedExportList
                  :exports="project?.operation_output ?? []"
                  @show-export="showExport"
                  no-padding
                />
              </div>
            </v-card-text>
            <v-card-actions>
              <div class="d-flex flex-column w-100">
                <v-btn
                  v-if="view == 'showExport'"
                  class="mb-2"
                  block
                  color="primary"
                  @click="clearShowExport"
                >
                  Close export
                </v-btn>
                <!-- file upload -->
                <v-dialog
                  v-model="uploadFileDialog"
                  max-width="450"
                  @update:modelValue="file = null"
                >
                  <template #activator="{ props: activatorProps }">
                    <v-btn
                      v-bind="activatorProps"
                      block
                      color="primary"
                      class="ml-0"
                    >
                      Upload File
                    </v-btn>
                  </template>
                  <v-card rounded="xl" border="primary sm opacity-75">
                    <v-card-title class="px-6 pt-5">
                      Choose a file to Upload
                    </v-card-title>
                    <v-card-text>
                      <v-file-input
                        v-model="file"
                        label="File"
                        accept="image/tiff"
                        :disabled="uploading"
                        :rules="[mediaRules.justTif]"
                      >
                      </v-file-input>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn
                        text="Upload"
                        @click="uploadFile"
                        :disabled="!file"
                      >
                        <v-progress-circular
                          v-if="uploading"
                          color="white"
                          size="25"
                          :model-value="uploadProgress"
                        ></v-progress-circular>
                        <span v-else> Upload File </span>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!-- file upload -->
              </div>
            </v-card-actions>
          </ToolsVGlassCard>
          <!-- sidebar -->
        </v-col>
        <v-col class="pa-0 pl-3 max-h-100" cols="10">
          <!-- content -->
          <ToolsVGlassCard
            v-if="view == 'showFiles'"
            transparent
            class="h-100 d-flex flex-column"
          >
            <v-card
              v-if="project.files.length < 1"
              border="dashed md primary opacity-75"
              class="rounded-xl text-center mx-auto my-auto"
              color="transparent"
              max-width="500"
              max-height="400"
            >
              <v-card-text
                class="d-flex flex-column justify-center align-center h-100"
              >
                <v-icon color="primary" size="100" :icon="NoFileIcon"></v-icon>
                <p class="text-primary my-6">
                  No file uploaded yet!
                  <br />
                  try to upload one
                </p>
                <v-btn
                  color="primary"
                  class="ml-0"
                  @click="uploadFileDialog = true"
                >
                  Upload File
                </v-btn>
              </v-card-text>
            </v-card>
            <v-img
              v-if="selectedImage"
              :src="selectedImage?.image_path"
              class="my-4 image-dynamic-height"
              contain
            >
              <v-btn
                class="position-absolute right-0 top-0 mr-3 z-10"
                icon
                @click="deleteFile(selectedImage)"
              >
                <v-icon :icon="TrashIcon"></v-icon>
                <v-tooltip activator="parent"> Delete File </v-tooltip>
              </v-btn>
            </v-img>
            <v-sheet class="mt-auto" color="transparent">
              <v-slide-group v-model="selectedImageIndex">
                <v-slide-group-item
                  v-for="(image, index) in project.files"
                  :key="index"
                >
                  <v-card
                    class="ma-4 bg-transparent overflow-hidden rounded-xl"
                    height="150"
                    width="150"
                    border="primary sm opacity-75"
                  >
                    <v-hover v-slot:default="{ isHovering, props }">
                      <v-img
                        :src="image.thumbnail_path"
                        height="150"
                        contain
                        v-bind="props"
                        @click="selectImage(index)"
                      >
                        <v-expand-transition>
                          <v-btn
                            v-if="isHovering"
                            class="position-absolute right-0 top-0 z-10"
                            icon
                            @click="deleteFile(image)"
                          >
                            <v-icon :icon="TrashIcon"></v-icon>
                            <v-tooltip activator="parent">
                              Delete File
                            </v-tooltip>
                          </v-btn>
                        </v-expand-transition>
                      </v-img>
                    </v-hover>
                  </v-card>
                </v-slide-group-item>
              </v-slide-group>
            </v-sheet>
          </ToolsVGlassCard>

          <SharedShowExport
            v-else-if="selectedExport"
            :project-id="project?.id ?? 0"
            :output="selectedExport"
          />
          <!-- content -->
        </v-col>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.image-dynamic-height {
  height: calc(100% - 250px);
}
</style>
