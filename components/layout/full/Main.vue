<script setup lang="ts">
import { ref, shallowRef } from "vue";
import sidebarItems from "@/components/layout/full/vertical-sidebar/sidebarItem";
// import { Menu2Icon } from "vue-tabler-icons";
const sidebarMenu = shallowRef(sidebarItems);
const sDrawer = ref(true);
const { localeProperties } = useI18n();
const { dir } = localeProperties.value;
</script>

<template>
  <!------Sidebar-------->
  <v-navigation-drawer
    elevation="0"
    app
    class="leftSidebar bg-transparent border-none py-7"
    width="140"
    v-model="sDrawer"
    :location="dir == 'rtl' ? 'right' : 'left'"
  >
    <ToolsVGlassCard class="mx-3 h-100" :card-props="{ width: 116 }">
      <v-card-text class="h-100 d-flex flex-column justify-space-between px-0">
        <!---Logo part -->
        <div class="mx-auto">
          <LayoutFullLogoDynamicLogo />
        </div>
        <!-- ---------------------------------------------- -->
        <!---Navigation -->
        <!-- ---------------------------------------------- -->
        <div>
          <v-list class="pa-6">
            <!---Menu Loop -->
            <template v-for="(item, i) in sidebarMenu" :key="i">
              <!---Item Sub Header -->
              <LayoutFullVerticalSidebarNavItem :item="item" />
              <!---End Single Item-->
            </template>
          </v-list>
        </div>
        <div class="text-center text-lightprimary">v0.0.1</div>
      </v-card-text>
    </ToolsVGlassCard>
  </v-navigation-drawer>
</template>
