<template>
    <div>
        <div class="list-wrapper">
            <list-container :page="this.page" :tag="this.tag" />
        </div>
    </div>
</template>

<script>
// import ListWrapper from "@/components/list/ListWrapper/ListWrapper.vue";
import ListContainer from "@/containers/ListContainer.vue";
export default {
  components: {
    // ListWrapper,
    ListContainer
  },

  computed: {
    page: {
      get() {
        if (this.$route.params.page) {
          return parseInt(this.$route.params.page, 10);
        }
        return 1;
      }
    },
    tag: {
      get() {
        return this.$route.params.tag;
      }
    }
  },
  mounted() {
    console.log("page mounted");
  }
};
</script>

<style lang="scss" scoped>
@import "src/styles/utils";

.list-wrapper {
  width: 1024px;
  margin: 0 auto;

  padding-top: 3rem;
  padding-bottom: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;

  @include media("<wide") {
    width: 768px;
  }
  @include media("<large") {
    width: 512px;
  }
  @include media("<medium") {
    width: 100%;
  }
}
</style>
