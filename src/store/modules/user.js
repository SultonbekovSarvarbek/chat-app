import { setToken, removeToken } from "@/utils/auth";
const state = {
  isAuthenticated: false,
};
const mutations = {
  loginSuccess(state) {
    state.isAuthenticated = true;
  },
  RESET_USER_DATA(state) {
    state.isAuthenticated = false;
  },
  SET_USER_DATA(state, payload) {
    state.user = payload.data;
    state.isAuthenticated = true;
  },
};
const actions = {
  async login({ commit }, userLoginData) {
    try {
      await this.$http.post("/auth/login/", userLoginData).then((res) => {
        commit("loginSuccess");
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
  async getInfo({ commit }) {
    try {
      const res = await this.$http.get("/profile");
      commit("SET_USER_DATA", res);
      return res;
    } catch (error) {
      return error;
    }
  },
  async register({ commit }, userRegisterData) {
    try {
      await this.$http.post("/auth/register/", userRegisterData).then((res) => {
        commit("loginSuccess");
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
