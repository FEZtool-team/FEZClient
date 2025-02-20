<script setup lang="ts">
const projects = useProjectStore();
</script>
<template>
  <v-dialog v-model="projects.deleteDialog" max-width="500">
    <v-card rounded="xl" border="primary sm opacity-75">
      <v-card-title class="d-flex align-center px-6 pt-5">
        Delete {{ projects.deleteType }}
        <v-btn
          class="ml-auto"
          icon
          variant="text"
          color="white"
          @click="projects.clearDeleteDialog"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        Are you sure you want to delete this {{ projects.deleteType }}?
      </v-card-text>
      <v-card-actions>
        <v-btn @click="projects.clearDeleteDialog">Cancel</v-btn>
        <v-btn
          color="error"
          @click="projects.doDelete"
          :loading="projects.deleting"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
