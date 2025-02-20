import type { Band } from "~/types/tools/tools";
import type { ProjectFile } from "../../projects/projects";

interface ChooseFileDto {
  band: Band;
  file: ProjectFile;
}

export type { ChooseFileDto };
