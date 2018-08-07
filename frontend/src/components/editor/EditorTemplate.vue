<template>
    <div class='editor-template'>
        <editor-header />
        <div class='panes'>
          <div class='pane editor' v-bind:style="{flex: this.leftPercentage}">
            <editor-pane :post="this.$store.state.post.post" />
          </div>
          <div class='pane preview' v-bind:style="{flex: 1 - this.leftPercentage}">
            <preview-pane />
          </div>
          <div 
            class='separator' 
            v-bind:style="{left: `${this.leftPercentage * 100}%`}"
            @mousedown="this.handleSeparatorMouseDown"/>
        </div>
      </div>
</template>

<script>
import EditorHeader from "./EditorHeader.vue";
import EditorPane from "./EditorPane.vue";
import PreviewPane from "./PreviewPane.vue";
import queryString from "query-string";

export default {
  components: {
    EditorHeader,
    EditorPane,
    PreviewPane
  },
  data() {
    return {
      leftPercentage: 0.5,
      separatorStyle: `${this.leftPercentage * 100}%`
    };
  },
  methods: {
    handleMouseMove(e) {
      this.leftPercentage = e.clientX / window.innerWidth;
    },
    handleMouseUp(e) {
      document.body.removeEventListener("mousemove", this.handleMouseMove);
      window.removeEventListener("mouseup", this.handleMouseUp);
    },
    handleSeparatorMouseDown(e) {
      console.log("down");
      document.body.addEventListener("mousemove", this.handleMouseMove);
      window.addEventListener("mouseup", this.handleMouseUp);
    }
  },
  mounted() {
    const { id } = queryString.parse(location.search);
    if (id) {
      this.$store.dispatch("getPostEditor", id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/styles/utils";

.editor-template {
  .panes {
    height: calc(100vh - 4rem); // 페이지 높이에서 EditorHeader 크기 빼기
    display: flex;
    background: $oc-gray-1; // 임시
    .pane {
      display: flex;
      //   flex: 1; // 임시
      min-width: 0; // 내부의 내용이 커도 반대편 영역을 침범하지 않게 해줌
      overflow: auto; // 너무 많이 줄이면 스크롤바가 나타나게 해줌
      @include media("<medium") {
        .editor {
          flex: 1 !important;
        }
        .preview,
        .separator {
          display: none;
        }
      }
    }
    .separator {
      width: 1rem; // 클릭 영역을 넓게 설정하기 위함
      height: 100%;
      position: absolute;
      transform: translate(-50%); // 자신의 50% 만큼 왼쪽으로 이동
      cursor: col-resize; // 리사이즈 커서
      //   background: black; // 임시
    }
  }
}
</style>