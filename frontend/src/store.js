import Vue from "vue";
import Vuex from "vuex";
// import EditorState from "./vuex/states/EditorState";
// import actions from "./vuex/actions";
// import mutations from "./vuex/mutations/mutations";
import editorModule from "./store/modules/editor";
import postModule from "./store/modules/post";
import listModule from "./store/modules/list";
import baseModule from "./store/modules/base";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    editor: editorModule,
    post: postModule,
    list: listModule,
    base: baseModule
  }
});
