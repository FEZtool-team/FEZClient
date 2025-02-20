<script setup>
const props = defineProps({ item: Object, size: String });
</script>

<template>
  <template>
    <component
      :is="item"
      :size="size"
      fill="currentColor"
      stroke-width="1"
      class="iconClass"
    ></component>
  </template>
</template>
