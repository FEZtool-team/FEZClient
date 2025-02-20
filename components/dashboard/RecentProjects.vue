<template>
  <ToolsVGlassCard transparent>
    <v-card-title class="pa-4 pa-md-7 text-h2 font-weight-regular">
      Recent projects
    </v-card-title>
    <v-card-text class="px-md-6 px-4">
      <v-row>
        <v-col cols="9">
          <v-text-field
            v-model="projectFilter"
            label="Filter projects"
            density="compact"
            max-width="500"
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="3" class="d-md-flex justify-end">
          <v-dialog v-model="addProjectDialog" max-width="450">
            <template #activator="{ props: activatorProps }">
              <v-btn v-bind="activatorProps" class="ml-3" icon color="primary">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card rounded="xl" border="primary sm opacity-75">
              <v-card-title class="d-flex align-center px-6 pt-5">
                Add new Project
                <v-btn
                  class="ml-auto"
                  icon
                  variant="text"
                  color="white"
                  @click="addProjectDialog = false"
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

                <v-btn
                  text="Add Project"
                  :disabled="!addProjectValidated"
                  @click="addProject"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-sheet color="transparent">
            <v-slide-group
              class="px-4 mx-md-n6 mx-n8 projects-slide"
              selected-class="bg-success"
            >
              <v-slide-group-item
                v-for="(project, index) in filteredProjects"
                :key="index"
              >
                <ToolsVGlassCard
                  class="ma-4 border-white"
                  :card-props="{
                    width: 350,
                    height: 250,
                    to: `/project/${project.id}`,
                  }"
                >
                  <v-card-title class="text-h3 mt-1 text-primary">
                    {{ project.name }}
                    <span class="text-white text-h6 font-weight-regular">
                      {{ project.subtitle }}
                    </span>
                  </v-card-title>
                  <v-card-text class="px-4">
                    <div class="d-flex">
                      <div class="parent">
                        <div v-if="project.files.length < 1" class="div1">
                          <v-img
                            :src="placeholderImage"
                            class="rounded-lg border-primary border"
                            width="100%"
                            height="100%"
                          ></v-img>
                        </div>
                        <div
                          v-for="(file, idx) in project.files.slice(0, 5)"
                          :key="file.id"
                          :class="`div${idx + 1}`"
                        >
                          <v-img
                            :src="file.thumbnail_path ?? ''"
                            class="rounded-lg border-primary border"
                            width="100%"
                            height="100%"
                          ></v-img>
                        </div>
                      </div>
                      <div class="d-flex flex-column pl-3 text-body-2">
                        <div>
                          Last action:
                          <span class="text-primary">
                            {{ project.last_action ?? "No action yet" }}
                          </span>
                        </div>
                        <div class="desc-text mt-2 mb-auto">
                          Description:
                          <span class="text-primary">
                            {{ project.description }}
                          </span>
                        </div>
                        <div>
                          Created at:
                          <span class="text-primary">
                            {{
                              moment(project.created_at).format("DD MMMM YYYY")
                            }}
                          </span>
                        </div>
                        <div class="mt-2">
                          <span>
                            <v-chip density="compact" color="primary">
                              {{ project.tag }}
                            </v-chip>
                          </span>
                        </div>
                        <div class="mt-2 mb-1">
                          Modified
                          <span class="text-primary">
                            {{
                              moment(project.updated_at).format("DD MMMM YYYY")
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                </ToolsVGlassCard>
              </v-slide-group-item>
              <template v-if="loading">
                <v-slide-group-item v-for="i in 4" :key="i">
                  <ToolsVGlassCard
                    class="ma-4 border-white"
                    :card-props="{ width: 350, height: 250 }"
                  >
                    <v-skeleton-loader
                      :loading="loading"
                      class="skeleton-fullscreen bg-transparent rounded-xl overflow-hidden"
                      height="250"
                      type="image"
                    >
                    </v-skeleton-loader>
                  </ToolsVGlassCard>
                </v-slide-group-item>
              </template>
              <v-slide-group-item
                v-if="filteredProjects.length < 1 && !loading"
              >
                <ToolsVGlassCard
                  class="ma-4 border-white"
                  :card-props="{ width: 350, height: 250 }"
                >
                  <v-card-text
                    v-if="projectFilter.length < 1"
                    class="d-flex align-center justify-center h-100 flex-column"
                  >
                    <v-card-title class="text-center">
                      There is no Project <br />
                      try to make one
                    </v-card-title>
                    <v-btn
                      icon
                      color="primary"
                      @click="addProjectDialog = true"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </v-card-text>
                  <v-card-text
                    v-else
                    class="d-flex align-center justify-center h-100 flex-column"
                  >
                    <v-card-title class="text-center">
                      No project founded
                    </v-card-title>
                    <v-btn
                      icon
                      color="primary"
                      @click="addProjectDialog = true"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </v-card-text>
                </ToolsVGlassCard>
              </v-slide-group-item>
            </v-slide-group>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card-text>
  </ToolsVGlassCard>
</template>

<script setup lang="ts">
import placeholderImage from "~/assets/placeholders/placeholder.jpg";

const { validationRules: rules } = useValidation();
const projects = useProjectStore();
import moment from "jalali-moment";
import type { Project } from "~/types/projects/projects";

const loading = ref(false);

const addProjectDialog = ref(false);
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
  addProjectDialog.value = false;

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
};

onMounted(async () => {
  if (!projects.isLoaded) {
    loading.value = true;
    await projects.loadProjects();
    loading.value = false;
  }
});
</script>

<style lang="scss">
.skeleton-fullscreen .v-skeleton-loader__image {
  height: 100% !important;
}

.desc-text {
  display: -moz-box;
  display: -webkit-box;
  max-width: 200px;
  line-clamp: 3;
  -moz-line-clamp: 3;
  box-orient: vertical;
  -moz-box-orient: vertical;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.images-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  min-width: 78px;
}

.projects-slide {
  .v-slide-group__prev--disabled,
  .v-slide-group__next--disabled {
    overflow: hidden;
    max-width: 0;
    min-width: 0;
  }

  .v-slide-group__prev,
  .v-slide-group__next {
    color: rgb(255, 255, 255);
    transition: all 0.2s ease-in-out;
  }
}

.parent {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  width: 80px;
}

.div1 {
  grid-area: 1 / 1 / 3 / 3;
}
.div2 {
  grid-area: 3 / 1 / 4 / 2;
}
.div3 {
  grid-area: 3 / 2 / 4 / 3;
}
.div4 {
  grid-area: 4 / 1 / 5 / 2;
}
.div5 {
  grid-area: 4 / 2 / 5 / 3;
}
</style>
