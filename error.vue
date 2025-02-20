<script setup lang="ts">
useHead({
  title: "404 not found",
});
import wLogo from "~/assets/logo/white-logo.png";
</script>
<template>
  <div class="authentication">
    <v-container fluid class="pa-3">
      <v-row class="h-100vh d-flex justify-center align-center">
        <v-col cols="12" lg="4" xl="3" class="d-flex align-center">
          <div
            rounded="md"
            elevation="10"
            class="px-sm-1 px-0 z-1 withbg mx-auto"
            max-width="500"
          >
            <v-empty-state
              headline="Whoops, 404"
              title="Page not found"
              text="The page you were looking for does not exist"
            >
              <template #media>
                <div>
                  <v-img class="my-8" height="180" :src="wLogo"></v-img>
                </div>
              </template>
            </v-empty-state>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style lang="scss">
.color-fixed-textfield * {
  color: white !important;
}
</style>
