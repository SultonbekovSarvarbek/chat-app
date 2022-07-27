import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import vuetify from "./plugins/vuetify";
import setup from "./services/setupInterceptors";
import "./permission";

// import VueSocketIO from "vue-socket.io";
// import io from "socket.io-client";

Vue.config.productionTip = false;
Vue.prototype.$http = setup;

// Vue.use(
//   new VueSocketIO({
//     debug: true,
//     connection: io("ws://0.0.0.0:8000/ws/"),
//     vuex: {
//       store,
//       actionPrefix: "SOCKET_",
//       mutationPrefix: "SOCKET_",
//     },
//   })
// );

new Vue({
  router,
  store,
  axios,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
