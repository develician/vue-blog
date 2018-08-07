<template>
    <div>
        <!-- <h1>hi!!!!!</h1> -->
        <post-list :posts="this.posts"/>
        <pagination :page="this.$props.page" :lastPage="this.lastPage" :tag="this.$props.tag"/>
    </div>
</template>

<script>
import PostList from "@/components/list/PostList/PostList.vue";
import Pagination from "@/components/list/Pagination/Pagination.vue";
export default {
  components: {
    Pagination,
    PostList
  },
  props: ["page", "tag"],
  mounted() {
    this.getPostList();
  },
  methods: {
    async getPostList() {
      const { page, tag } = this.$props;
      try {
        await this.$store.dispatch("getPostList", { page, tag });
      } catch (e) {
        console.log(e);
      }
    }
  },
  computed: {
    posts: {
      get() {
        return this.$store.state.list.posts;
      }
    },
    lastPage: {
      get() {
        return this.$store.state.list.lastPage;
      }
    }
  },
  watch: {
    page: function(nextPage, prevPage) {
      this.getPostList();
      document.documentElement.scrollTop = 0;
    },
    tag: function(nextTag, prevTag) {
      this.getPostList();
      document.documentElement.scrollTop = 0;
    }
  }
};
</script>

<style scoped>
</style>