<script setup lang="ts">
import { ref } from "vue";
const { signIn } = useAuth();

/*-For Set Blank Layout-*/
definePageMeta({
  layout: "blank",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});

const { t: $t } = useI18n();
const notify = useSnackbarStore();

useHead({
  title: $t("auth.login"),
});

const email = ref("");
const password = ref("");
const passwordVisibility = ref(false);
const loading = ref(false);

const login = async () => {
  loading.value = true;
  const credential = {
    email: email.value,
    password: password.value,
  };
  signIn(credential, { callbackUrl: "/" })
    .then(() => {
      const { data } = useAuth();
      console.log(data);
      loading.value = false;
    })
    .catch((e) => {
      notify.handleCatch(e);
      loading.value = false;
    });
};
</script>
<template>
  <div class="authentication">
    <v-container fluid class="pa-3">
      <v-row class="h-100vh d-flex justify-center align-center">
        <v-col cols="12" lg="4" xl="3" class="d-flex align-center">
          <div
            rounded="md"
            elevation="10"
            class="px-sm-1 px-0 withbg mx-auto"
            max-width="500"
          >
            <v-card-item class="pa-sm-8">
              <div class="d-flex justify-center py-4 mb-12">
                <LayoutFullLogoDynamicLogo width="188" />
              </div>

              <v-row class="d-flex mb-3">
                <v-col cols="12">
                  <v-text-field
                    v-model="email"
                    class="color-fixed-textfield"
                    :label="$t('auth.email')"
                    color="white"
                    theme="dark"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="password"
                    class="color-fixed-textfield"
                    :label="$t('auth.password')"
                    :type="passwordVisibility ? 'text' : 'password'"
                    color="white"
                    :append-inner-icon="
                      passwordVisibility
                        ? 'mdi-eye-off-outline'
                        : 'mdi-eye-outline'
                    "
                    theme="dark"
                    @click:append-inner="
                      passwordVisibility = !passwordVisibility
                    "
                    @keydown.enter="login"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-btn
                    color="lightprimary"
                    size="large"
                    block
                    flat
                    :loading="loading"
                    @click="login"
                  >
                    {{ $t("auth.login") }}
                  </v-btn>
                </v-col>
                <v-col cols="12" class="pt-0">
                  <div
                    class="d-flex flex-wrap align-center z-10 position-relative"
                  >
                    <div class="mr-sm-auto">
                      <NuxtLink
                        to="/auth/forget-password"
                        class="text-white text-decoration-none text-body-1 opacity-1"
                      >
                        {{ $t("auth.forgot-password") }}
                      </NuxtLink>
                    </div>
                    <div>
                      <NuxtLink
                        to="/auth/signup"
                        class="text-white text-decoration-none text-body-1 opacity-1"
                      >
                        {{ $t("auth.signup") }}
                      </NuxtLink>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-card-item>
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
