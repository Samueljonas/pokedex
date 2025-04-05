import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import i18n from "./i18n";
import router from "./router";
import Vue from "vue";
import "bootstrap/dist/css/bootstrap.min.css";

createApp(App).use(i18n).use(store).mount("#app");

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  i18n,
  render: (h = h(App)),
}).$mount("#app");
