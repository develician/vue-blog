<template>
    <div class="post-list">
        <post-item 
            v-for="post in this.$props.posts" 
            v-bind:key="post._id"
            :title="post.title"
            :body="post.body"
            :publishedDate="post.publishedDate"
            :tags="post.tags"
            :id="post._id"/>
    </div>
</template>

<script>
import PostItem from "./PostItem.vue";
export default {
  components: {
    PostItem
  },
  props: ["posts"]
};
</script>

<style scoped>
</style>