<script setup lang="ts">
/*Call Components*/
import profileIcon from "~icons/material-symbols-light/person-outline-rounded";

const { signOut } = useAuth();

const logout = () => {
  signOut({
    callbackUrl: "/auth/login",
  }).then(() => {
    window.location.reload();
  });
};
</script>
<template>
  <ToolsVGlassCard transparent>
    <v-card-text class="text-end">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn variant="outlined" icon color="white" v-bind="props">
            <v-icon :icon="profileIcon" size="30"></v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item to="/setting">
            <v-list-item-title>Profile Setting</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-text>
  </ToolsVGlassCard>
</template>
