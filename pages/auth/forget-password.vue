<script setup lang="ts">
import { ref } from "vue";
import VueCountdown from "@chenfengyuan/vue-countdown";
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
  title: $t("auth.reset-your-password"),
});

const { validationRules } = useValidation();
const route = useRoute();
const router = useRouter();
const axios = useApi();
const notify = useSnackbarStore();

const step = ref(1);

// step 1: Reset password

const email = ref("");
const loading = ref(false);
const formValidated = ref(false);

const resetPassword = () => {
  loading.value = true;
  axios
    .get(`/auth/send-reset-password-code?email=${email.value}`)
    .then((result) => {
      console.log(result);
      step.value = 2;
      loading.value = false;
    })
    .catch((e) => {
      loading.value = false;
      notify.handleCatch(e);
    });
};

// step 2: Check confirm code

const otp = ref("");
const counting = ref(false);
const resendLoading = ref(false);
const checkCodeLoading = ref(false);

const resendConfirmCode = () => {
  resendLoading.value = true;
  counting.value = true;
  axios
    .get(`/auth/send-reset-password-code?email=${email.value}`)
    .then((result) => {
      console.log(result);
      resendLoading.value = false;
    })
    .catch((e) => {
      resendLoading.value = false;
      notify.handleCatch(e);
    });
};

const onCountdownEnd = () => {
  counting.value = false;
};

const checkCode = () => {
  checkCodeLoading.value = true;
  const checkCodeData = {
    email: email.value,
    code: otp.value,
  };
  axios
    .post("/auth/check-otp", checkCodeData)
    .then((result) => {
      console.log(result);

      checkCodeLoading.value = false;
      step.value = 3;
    })
    .catch((e) => {
      checkCodeLoading.value = false;
      notify.handleCatch(e);
    });
};

// step 3: Reset the password
const confirmValidated = ref(false);
const newPassword = ref("");
const repeatPassword = ref("");
const confirmLoading = ref(false);
const showPassword = ref(false);

