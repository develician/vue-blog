<template>
    <div class='editor-pane'>
        <input class='title' placeholder="제목을 입력하세요" name="title" v-model="title"/>
        <div class='code-editor' ref="editor"></div>
        <div class='tags'>
          <div class='description'>태그</div>
          <input name="tags" placeholder="태그를 입력하세요 (쉼표로 구분)" v-model="tags"/>
        </div>
      </div>
</template>

<script>
import CodeMirror from "codemirror";

import "codemirror/mode/markdown/markdown"; // 마크다운 문법 색상
// 마크다운 내부에 들어가는 코드 색상
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/jsx/jsx";
import "codemirror/mode/css/css";
import "codemirror/mode/shell/shell";

// CodeMirror 를 위한 CSS 스타일
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";

export default {
  mounted() {
    this.initializeEditor();
  },
  props: ["post"],
  data() {
    return {
      codeMirror: null,
      cursor: null,
      first: true
    };
  },
  methods: {
    initializeEditor() {
      this.codeMirror = CodeMirror(this.$refs.editor, {
        mode: "markdown",
        theme: "monokai",
        lineNumbers: true,
        lineWrapping: true
      });
      this.codeMirror.on("change", this.handleChangeMarkdown);
    },
    handleChangeMarkdown(doc) {
      this.cursor = doc.getCursor();
      this.$store.commit("changeInput", {
        name: "markdown",
        value: doc.getValue()
      });
    }
  },
  computed: {
    title: {
      get() {
        return this.$store.state.editor.title;
      },
      set(value) {
        this.$store.commit("changeInput", { name: "title", value });
      }
    },
    tags: {
      get() {
        return this.$store.state.editor.tags;
      },
      set(value) {
        this.$store.commit("changeInput", { name: "tags", value });
      }
    },
    markdown: {
      get() {
        return this.$store.state.editor.markdown;
      }
    }
  },
  watch: {
    markdown(nextMarkdown, prevMarkdown) {
      if (nextMarkdown !== prevMarkdown && this.first) {
        this.first = false;
        if (!this.codeMirror) {
          return;
        }

        this.codeMirror.setValue(this.markdown);
        if (!this.cursor) {
          return;
        }
        this.codeMirror.setCursor(this.cursor);
      }
    }
  }
};
</script>

<style lang="scss">
@import "src/styles/utils";
.editor-pane {
  flex: 1; // 자신에게 주어진 영역을 다 채우기
  // 세로방향으로 내용 나열
  display: flex;
  flex-direction: column;

  .title {
    background: $oc-gray-7;
    border: none;
    outline: none;
    font-size: 1.5rem;
    padding: 1rem;
    color: white;
    font-weight: 500;
    &::placeholder {
      color: rgba(255, 255, 255, 0.75);
    }
  }

  .code-editor {
    flex: 1; // 남는 영역 다 차지하기
    background: $oc-gray-9;
    display: flex;
    flex-direction: column; // .CodeMirror 가 세로영역을 전부 차지
    :global .CodeMirror {
      font-size: 1rem;
      flex: 1;
      font-family: "D2 Coding";
    }
  }

  .tags {
    padding-left: 1rem;
    padding-right: 1rem;
    height: 2rem;
    background: $oc-gray-7;
    display: flex;
    align-items: center;
    .description {
      font-size: 0.85rem;
      color: white;
      font-weight: 600;
      margin-right: 1rem;
    }

    input {
      font-size: 0.85rem;
      border: none;
      flex: 1;
      background: none;
      outline: none;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.9);
      &::placeholder {
        color: rgba(255, 255, 255, 0.75);
      }
    }
  }
}
</style>