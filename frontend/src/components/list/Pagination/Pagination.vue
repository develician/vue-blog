<template>
    <div class='pagination'>
    <btn-component :theme="'default'" :to="this.prevPage" :disabled="this.page === 1" buttonTitle="이전 페이지" :onClick="this.conLog"/>
    <div class='number'>
      페이지 1
    </div>
    <btn-component :theme="'default'" :to="this.nextPage" :disabled="this.page === parseInt(this.lastPage, 10)" buttonTitle="다음 페이지" :onClick="this.goToNext"/>
  </div>
</template>

<script>
import btnComponent from "@/components/common/Button.vue";
export default {
  components: {
    btnComponent
  },
  methods: {
    conLog() {
      console.log(this.nextPage);
      console.log(this.prevPage);
    },
    goToNext() {
      this.$router.go(this.nextPage);
    }
  },
  props: ["page", "lastPage", "tag"],
  computed: {
    nextPage: {
      get() {
        if (this.tag) {
          return `/tag/${this.tag}/${parseInt(this.page, 10) + 1}`;
        }
        return `/page/${parseInt(this.page, 10) + 1}`;
      }
    },
    prevPage: {
      get() {
        if (this.tag) {
          return `/tag/${this.tag}/${parseInt(this.page, 10) - 1}`;
        }
        return `/page/${parseInt(this.page, 10) - 1}`;
      }
    }
  },
  mounted() {
    console.log(this.lastPage);
  }
};
</script>

<style lang="scss" scoped>
@import "src/styles/utils";

.pagination {
  margin-top: 2rem;

  // 세로 중앙 정렬
  display: flex;
  align-items: center;

  .number {
    font-size: 0.85rem;
    text-align: center;
    color: $oc-gray-6;
    flex: 1; // 남은 공간을 다 차지
  }
}
</style>