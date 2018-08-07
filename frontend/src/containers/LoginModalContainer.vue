<template>
    <div>
        <login-modal :visible="this.visible" :onCancel="this.hideModal" :onLogin="this.login" />
    </div>
</template>

<script>
import LoginModal from "@/components/modal/LoginModal";
export default {
  components: {
    LoginModal
  },

  computed: {
    visible: {
      get() {
        return this.$store.state.base.visible.login;
      }
    }
  },
  methods: {
    hideModal() {
      this.$store.dispatch("hideModal", { name: "login" });
    },
    async login() {
      try {
        await this.$store.dispatch("login", this.$store.state.base.password);
        if (this.$store.state.base.logged) {
          localStorage.logged = true;
          this.hideModal();
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style scoped>
</style>