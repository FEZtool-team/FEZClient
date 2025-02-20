<script setup lang="ts">
import { ref } from "vue";
const { signUp } = useAuth();
/*-For Set Blank Layout-*/
definePageMeta({
  layout: "blank",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});

const { t: $t } = useI18n();

useHead({
  title: $t("auth.signup-fez"),
});
const router = useRouter();
const notify = useSnackbarStore();

const { validationRules } = useValidation();

const formValidated = ref(false);

const fullName = ref("");
const email = ref("");
const password = ref("");
const passwordVisibility = ref(false);
const loading = ref(false);

const signup = async () => {
  loading.value = true;
  const credentials = {
    name: fullName.value,
    email: email.value,
    password: password.value,
  };
  signUp(
    credentials,
    {},
    {
      callbackUrl: "/auth/confirm",
      preventLoginFlow: true,
    }
  )
    .then(() => {
      loading.value = false;
      router.push({
        path: "/auth/confirm",
        query: {
          email: credentials.email,
        },
      });
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

              <v-form v-model="formValidated">
                <v-row class="d-flex mb-3">
                  <v-col cols="12">
                    <v-text-field
                      v-model="fullName"
                      :rules="[validationRules.required]"
                      class="color-fixed-textfield"
                      :label="$t('auth.fullname')"
                      color="white"
                      theme="dark"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="email"
                      :rules="[validationRules.required, validationRules.email]"
                      class="color-fixed-textfield"
                      :label="$t('auth.email')"
                      color="white"
                      theme="dark"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="password"
                      :rules="[
                        validationRules.required,
                        validationRules.password,
                      ]"
                      class="color-fixed-textfield"
                      :label="$t('auth.password')"
                      :type="passwordVisibility ? 'text' : 'password'"
                      color="white"
                      :append-inner-icon="
                        passwordVisibility ? 'mdi-eye-off' : 'mdi-eye'
                      "
                      theme="dark"
                      @click:append-inner="
                        passwordVisibility = !passwordVisibility
                      "
                      @keydown.enter="signup"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-btn
                      color="lightprimary"
                      size="large"
                      block
                      flat
                      :loading="loading"
                      :disabled="!formValidated"
                      @click="signup"
                    >
                      {{ $t("auth.signup") }}
                    </v-btn>
                  </v-col>
                  <!-- <v-col
                    class="d-flex align-center position-relative z-10 py-0"
                    cols="12"
                  >
                    <v-divider></v-divider>
  
                    <span class="text-white mx-2"> {{ $t("auth.or") }} </span>
                    <v-divider></v-divider>
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      color="white"
                      size="large"
                      block
                      flat
                      :loading="loading"
                      @click="signup"
                    >
                      <svg
                        class="mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="25"
                        height="25"
                        viewBox="0 0 48 48"
                      >
                        <path
                          fill="#FFC107"
                          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                        ></path>
                        <path
                          fill="#FF3D00"
                          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                        ></path>
                        <path
                          fill="#4CAF50"
                          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                        ></path>
                        <path
                          fill="#1976D2"
                          d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                        ></path>
                      </svg>
                      <span style="margin-top: 3px"
                        >{{ $t("auth.google-signup") }}
                      </span>
                    </v-btn>
                  </v-col> -->
                  <v-col cols="12" class="pt-0">
                    <div class="z-10 position-relative">
                      <div class="mr-sm-auto">
                        <NuxtLink
                          to="/auth/login"
                          class="text-white text-decoration-none text-body-1 opacity-1"
                        >
                          {{ $t("auth.have-account") }}
                        </NuxtLink>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-form>
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
