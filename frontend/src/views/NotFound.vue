<template>
    <div class='not-found'>
    <h2>
      존재하지 않는 페이지입니다.
    </h2>
    <btn-component :onClick="this.onGoBack" theme="outline" :buttonTitle="'돌아가기'" />
    </div>
</template>

<script>
import btnComponent from "@/components/common/Button.vue";
export default {
  components: {
    btnComponent
  },
  methods: {
    onGoBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/styles/utils";
.not-found {
  height: 100vh;
  background: $oc-blue-6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h2 {
    font-size: 1.5rem;
    color: white;
    font-weight: 400;
  }
}
</style>
