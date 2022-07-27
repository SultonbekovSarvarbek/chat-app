import Vue from "vue";
import Vuex from "vuex";
import axiosInstance from "@/services/setupInterceptors";
Vuex.Store.prototype.$http = axiosInstance;
Vue.use(Vuex);

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modulesFiles = require.context("./modules", true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

const store = new Vuex.Store({
  modules,
  //   state: {},
  //   mutations: {},
  //   actions: {},
  //   modules: {},
});

export default store;
