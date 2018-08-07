export default {
  initialize({ commit }, payload) {
    commit("initialize", payload);
  },
  changeInput({ commit }, payload) {
    commit("changeInput", payload);
  }
};
