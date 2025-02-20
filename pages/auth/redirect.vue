<script lang="ts" setup>
definePageMeta({
  layout: "blank",
});
const route = useRoute();
const router = useRouter();
const token = route.query.token;
if (token) {
  router.push("/");
}
</script>
<template>
  <div class="h-100 w-100 d-flex justify-center align-center">
    <div class="text-center">
      درحال انتقال...
      <br />
      <br />
      <v-progress-circular indeterminate class="mx-auto" />
    </div>
  </div>
</template>
