// stores/snackbar.ts
import { AxiosError } from "axios";
import { defineStore } from "pinia";
import type {
  ExportedFile,
  Project,
  ProjectFile,
} from "~/types/projects/projects";

interface AddProjectData {
  name: string;
  description: string;
}

type DeleteType = "" | "Project" | "File" | "Export";

export const useProjectStore = defineStore("project", () => {
  const axios = useApi();
  const notify = useSnackbarStore();
  const { $event } = useNuxtApp();

  // State
  const isLoaded = ref(false);
  const loading = ref(false);
  const projects = ref<Project[]>([]);

  const deleting = ref(false);
  const deleteDialog = ref(false);
  const deleteType = ref<DeleteType>("");
  const selectedDeleteObject = ref<Project | ExportedFile | ProjectFile | null>(
    null
  );
  const selectedDeleteProjectId = ref<number>(0);

  // Actions
  const loadProjects = async (reload = false) => {
    if ((!isLoaded.value || reload) && !loading.value) {
      loading.value = true;
      try {
        const { data } = await axios.get("/project/list/?skip=0&limit=10");
        projects.value = data;
        isLoaded.value = true;
      } catch (e: any) {
        if (!e.code || e.code != AxiosError.ERR_BAD_REQUEST) {
          notify.handleCatch(e);
        }
      } finally {
        loading.value = false;
      }
    }
  };

  const addProject = async (
    addProjectData: AddProjectData
  ): Promise<boolean> => {
    let success = false;
    try {
      const result = await axios.post("/project/", addProjectData);
      const { data: project } = result;
      projects.value.push(project);
      success = true;
    } catch (e) {
      notify.handleCatch(e);
      success = false;
    }
    return success;
  };

  const getProject = async (id: number | string): Promise<Project | null> => {
    let foundedProject: null | Project = null;
    await axios
      .get(`/project/${id}`)
      .then(({ data }) => {
        foundedProject = data;
      })
      .catch((e) => {
        notify.handleCatch(e);
      });
    return foundedProject;
  };

  const findProject = (projectId: number | string): Project | null => {
    return (
      projects.value.find((project: Project) => project.id === projectId) ??
      null
    );
  };

  const addFileToProject = (projectId: number, file: ProjectFile) => {
    const foundedProject = projects.value.find((p) => p.id === projectId);
    if (!foundedProject) {
      notify.showDefaultError();
    } else {
      foundedProject.files.push(file);
    }
  };

  const addExportToProject = (projectId: number, exported: ExportedFile) => {
    const foundedProject = projects.value.find((p) => p.id === projectId);
    if (!foundedProject) {
      notify.showDefaultError();
    } else {
      foundedProject.operation_output.push(exported);
      updateProject(projectId);
    }
  };

  const updateProject = async (projectId: number) => {
    const updatedProject = await getProject(projectId);
    const indexToReplace = projects.value.findIndex(
      (prj) => prj.id == projectId
    );

    if (
      indexToReplace !== -1 &&
      updatedProject &&
      projects.value[indexToReplace]
    ) {
      projects.value[indexToReplace] = updatedProject;
    }
  };

  const showDeleteDialog = (
    type: DeleteType,
    object: Project | ExportedFile | ProjectFile,
    projectId?: number
  ) => {
    selectedDeleteObject.value = object;
    selectedDeleteProjectId.value = projectId ?? 0;
    deleteType.value = type;
    deleteDialog.value = true;
  };

  const clearDeleteDialog = () => {
    deleteType.value = "";
    deleteDialog.value = false;
  };

  const doDelete = async () => {
    deleting.value = true;
    switch (deleteType.value) {
      case "Project":
        await deleteProject();
        break;
      case "File":
        await deleteFile();
        break;
      case "Export":
        await deleteExport();
        break;
    }
    deleting.value = false;
  };

  const deleteProject = async () => {
    await axios
      .delete(`/project/delete/${selectedDeleteObject.value?.id}`)
      .then(() => {
        loadProjects(true);
        clearDeleteDialog();
        $event("project:delete-project");
      })
      .catch((e) => {
        notify.handleCatch(e);
      });
  };

  const deleteFile = async () => {
    await axios
      .delete(`/file/delete/${selectedDeleteObject.value?.id}`)
      .then(() => {
        loadProjects(true);
        clearDeleteDialog();
        $event("project:delete-file");
      })
      .catch((e) => {
        notify.handleCatch(e);
      });
  };

  const deleteExport = async () => {
    await axios
      .delete(`/operation/delete/${selectedDeleteObject.value?.id}`)
      .then(() => {
        loadProjects(true);
        clearDeleteDialog();
        $event("project:delete-export", selectedDeleteObject.value?.id);
      })
      .catch((e) => {
        notify.handleCatch(e);
      });
  };

  // Expose state and actions
  return {
    isLoaded,
    loading,
    projects,
    deleting,
    deleteDialog,
    deleteType,
    loadProjects,
    addProject,
    getProject,
    findProject,
    addFileToProject,
    addExportToProject,
    clearDeleteDialog,
    showDeleteDialog,
    doDelete,
  };
});
