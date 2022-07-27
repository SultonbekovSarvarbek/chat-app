const state = {
  users: [],
  rooms: [],
  roomMessages: [],
};
const mutations = {
  SET_USERS(state, payload) {
    state.users = payload.data;
  },
  SET_ROOMS(state, payload) {
    state.rooms = payload.data;
  },
  SET_MESSAGES(state, payload) {
    state.roomMessages = payload.data;
  },
};
const actions = {
  getUsers({ commit }) {
    try {
      this.$http.get("/auth/search/").then((res) => {
        commit("SET_USERS", res);
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  getRooms({ commit }) {
    try {
      this.$http.get("/chat/rooms/").then((res) => {
        commit("SET_ROOMS", res);
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  // eslint-disable-next-line no-unused-vars
  createdRoom({ commit }, member_ids) {
    try {
      this.$http.post("/chat/rooms/", { member_ids });
    } catch (error) {
      throw new Error(error);
    }
  },
  getRoomMessages({ commit }, roomID) {
    try {
      this.$http.get(`/chat/room/${roomID}/messages/`).then((res) => {
        commit("SET_MESSAGES", res);
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
