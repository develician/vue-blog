import ListAPI from "@/lib/service/List";

const state = {
  posts: [],
  lastPage: null
};

const actions = {
  async getPostList({ commit }, payload) {
    try {
      const response = await ListAPI.getPostList(payload);
      commit("getPostList", response);
    } catch (e) {
      console.log(e);
    }
  }
};

const mutations = {
  getPostList(state, payload) {
    state.lastPage = payload.headers["last-page"];
    state.posts = payload.data;
  }
};

export default {
  state,
  actions,
  mutations
};
