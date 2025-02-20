<template>
  <div class="tool-topbor overflow-x-auto">
    <v-dialog
      v-model="operationDialog"
      max-width="450"
      @update:model-value="clearOperate"
    >
      <v-card
        v-if="operationMode == 'group' && selectedOperate"
        rounded="xl"
        border="primary sm opacity-75"
      >
        <v-card-title class="d-flex align-center px-6 pt-5">
          {{ selectedOperate.title }}
          <v-btn
            class="ml-auto"
            icon
            variant="text"
            color="white"
            @click="clearOperate(false), (operationDialog = false)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="overflow-y-auto pt-0">
          <v-list v-if="selectedOperate.childrens">
            <v-tooltip
              :text="tooltipText(childAction)"
              v-for="childAction in selectedOperate.childrens"
              :key="childAction.type"
              :disabled="
                !(disabled || checkRequireBands(childAction.requiredBands))
              "
            >
              <template v-slot:activator="{ props }">
                <span v-bind="props">
                  <v-list-item
                    @click="selectInnerOperate(childAction)"
                    :prepend-icon="childAction.icon"
                    :disabled="
                      disabled || checkRequireBands(childAction.requiredBands)
                    "
                  >
                    {{ childAction.title }}
                  </v-list-item>
                </span>
              </template>
            </v-tooltip>
          </v-list>
        </v-card-text>
      </v-card>
      <v-card
        v-else-if="operationMode == 'single' && selectedInnerOperate"
        rounded="xl"
        border="primary sm opacity-75"
      >
        <v-card-title class="px-6 pt-5">
          <v-btn
            v-if="selectedOperate && selectedOperate.childrens"
            variant="text"
            icon
            @click="operationMode = 'group'"
          >
            <v-icon :icon="BackIcon"></v-icon>
          </v-btn>

          {{ selectedInnerOperate.title }}
        </v-card-title>
        <v-card-text class="overflow-y-auto">
          {{ selectedInnerOperate.title }} can significantly change the image.
          Are you certain you want to proceed?

          <v-form @submit.prevent="doOperate">
            <v-text-field
              v-model="title"
              class="my-2"
              label="Title"
              :rules="[rules.required]"
            ></v-text-field>

            <template
              v-for="param in selectedInnerOperate.extra_param"
              :key="param.title"
            >
              <v-checkbox
                v-if="param.type == 'Boolean'"
                v-model="param.value"
                :label="param.title"
                :hint="param.typeHint"
              ></v-checkbox>
              <v-text-field
                v-else
                v-model="param.value"
                class="my-2"
                :label="param.title"
                :type="param.type == 'Float' ? 'Number' : param.type"
                :rules="[param.required ? rules.required : true]"
                :hint="param.typeHint"
              ></v-text-field>
            </template>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn
            :disabled="!selectedInnerOperate || title.length < 1"
            @click="doOperate"
            :loading="operationLoading"
          >
            Proceed
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <ToolsVGlassCard
      class="overflow-hidden"
      :card-props="{ height: 100 }"
      transparent
    >
      <v-card-text
        class="d-flex no-wrap overflow-x-auto h-100 align-center py-1 scroll-behavior"
        @wheel="scrolling"
      >
        <v-btn
          v-for="action in actions[selectedOperationMode.value]"
          :key="action.title"
          class="mx-3"
          variant="text"
          icon
          size="70"
          stacked
          :disabled="
            disabled ||
            checkRequireBands(action.childrens ? [] : action.requiredBands)
          "
          @click="operate(action)"
        >
          <v-icon size="40" :icon="action.icon"> </v-icon>
          <div
            class="tools-title text-body-2 d-flex flex-column justify-center"
          >
            <div>
              {{ action.title }}
            </div>
          </div>
        </v-btn>
        <v-btn v-if="projectId" class="ml-auto" color="primary" icon>
          <v-icon :icon="selectedOperationMode.icon"></v-icon>
          <v-tooltip activator="parent">
            {{ selectedOperationMode.title }}
          </v-tooltip>
          <v-menu activator="parent">
            <v-item-group
              v-model="selectedOperationMode"
              @update:model-value="chengeOperationMode"
            >
              <v-list>
                <v-item
                  v-for="mode in operationModes"
                  :key="mode.title"
                  :value="mode"
                  v-slot:default="{ toggle }"
                >
                  <v-list-item @click="toggle" :prepend-icon="mode.icon">
                    <v-list-item-title>{{ mode.title }}</v-list-item-title>
                  </v-list-item>
                </v-item>
              </v-list>
            </v-item-group>
          </v-menu>
        </v-btn>
      </v-card-text>
    </ToolsVGlassCard>
  </div>
</template>

<script setup lang="ts">
import BackIcon from "~icons/material-symbols/arrow-circle-left-outline-rounded";

import { actions, operationModes } from "~/data/actionsData";

