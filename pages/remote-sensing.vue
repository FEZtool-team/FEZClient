<script lang="ts" setup>
import { isEqual } from "lodash";

import { operationModes } from "~/data/actionsData";

import type { Project, ExportedFile } from "~/types/projects/projects";
import type { OperationMode, SelectedFiles } from "~/types/tools/tools";

const { $listen, $off } = useNuxtApp();

const selectedProject = ref<null | Project>(null);

const selectedFiles = ref<SelectedFiles>({
  bands: {
    RED: null,
    GREEN: null,
    BLUE: null,
    NIR: null,
    SWIR1: null,
    SWIR2: null,
  },
  before_after: {
    before: {
      RED: null,
      GREEN: null,
      BLUE: null,
      NIR: null,
      SWIR1: null,
      SWIR2: null,
    },
    after: {
      RED: null,
      GREEN: null,
      BLUE: null,
      NIR: null,
      SWIR1: null,
      SWIR2: null,
    },
  },
  tif: null,
});

const selectedOperationMode = ref<OperationMode>(operationModes[0]);

const disabledTools = computed(() => {
  return isEqual(selectedFiles.value, {
    bands: {
      RED: null,
      GREEN: null,
      BLUE: null,
      NIR: null,
      SWIR1: null,
      SWIR2: null,
    },
    before_after: {
      before: {
        RED: null,
        GREEN: null,
        BLUE: null,
        NIR: null,
        SWIR1: null,
        SWIR2: null,
      },
      after: {
        RED: null,
        GREEN: null,
        BLUE: null,
        NIR: null,
        SWIR1: null,
        SWIR2: null,
      },
    },
    tif: null,
  });
});

const view = ref<"chooseProject" | "showExport">("chooseProject");
const selectedExport = ref<ExportedFile | null>(null);

const showExport = (exported: ExportedFile) => {
  selectedExport.value = exported;
  view.value = "showExport";
};

const clearShowExport = () => {
  selectedExport.value = null;
  view.value = "chooseProject";
};

const clearProject = () => {
  selectedProject.value = null;
  selectedFiles.value = {
    bands: {
      RED: null,
      GREEN: null,
      BLUE: null,
      NIR: null,
      SWIR1: null,
      SWIR2: null,
    },
    before_after: {
      before: {
        RED: null,
        GREEN: null,
        BLUE: null,
        NIR: null,
        SWIR1: null,
        SWIR2: null,
      },
      after: {
        RED: null,
        GREEN: null,
        BLUE: null,
        NIR: null,
        SWIR1: null,
        SWIR2: null,
      },
    },
    tif: null,
  };
  clearShowExport();
};

const selectProject = (project: Project) => {
  console.log(project);
  selectedProject.value = project;
};

onMounted(() => {
  $listen("project:delete-export", (id: number) => {
    if (selectedProject.value?.operation_output) {
      selectedProject.value.operation_output =
        selectedProject.value.operation_output.filter(
          (operation) => operation.id != id
        );
    }
    clearShowExport();
  });
});

onBeforeUnmount(() => {
  $off("project:delete-export");
});
</script>
<template>
  <div class="flex flex-column ma-0 h-100 w-100">
    <!-- header -->
    <RemoteSensingActions
      :project-id="selectedProject?.id ?? null"
      :disabled="disabledTools"
      :selected-files="selectedFiles"
      @show-export="showExport"
      @change-mode="(e) => (selectedOperationMode = e)"
    />
    <!-- header -->
    <div class="tool-content">
      <div class="d-flex pt-3 h-100">
        <!-- sidebar -->
        <v-col class="pa-0" cols="2">
          <ToolsVGlassCard
            transparent
            class="overflow-hidden h-100 d-flex flex-column"
          >
            <v-card-text class="pa-0 overflow-y-auto">
              <SharedExportList
                :exports="selectedProject?.operation_output ?? []"
                @show-export="showExport"
              />
            </v-card-text>

            <v-card-actions v-if="selectedProject" class="d-flex flex-column">
              <v-btn
                v-if="selectedExport"
                class="ma-0 mt-1"
                block
                color="primary"
                @click="clearShowExport"
              >
                Back
              </v-btn>
              <v-btn
                class="ma-0 mt-1"
                block
                color="primary"
                @click="clearProject"
              >
                Close Project
              </v-btn>
            </v-card-actions>
          </ToolsVGlassCard>
        </v-col>
        <!-- sidebar -->
        <!-- content -->
        <v-col class="pa-0 pl-3 max-h-100" cols="10">
          <!-- chooseProjectView -->
          <ToolsVGlassCard
            v-if="selectedProject && view == 'chooseProject'"
            transparent
            class="h-100"
          >
            <RemoteSensingBandsSelect
              v-if="selectedOperationMode.value == 'bands'"
              v-model="selectedFiles.bands"
              :project-id="selectedProject.id"
            />
            <RemoteSensingBeforeAfterSelect
              v-else-if="selectedOperationMode.value == 'before_after'"
              v-model="selectedFiles.before_after"
              :project-id="selectedProject.id"
            />
            <RemoteSensingSingleFileSelect
              v-else-if="selectedOperationMode.value == 'tif'"
              v-model="selectedFiles.tif"
              :project-id="selectedProject.id"
            />
          </ToolsVGlassCard>
          <!-- chooseProjectView -->
          <!-- chooseFileView -->
          <ToolsVGlassCard
            v-else-if="view == 'chooseProject'"
            transparent
            class="h-100"
          >
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
                  <h2 class="text-h4 text-primary">Choose Project</h2>
                  <p class="text-primary mb-6 mt-4">
                    Want to continue on an existing project or start something
                    fresh? The choice is yours.
                  </p>
                  <SharedChooseProject @choose="selectProject">
                    <template #default="{ props }">
                      <v-btn v-bind="props"> Choose one </v-btn>
                    </template>
                  </SharedChooseProject>
                </v-card-text>
              </v-card>
            </v-card-item>
          </ToolsVGlassCard>
          <!-- chooseFileView -->
          <!-- showExportView -->
          <SharedShowExport
            v-else-if="selectedExport"
            :project-id="selectedProject?.id ?? 0"
            :output="selectedExport"
          />
          <!-- showExportView -->
        </v-col>
        <!-- content -->
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.tools-title {
  height: 35px;
}
</style>
