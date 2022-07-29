import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import vuetify from "./plugins/vuetify";
import axiosInstance from "./services/setupInterceptors"; // axios instance
import "./permission";

Vue.config.productionTip = false;
Vue.prototype.$http = axiosInstance;

new Vue({
  router,
  store,
  axios,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
