<template>
    <div v-if="!this.loading">
         <vue-headful
          :title="this.title"
          :description="this.description"
        />
        <post-info :title="title" :publishedDate="publishedDate" :tags="this.tags"/>
        <post-body :body="body" />
    </div>
</template>

<script>
import PostInfo from "@/components/post/PostInfo.vue";
import PostBody from "@/components/post/PostBody.vue";
import removeMd from "remove-markdown";
export default {
  components: {
    PostInfo,
    PostBody
  },
  data() {
    return {
      loading: false,
      tags: []
    };
  },
  methods: {
    async initialize() {
      this.loading = true;
      try {
        await this.$store.dispatch("getPost", this.$route.params.id);
      } catch (e) {
        console.log(e);
      }
      this.loading = false;
    }
  },
  mounted() {
    this.initialize();
  },
  computed: {
    title: {
      get() {
        return this.$store.state.post.post.title;
      }
    },
    body: {
      get() {
        return this.$store.state.post.post.body;
      }
    },
    publishedDate: {
      get() {
        return this.$store.state.post.post.publishedDate;
      }
    },
    tagsComputed: {
      get() {
        return this.$store.state.post.post.tags;
      }
    },
    description: {
      get() {
        return removeMd(this.body).slice(0, 200);
      }
    }
  },
  watch: {
    tagsComputed: function(nextTags, prevTags) {
      this.tags = nextTags;
    }
  }
};
</script>

<style scoped>
</style>