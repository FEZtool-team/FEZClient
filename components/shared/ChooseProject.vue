<script setup lang="ts">
import placeholderImage from "~/assets/placeholders/placeholder.jpg";
import type { Project } from "~/types/projects/projects";
import type { ChooseProjectDto } from "~/types/dto/components/ChooseProjectDto";
import moment from "jalali-moment";

const emit = defineEmits<{
  (e: "choose", file: ChooseProjectDto): void;
}>();

const view = ref<"addProject" | "chooseProject">("chooseProject");

const projects = useProjectStore();
const { validationRules: rules } = useValidation();

const chooseProjectDialog = ref(false);

const loading = ref(false);

const selectProject = (project: Project) => {
  emit("choose", project);
  chooseProjectDialog.value = false;
};

const addProjectLoading = ref(false);
const addProjectValidated = ref(false);
const addProjectName = ref("");
const addProjectDescription = ref("");

const projectFilter = ref("");

const filteredProjects = computed<Project[]>(() => {
  return projects.projects.filter((prj) => {
    return (
      prj.name
        .toLowerCase()
        .includes(projectFilter.value.toLocaleLowerCase()) ||
      prj.description
        .toLowerCase()
        .includes(projectFilter.value.toLocaleLowerCase()) ||
      prj.tag.toLowerCase().includes(projectFilter.value.toLocaleLowerCase()) ||
      (prj.last_action ?? "")
        .toLowerCase()
        .includes(projectFilter.value.toLocaleLowerCase()) ||
      moment(prj.created_at)
        .format("DD MMMM YYYY")
        .toLowerCase()
        .includes(projectFilter.value.toLocaleLowerCase()) ||
      moment(prj.updated_at)
        .format("DD MMMM YYYY")
        .toLowerCase()
        .includes(projectFilter.value.toLocaleLowerCase())
    );
  });
});

const addProject = async () => {
  addProjectLoading.value = true;

  const addProjectData = {
    name: addProjectName.value,
    description: addProjectDescription.value,
  };

  const success = await projects.addProject(addProjectData);

  if (success) clearAddProject();

  addProjectLoading.value = false;
};

const clearAddProject = () => {
  addProjectName.value = "";
  addProjectDescription.value = "";
  view.value = "chooseProject";
};

onMounted(async () => {
  if (!projects.isLoaded) {
    loading.value = true;
    await projects.loadProjects();
    loading.value = false;
  }
});
</script>
<template>
  <v-dialog v-model="chooseProjectDialog" max-width="600">
    <template #activator="{ props: activatorProps }">
      <slot :props="activatorProps"></slot>
    </template>
    <v-scroll-y-transition leave-absolute>
      <v-card
        v-if="view == 'chooseProject'"
        rounded="xl"
        border="primary sm opacity-75"
      >
        <v-card-title class="d-flex align-center px-6 pt-5">
          Choose project
          <v-btn
            class="ml-auto"
            icon
            variant="text"
            color="white"
            @click="chooseProjectDialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="overflow-y-auto" style="height: 500px">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="projectFilter"
                label="Filter projects"
                density="compact"
                clearable
              ></v-text-field>
            </v-col>
            <v-col
              v-for="(project, index) in filteredProjects"
              :key="index"
              cols="12"
              md="6"
            >
              <v-card
                min-height="268"
                border="primary sm opacity-75"
                class="mx-auto pb-4 rounded-xl overflow-hidden"
                @click="selectProject(project)"
              >
                <v-img
                  height="200px"
                  :src="
                    project.files.length > 0 && project.files[0].thumbnail_path
                      ? project.files[0].thumbnail_path
                      : placeholderImage
                  "
                  cover
                ></v-img>

                <v-card-title>
                  {{ project.name }}
                </v-card-title>

                <v-card-subtitle>
                  {{ moment(project.created_at).format("DD MMMM YYYY") }}
                </v-card-subtitle>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card
                height="100%"
                min-height="268"
                border="primary sm opacity-75"
                class="mx-auto pb-4 rounded-xl overflow-hidden"
                @click="view = 'addProject'"
              >
                <v-card-text
                  class="d-flex justify-center align-center text-center h-100"
                >
                  <div class="text-primary text-h3">
                    <p class="mb-5">Add a new Project</p>
                    <v-btn class="ml-auto" icon color="primary">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card v-else rounded="xl" border="primary sm opacity-75">
        <v-card-title class="d-flex align-center px-6 pt-5">
          Add new Project
          <v-btn
            class="ml-auto"
            icon
            variant="text"
            color="white"
            @click="chooseProjectDialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form v-model="addProjectValidated">
            <v-text-field
              class="mb-3"
              v-model="addProjectName"
              :rules="[rules.required]"
              label="Project name"
            ></v-text-field>
            <v-textarea
              class="mb-3"
              v-model="addProjectDescription"
              label="Description"
            ></v-textarea>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Cancel" color="error" @click="clearAddProject"></v-btn>
          <v-btn
            text="Add Project"
            :disabled="!addProjectValidated"
            :loading="addProjectLoading"
            @click="addProject"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-scroll-y-transition>
  </v-dialog>
</template>

<style scoped></style>
~/types/dto/ChooseProjectDto
