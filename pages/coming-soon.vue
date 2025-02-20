<script setup lang="ts">
import wLogo from "~/assets/logo/white-logo.png";
</script>
<template>
  <v-row class="h-100">
    <v-col cols="12">
      <v-empty-state
        headline="Big things are ahead!"
        title="The Climate Change service is Coming Soon"
        text="We're busy building something amazing and can't wait to share it with you."
      >
        <template #media>
          <div>
            <v-img class="my-8" height="180" :src="wLogo"></v-img>
          </div>
        </template>
      </v-empty-state>
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
