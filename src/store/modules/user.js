import { setToken, removeToken } from "@/utils/auth";
const state = {
  isAuthenticated: false,
  userInfo: {},
};
const mutations = {
  LOGIN_SUCCESS(state) {
    state.isAuthenticated = true;
  },
  RESET_USER_DATA(state) {
    state.isAuthenticated = false;
  },
  SET_USER_DATA(state, payload) {
    state.userInfo = payload;
  },
};
const actions = {
  async login({ commit }, userLoginData) {
    try {
      await this.$http.post("/auth/login/", userLoginData).then((res) => {
        commit("LOGIN_SUCCESS");
        setToken(res.data.access);
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  logout({ commit }) {
    removeToken();
    commit("RESET_USER_DATA");
  },
  resetToken({ commit }) {
    commit("RESET_USER_DATA");
    removeToken();
  },
  // eslint-disable-next-line no-unused-vars
  async register({ commit }, userRegisterData) {
    try {
      await this.$http.post("/auth/register/", userRegisterData).then((res) => {
        setToken(res.data.access);
      });
    } catch (error) {
      throw new Error(error);
    }
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
