import type { SVGAttributes } from "vue";
import type { ProjectFile } from "../projects/projects";

type Band = "RED" | "GREEN" | "BLUE" | "NIR" | "SWIR1" | "SWIR2";

interface SelectedBands {
  RED: ProjectFile | null;
  GREEN: ProjectFile | null;
  BLUE: ProjectFile | null;
  NIR: ProjectFile | null;
  SWIR1: ProjectFile | null;
  SWIR2: ProjectFile | null;
}

interface SelectedBeforeAfterBands {
  before: SelectedBands;
  after: SelectedBands;
}

interface SelectedFiles {
  bands: SelectedBands;
  before_after: SelectedBeforeAfterBands;
  tif: ProjectFile | null;
}

type ExtraParamDataTypes = "Number" | "String" | "Float" | "Boolean";

interface ExtraParam {
  title: string;
  required: boolean;
  typeHint?: string;
}

interface ExtraParamBoolean extends ExtraParam {
  type: Extract<ExtraParamDataTypes, "Boolean">;
  value: boolean;
}

interface ExtraParamString extends ExtraParam {
  type: Exclude<ExtraParamDataTypes, "Boolean">;
  value: string;
}

interface Action {
  title: string;
  type: string;
  icon: SVGAttributes | any;
  requiredBands: Band[];
  childrens?: Action[];
  extra_param?: Record<string, ExtraParamBoolean | ExtraParamString>;
}

type OperationModeValue = "bands" | "before_after" | "tif";

interface OperationMode {
  title: string;
  icon: SVGAttributes | any;
  value: OperationModeValue;
}

interface ActionList {
  bands: Action[];
  before_after: Action[];
  tif: Action[];
}

export type {
  Band,
  SelectedBands,
  SelectedBeforeAfterBands,
  SelectedFiles,
  Action,
  ActionList,
  OperationMode,
  OperationModeValue,
};