const confirm = () => {
  confirmLoading.value = true;

  const resetPasswordData = {
    code: otp.value,
    email: email.value,
    password: newPassword.value,
  };

  axios
    .post("/auth/reset-password", resetPasswordData)
    .then((result) => {
      console.log(result);
      notify.showMessage($t("auth.messages.password-changed"), "success");
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
      confirmLoading.value = false;
    })
    .catch((e) => {
      confirmLoading.value = false;
      notify.handleCatch(e);
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

              <v-stepper
                class="steper-header-elevation-0"
                v-model="step"
                :items="[
                  $t('auth.enter-mail'),
                  $t('auth.check-confirm'),
                  $t('auth.reset-password'),
                ]"
                hide-actions
                elevation="0"
              >
                <template v-slot:item.1>
                  <v-form
                    v-model="formValidated"
                    @submit.prevent="resetPassword"
                  >
                    <v-row class="d-flex mb-3">
                      <v-col cols="12">
                        <h2 class="position-relative z-1">
                          {{ $t("auth.enter-mail") }}
                        </h2>
                      </v-col>

                      <v-col cols="12">
                        <v-text-field
                          v-model="email"
                          :rules="[
                            validationRules.required,
                            validationRules.email,
                          ]"
                          class="color-fixed-textfield"
                          :label="$t('auth.email')"
                          color="white"
                          theme="dark"
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
                          @click="resetPassword"
                        >
                          {{ $t("auth.reset-password") }}
                        </v-btn>
                      </v-col>

                      <v-col cols="12" class="pt-0">
                        <div class="z-10 position-relative">
                          <div class="mr-sm-auto">
                            <NuxtLink
                              to="/auth/login"
                              class="text-white text-decoration-none text-body-1 opacity-1"
                            >
                              {{ $t("auth.remember-password") }}
                            </NuxtLink>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-form>
                </template>
                <template v-slot:item.2>
                  <v-row class="d-flex mb-3">
                    <v-col cols="12">
                      <h2 class="position-relative z-1">
                        {{ $t("auth.check-confirm") }}
                      </h2>
                    </v-col>

                    <v-col cols="12">
                      <VOtpInput
                        v-model="otp"
                        class="mx-n2"
                        length="5"
                        placeholder="*"
                        max-width="100%"
                        height="80"
                        @finish="checkCode"
                      ></VOtpInput>
                    </v-col>
                    <v-col cols="12">
                      <VueCountdown
                        v-if="counting"
                        :time="60000"
                        @end="onCountdownEnd"
                        v-slot="{ totalSeconds }"
                      >
                        <h5 class="position-relative z-1 text-center">
                          {{
                            $t("auth.resend-in", { totalSeconds: totalSeconds })
                          }}
                        </h5>
                      </VueCountdown>

                      <v-btn
                        v-else
                        color="lightprimary"
                        size="large"
                        block
                        flat
                        :loading="resendLoading"
                        @click="resendConfirmCode"
                      >
                        {{ $t("auth.resend-code") }}
                      </v-btn>
                    </v-col>

                    <v-col class="py-1" ols="12">
                      <h5
                        class="position-relative z-1 text-center cursor-pointer"
                        @click="(step = 1), (counting = false)"
                      >
                        {{ $t("auth.change-mail") }}
                      </h5>
                    </v-col>

                    <v-col cols="12">
                      <v-btn
                        color="lightprimary"
                        size="large"
                        block
                        flat
                        :loading="checkCodeLoading"
                        :disabled="otp.length < 5"
                        @click="checkCode"
                      >
                        {{ $t("auth.check-confirm") }}
                      </v-btn>
                    </v-col>

                    <v-col cols="12" class="pt-0">
                      <div class="z-10 position-relative">
                        <div class="mr-sm-auto">
                          <NuxtLink
                            to="/auth/login"
                            class="text-white text-decoration-none text-body-1 opacity-1"
                          >
                            {{ $t("auth.remember-password") }}
                          </NuxtLink>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </template>
                <template v-slot:item.3>
                  <v-form v-model="confirmValidated" @submit.prevent="confirm">
                    <v-row class="d-flex mb-3">
                      <v-col cols="12">
                        <h2 class="position-relative z-1">
                          {{ $t("auth.reset-your-password") }}
                        </h2>
                      </v-col>

                      <v-col cols="12">
                        <v-text-field
                          v-model="newPassword"
                          :rules="[
                            validationRules.required,
                            validationRules.password,
                          ]"
                          class="color-fixed-textfield"
                          :label="$t('auth.new-password')"
                          :type="showPassword ? 'text' : 'password'"
                          :append-inner-icon="
                            showPassword
                              ? 'mdi-eye-off-outline'
                              : 'mdi-eye-outline'
                          "
                          color="white"
                          theme="dark"
                          @click:append-inner="showPassword = !showPassword"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12">
                        <v-text-field
                          v-model="repeatPassword"
                          :rules="[
                            validationRules.required,
                            (v) =>
                              v == newPassword || $t('auth.password-match'),
                          ]"
                          class="color-fixed-textfield"
                          :label="$t('auth.repeat-password')"
                          :type="showPassword ? 'text' : 'password'"
                          :append-inner-icon="
                            showPassword
                              ? 'mdi-eye-off-outline'
                              : 'mdi-eye-outline'
                          "
                          color="white"
                          theme="dark"
                          @click:append-inner="showPassword = !showPassword"
                        ></v-text-field>
                      </v-col>

                      <v-col class="py-1" ols="12">
                        <h5
                          class="position-relative z-1 text-center cursor-pointer"
                          @click="(step = 1), (counting = false)"
                        >
                          {{ $t("auth.change-mail") }}
                        </h5>
                      </v-col>

                      <v-col cols="12">
                        <v-btn
                          color="lightprimary"
                          size="large"
                          block
                          flat
                          :loading="confirmLoading"
                          :disabled="!confirmValidated"
                          @click="confirm"
                        >
                          {{ $t("auth.reset-password") }}
                        </v-btn>
                      </v-col>

                      <v-col cols="12" class="pt-0">
                        <div class="z-10 position-relative">
                          <div class="mr-sm-auto">
                            <NuxtLink
                              to="/auth/login"
                              class="text-white text-decoration-none text-body-1 opacity-1"
                            >
                              {{ $t("auth.remember-password") }}
                            </NuxtLink>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-form>
                </template>
              </v-stepper>
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
.steper-header-elevation-0 .v-stepper-header {
  box-shadow: none !important;
}
</style>
