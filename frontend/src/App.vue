<template>
  <div class="App">
      <vue-headful
          title="Vue-Blog"
          description="Description from vue-headful"
      />
      <div class="MenuBar" v-if="this.$route.path !== '/editor'">
        <router-link to="/" class="Logo">
          Vue Blog
        </router-link>
        <div class="right" v-if="this.$route.name === 'PostPage' && this.$store.state.base.logged">
          <div class="button">
            <btn-component :to="`/editor?id=${this.$route.params.id}`"  :theme="'outline'" :disabled="false" buttonTitle="수정" />
          </div>
          <div class="button">
            <btn-component :onClick="this.showRemoveModal" :theme="'outline'" :disabled="false" buttonTitle="삭제" />
          </div>
        </div>
      </div>


      <main><router-view/></main>
      <div  class="Footer">
        <router-link to="/" class="Logo">
          Vue Blog
        </router-link>
        <div v-if="!this.$store.state.base.logged" class="LoginButton" @click="this.showLoginModal">
          관리자 로그인
        </div>
        <div v-else class="LoginButton" @click="this.handleLogout">
          관리자 로그아웃
        </div>
      </div>
      <login-modal-container />
  </div>
</template>

<script>
import LoginModalContainer from "@/containers/LoginModalContainer.vue";
import btnComponent from "@/components/common/Button.vue";
export default {
  components: {
    LoginModalContainer,
    btnComponent
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    showLoginModal() {
      this.initializeLoginModal();
      this.$store.dispatch("showModal", { name: "login" });
    },
    showRemoveModal() {
      // this.initialize();
      this.$store.dispatch("showModal", { name: "remove" });
    },
    initializeLoginModal() {
      this.$store.dispatch("initializeLoginModal");
    },
    async checkLogin() {
      if (localStorage.logged === "true") {
        this.$store.dispatch("tempLogin");
      }
      try {
        await this.$store.dispatch("checkLogin");
      } catch (e) {
        console.log(e);
      }
    },
    async handleLogout() {
      try {
        await this.$store.dispatch("logout");
        window.location.reload();
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>


<style lang="scss">
@import "src/styles/base";
@import "src/styles/utils";

.App {
  display: flex;
  flex-direction: column;
  .MenuBar {
    height: 5rem;
    background: $oc-blue-6;
    display: flex;
    align-items: center;

    .Logo {
      padding: 1rem;
      color: white;
      font-size: 1.5rem;
      font-weight: 700;
    }

    .right {
      margin-left: auto;
      padding: 1rem;
      display: flex;

      .button + .button {
        padding-left: 1rem;
      }
    }
  }

  main {
    background: $oc-gray-1;
    min-height: calc(100vh - 15rem);
  }

  .Footer {
    background: $oc-gray-7;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 10rem;
    .Logo {
      color: white;
      font-weight: 700;
      font-size: 1.5rem;
    }

    .LoginButton {
      padding: 1rem;
      font-weight: 600;
      color: white;
      user-select: none;
      cursor: pointer;
    }
  }
}
</style>
