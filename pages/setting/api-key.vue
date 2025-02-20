<script setup lang="ts">
import type { ApiKey } from "~/types/userdata/session";

const axios = useApi();
const notify = useSnackbarStore();
const { data } = useAuth();

import copyIcon from "~icons/material-symbols-light/content-copy-outline-rounded";

const keyName = ref("");
const loading = ref(false);

const generateApiKey = () => {
  loading.value = true;
  axios
    .post(`/apikey/generate-apikey?name=${keyName.value}`)
    .then(({ data }) => {
      console.log(data);
      apiKey.value = data.key;
      noApiKey.value = false;
      loading.value = false;
    })
    .catch((e) => {
      loading.value = false;
      notify.handleCatch(e);
    });
};

const apiKey = ref<ApiKey>({
  name: "",
  key: "You have to generate one first",
});
const noApiKey = ref(true);

const copyCode = () => {
  navigator.clipboard.writeText(apiKey.value.key);
  notify.showMessage("Copied to clipboard!", "", 1500);
};

onMounted(() => {
  const sessionApiKey = data.value?.api_keys[0];
  if (sessionApiKey) {
    noApiKey.value = false;
    apiKey.value = sessionApiKey;
    keyName.value = apiKey.value.name;
  }
});
</script>
<template>
  <ToolsVGlassCard transparent class="h-100">
    <v-card-text>
      <v-row>
        <v-col>
          <v-card-title class="text-h2 font-weight-regular">
            Api Key
          </v-card-title>
          <v-card-text class="px-4 pt-4 text-h5 font-weight-regular">
            To create a third-party access interface, you must generate an API
            key and use that interface as your authentication for FEZcore
            system. <br />
            Use the link below for how-to documentation.
          </v-card-text>
          <v-card-item class="px-4">
            <v-row>
              <v-col cols="12" md="7">
                <v-form class="text-end">
                  <v-text-field
                    v-model="keyName"
                    class="my-3"
                    label="Key name"
                    :readonly="!noApiKey"
                  ></v-text-field>
                  <v-btn
                    class="mb-3"
                    text="Generate"
                    color="primary"
                    size="large"
                    :disabled="keyName.length < 1 || !noApiKey"
                    @click="generateApiKey"
                  ></v-btn>
                </v-form>
              </v-col>
            </v-row>
            <v-row class="mt-md-12">
              <v-col cols="12" md="7">
                <v-form class="text-start">
                  <v-textarea
                    :model-value="apiKey.key"
                    class="mb-3"
                    label="Api key"
                    readonly
                  ></v-textarea>
                  <v-btn
                    class="mb-3"
                    variant="text"
                    icon
                    color="white"
                    :disabled="noApiKey"
                    @click="copyCode"
                  >
                    <v-icon :icon="copyIcon"></v-icon>
                  </v-btn>
                </v-form>
              </v-col>
            </v-row>
          </v-card-item>
        </v-col>
      </v-row>
    </v-card-text>
  </ToolsVGlassCard>
</template>
