<template>
    <div class='editor-header'>
      <div class='back'>
        <btn-component buttonTitle="뒤로가기" :onClick="this.handleGoBack" :disabled="false" theme="outline"></btn-component>
      </div>
      <div class='submit'>
         <btn-component v-if="this.id" buttonTitle="수정하기" :onClick="this.handleSubmit" :disabled="false" theme="outline"></btn-component>
         <btn-component v-else buttonTitle="작성하기" :onClick="this.handleSubmit" :disabled="false" theme="outline"></btn-component>
      </div>
    </div>
</template>

<script>
import btnComponent from "@/components/common/Button.vue";
import queryString from "query-string";
export default {
  components: {
    btnComponent
  },
  props: ["onGoBack", "onSubmit"],

  methods: {
    handleGoBack() {
      this.$router.go(-1);
    },
    async handleSubmit() {
      const { title, markdown, tags } = this.$store.state.editor;
      const { id } = queryString.parse(location.search);
      const post = {
        title,
        body: markdown,
        tags:
          tags === ""
            ? []
            : [...new Set(tags.split(",").map(tag => tag.trim()))]
      };

      try {
        if (id) {
          await this.$store.dispatch("editPost", { id, ...post });
          this.$router.push({
            name: "PostPage",
            params: { id: this.$store.state.editor.postId }
          });
          return;
        }
        await this.$store.dispatch("writePost", post);
        this.$router.push({
          name: "PostPage",
          params: { id: this.$store.state.editor.postId }
        });
      } catch (e) {
        console.log(e);
      }
    }
  },
  computed: {
    id: {
      get() {
        return queryString.parse(location.search).id;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/styles/utils";

.editor-header {
  background: $oc-blue-6;
  height: 4rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  align-items: center;

  .submit {
    // 우측 정렬
    margin-left: auto;
  }
}
</style>