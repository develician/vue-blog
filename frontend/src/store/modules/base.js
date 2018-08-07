import BaseAPI from "@/lib/service/Base";

const state = {
  visible: {
    login: false,
    remove: false
  },
  password: "",
  logged: false,
  loginModal: {
    error: false
  }
};

const actions = {
  initializeLoginModal({ commit }, payload) {
    commit("initializeLoginModal", payload);
  },
  hideModal({ commit }, payload) {
    commit("hideModal", payload);
  },
  showModal({ commit }, payload) {
    commit("showModal", payload);
  },
  changePasswordInput({ commit }, payload) {
    commit("changePasswordInput", payload);
  },
  tempLogin({ commit }) {
    commit("tempLogin");
  },
  async login({ commit }, payload) {
    try {
      const response = await BaseAPI.login(payload);
      commit("login", response);
    } catch (e) {
      commit("login", { error: true });
    }
  },
  async checkLogin({ commit }, payload) {
    try {
      const response = await BaseAPI.checkLogin();
      commit("checkLogin", response);
    } catch (e) {
      console.log(e);
    }
  },
  async logout() {
    try {
      await BaseAPI.logout();
    } catch (e) {
      console.log(e);
    }
  },
  async removePost({ commit }, payload) {
    try {
      await BaseAPI.removePost(payload);
    } catch (e) {
      console.log(e);
    }
  }
};

const mutations = {
  initializeLoginModal(state) {
    state.password = "";
    state.loginModal.error = false;
  },
  hideModal(state, payload) {
    state.visible[payload.name] = false;
  },
  showModal(state, payload) {
    state.visible[payload.name] = true;
  },
  changePasswordInput(state, payload) {
    state.password = payload.value;
  },
  login(state, payload) {
    if (payload.error) {
      state.loginModal.error = payload.error;
    } else {
      state.logged = true;
      state.loginModal.error = false;
    }
  },
  checkLogin(state, payload) {
    // console.log(payload.data);
    state.logged = payload.data.logged;
  },
  tempLogin(state) {
    state.logged = true;
  }
};

export default {
  state,
  actions,
  mutations
};
