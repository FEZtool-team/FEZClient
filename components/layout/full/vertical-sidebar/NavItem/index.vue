<script setup>
const props = defineProps({ item: Object });
</script>

<template>
  <!---Single Item-->
  <nuxt-link
    v-slot="{ navigate, isActive }"
    :to="item.to"
    :external="item.type === 'external'"
    class="f-menu-item text-center"
    active-class="f-active-menu"
  >
    <v-tooltip :text="item.title">
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          :disabled="item.disabled"
          variant="text"
          icon
          size="70"
          class="my-1 menu-icon"
          :color="isActive ? 'primary' : 'lightprimary'"
          @click="navigate"
        >
          <v-badge
            :model-value="item.soon ?? false"
            color="error"
            content="soon"
            location="bottom end"
          >
            <v-icon :size="item.iconSize ?? 45" :icon="item.icon"></v-icon>
          </v-badge>
        </v-btn>
      </template>
    </v-tooltip>
  </nuxt-link>
</template>
<style lang="scss">
.menu-icon * {
  font-weight: 300 !important;
}
</style>
