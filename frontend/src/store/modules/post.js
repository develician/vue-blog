import PostService from "@/lib/service/Post";
const actions = {
  async getPost({ commit }, payload) {
    try {
      const response = await PostService.getPost(payload);
      commit("getPost", response);
    } catch (e) {
      console.log(e);
    }
  }
};

const state = {
  post: []
};

const mutations = {
  getPost(state, payload) {
    const { data } = payload;
    state.post = data;
  }
};

export default {
  actions,
  state,
  mutations
};
