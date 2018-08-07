<template>
    <div class='preview-pane'>
    <h1 class='title'>
      {{this.$store.state.editor.title}}
    </h1>
    <div>
      <markdown-render :markdown="this.$store.state.editor.markdown" />
    </div>
  </div>
</template>

<script>
import MarkdownRender from "@/components/common/MarkdownRender.vue";
export default {
  props: ["markdown"],
  components: {
    MarkdownRender
  },
  updated() {
    console.log("updated");
    this.$store.commit("renderMarkdown", {
      markdown: this.$store.state.editor.markdown
    });
  },
  data() {
    return {
      html: ""
    };
  },
  methods: {
    renderMarkdown() {
      const { markdown } = this.$props;
      if (!this.markdown) {
        this.html = "";
        return;
      }
      this.html = marked(markdown, {
        breaks: true,
        sanitize: true
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/styles/utils";
.preview-pane {
  flex: 1;
  padding: 2rem;
  overflow-y: auto; // 사이즈 초과시 스크롤바 나타나게 설정
  font-size: 1.125rem;
  .title {
    font-size: 2.5rem;
    font-weight: 300;
    padding-bottom: 2rem;
    border-bottom: 1px solid $oc-gray-4;
  }
}
</style>