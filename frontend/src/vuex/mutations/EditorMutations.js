export default {
  initialize(state) {
    state.title = "";
    state.markdown = "";
    state.tags = "";
  },
  changeInput(state, payload) {
    state[payload.name] = payload.value;
  }
};