import type {
  Action,
  Band,
  OperationMode,
  SelectedFiles,
} from "~/types/tools/tools";
import type { OperationDataDto } from "~/types/dto/components/OperationDto";
import type { ExportedFile } from "~/types/projects/projects";
import { isNull } from "lodash";

const { validationRules: rules } = useValidation();
const axios = useApi();
const projects = useProjectStore();
const notify = useSnackbarStore();

const props = defineProps<{
  disabled: boolean;
  selectedFiles: SelectedFiles;
  projectId: number | null;
}>();

const emit = defineEmits<{
  (e: "showExport", payload: ExportedFile): void;
  (e: "changeMode", payload: OperationMode): void;
}>();

const selectedOperationMode = ref<OperationMode>(operationModes[0]);

const selectedOperate = ref<Action | null>(null);
const operationDialog = ref(false);
const title = ref("");
const operationLoading = ref(false);
const operationMode = ref<"single" | "group">("single");
const selectedInnerOperate = ref<Action | null>(null);

const chengeOperationMode = () => {
  emit("changeMode", selectedOperationMode.value);
};

const prepareOperationData = (): OperationDataDto => {
  let bands = {};

  if (selectedOperationMode.value.value == "bands") {
    bands = {
      red_band: props.selectedFiles.bands.RED
        ? props.selectedFiles.bands.RED.id
        : undefined,
      green_band: props.selectedFiles.bands.GREEN
        ? props.selectedFiles.bands.GREEN.id
        : undefined,
      blue_band: props.selectedFiles.bands.BLUE
        ? props.selectedFiles.bands.BLUE.id
        : undefined,
      nir_band: props.selectedFiles.bands.NIR
        ? props.selectedFiles.bands.NIR.id
        : undefined,
      swir1_band: props.selectedFiles.bands.SWIR1
        ? props.selectedFiles.bands.SWIR1.id
        : undefined,
      swir2_band: props.selectedFiles.bands.SWIR2
        ? props.selectedFiles.bands.SWIR2.id
        : undefined,
    };
  }

  const extra_params = {} as Record<string, string | number | boolean | null>;

  if (selectedInnerOperate.value?.extra_param) {
    for (const key in selectedInnerOperate.value?.extra_param) {
      if (
        Object.prototype.hasOwnProperty.call(
          selectedInnerOperate.value?.extra_param,
          key
        )
      ) {
        const param = selectedInnerOperate.value?.extra_param[key];

        extra_params[key] = !isNull(param.value)
          ? param.type == "Number" || param.type == "Float"
            ? parseFloat(param.value)
            : param.value
          : null;
      }
    }
  }

  const tif_file = props.selectedFiles.tif
    ? props.selectedFiles.tif.id
    : undefined;

  return {
    bands,
    extra_params,
    tif_file,
  };
};

const doOperate = () => {
  const data = prepareOperationData();
  operationLoading.value = true;
  axios
    .post(
      `/operation/?operation_type=${selectedInnerOperate.value?.type}&project_id=${props.projectId}&title=${title.value}`,
      data
    )
    .then(({ data: exported }) => {
      console.log(exported);
      projects.addExportToProject(props.projectId ?? 0, exported);
      emit("showExport", exported);
      operationDialog.value = false;
      title.value = "";
      operationLoading.value = false;
    })
    .catch((e) => {
      operationDialog.value = false;
      title.value = "";
      operationLoading.value = false;
      notify.handleCatch(e);
    });
};

const operate = (action: Action) => {
  if (action.childrens && action.childrens.length > 0) {
    operationMode.value = "group";
    selectedOperate.value = action;
  } else {
    operationMode.value = "single";
    selectedInnerOperate.value = action;
  }
  operationDialog.value = true;
  console.log(action);
};

const selectInnerOperate = (action: Action) => {
  selectedInnerOperate.value = action;
  operationMode.value = "single";
};

const clearOperate = (value: boolean) => {
  if (!value) {
    operationMode.value = "single";
    selectedOperate.value = null;
    selectedInnerOperate.value = null;
  }
};

const tooltipText = (action: Action) => {
  return `This tool requires ${action.requiredBands.join(",")} bands`;
};

// returns true if required band isn't filled
const checkRequireBands = (bands: Band[]) => {
  let haveRequireBands = true;

  switch (selectedOperationMode.value.value) {
    case "bands":
      if (bands.length == 0) return false;
      for (const band of bands) {
        if (!props.selectedFiles.bands[band]) haveRequireBands = false;
      }
      break;
    case "before_after":
      if (bands.length == 0) return false;
      for (const band of bands) {
        if (!props.selectedFiles.before_after.before[band])
          haveRequireBands = false;
        if (!props.selectedFiles.before_after.after[band])
          haveRequireBands = false;
      }
      break;
    case "tif":
      if (!props.selectedFiles.tif) haveRequireBands = false;
      break;
  }

  return !haveRequireBands;
};

const scrolling = (e: WheelEvent) => {
  const el = e.target as HTMLElement;
  e.preventDefault();
  el.scrollLeft += e.deltaY;
};
</script>

<style scoped></style>
