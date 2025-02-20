<script setup lang="ts">
const { localeProperties } = useI18n();
const { dir } = localeProperties.value;
</script>

<template>
  <v-locale-provider :rtl="dir == 'rtl'">
    <v-app class="f-main-container">
      <div class="f-main-overlay py-7">
        <LayoutFullMain />
        <v-main
          class="main-layout-fix mr-md-6 mx-2 mx-md-0 h-100 rounded-xl overflow-hidden"
        >
          <ToolsVGlassCard class="h-100 overflow-y-auto">
            <v-card-text class="h-100">
              <NuxtPage />
            </v-card-text>
          </ToolsVGlassCard>
        </v-main>
      </div>
    </v-app>
    <SharedDeleteDialog />
  </v-locale-provider>
</template>

<style lang="scss">
.main-layout-fix {
  max-height: calc(100vh - 56px) !important;
}
</style>
