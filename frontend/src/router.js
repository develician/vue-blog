import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "ListPage",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/ListPage.vue")
    },
    {
      path: "/page/:page",
      name: "Page",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/ListPage.vue")
    },
    {
      path: "/tag/:tag/:page?",
      name: "Tag",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/ListPage.vue")
    },
    {
      path: "/post/:id",
      name: "PostPage",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/PostPage.vue")
    },
    {
      path: "/editor",
      name: "EditorPage",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/EditorPage.vue")
    },
    {
      path: "*",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/NotFound.vue")
    }
  ]
});
