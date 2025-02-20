<script lang="ts" setup>
import type { VCard } from "vuetify/components";

const props = defineProps<{
  cardProps?: VCard | undefined | object;
  transparent?: boolean;
}>();
</script>
<template>
  <v-card
    v-bind="cardProps"
    class="glass-card rounded-xl"
    :class="transparent ? 'f-glass-tp-card' : 'f-glass-card'"
  >
    <slot></slot>
  </v-card>
</template>
