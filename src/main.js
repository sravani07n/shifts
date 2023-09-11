import { createApp } from "vue";
import { createPinia } from "pinia";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import "vuetify/dist/vuetify.min.css";
import "./custom-reset.css";

import { registerLicense } from "@syncfusion/ej2-base";

import App from "./App.vue";

const vuetify = createVuetify({
  components,
  directives,
});

// Registering Syncfusion license key
registerLicense(
  "ORg4AjUWIQA/Gnt2V1hiQlRPd19dVXxLflF1VWJTe1p6dlVWACFaRnZdQV1qSXZSdUFrWX5bd3Nc"
);

createApp(App).use(createPinia()).use(vuetify).mount("#app");
