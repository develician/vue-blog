import marked from "marked";
import EditorService from "@/lib/service/Editor";
import PostService from "@/lib/service/Post";

const actions = {
  initialize({ commit }, payload) {
    commit("initialize", payload);
  },
  changeInput({ commit }, payload) {
    commit("changeInput", payload);
  },
  renderMarkdown({ commit }, payload) {
    commit("renderMarkdown", payload);
  },
  async writePost({ commit }, payload) {
    try {
      const response = await EditorService.writePost(payload);
      commit("writePost", response);
    } catch (e) {
      console.log(e);
    }
  },
  async getPostEditor({ commit }, payload) {
    try {
      const response = await PostService.getPost(payload);
      commit("getPostEditor", response);
    } catch (e) {
      console.log(e);
    }
  },
  async editPost({ commit }, payload) {
    try {
      const response = await EditorService.editPost(payload);
      commit("editPost", response);
    } catch (e) {
      console.log(e);
    }
  }
};
const state = {
  title: "",
  markdown: "",
  tags: "",
  html: "",
  postId: null
};

const mutations = {
  initialize(state) {
    state.title = "";
    state.markdown = "";
    state.tags = "";
  },
  changeInput(state, payload) {
    state[payload.name] = payload.value;
  },
  renderMarkdown(state, payload) {
    state.html = marked(payload.markdown, {
      breaks: true,
      sanitize: true
    });
  },
  writePost(state, payload) {
    const { _id } = payload.data;
    state.postId = _id;
  },
  editPost(state, payload) {
    const { _id } = payload.data;
    state.postId = _id;
  },
  getPostEditor(state, payload) {
    const { data: post } = payload;
    state.title = post.title;
    state.markdown = post.body;
    state.tags = post.tags.join(", ");
  }
};

// const getters = {
//   title: (state, getters) => {
//     return getters.title;
//   }
// };

export default {
  state,
  actions,
  mutations
  //   getters
};
