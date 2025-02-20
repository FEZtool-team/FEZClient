<script setup lang="ts">
const { data } = useAuth();
console.log(data.value);
</script>
<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="12">
          <DashboardTopbar />
        </v-col>
        <!-- Sales overview -->
        <v-col cols="12">
          <DashboardRecentProjects />
        </v-col>
        <!-- Yearly Breakup / Monthly Earnings -->
        <v-col cols="12" lg="7">
          <DashboardNextNews />
        </v-col>
        <v-col cols="12" lg="5">
          <DashboardDocuments />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
