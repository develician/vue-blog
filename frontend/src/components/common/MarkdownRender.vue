<template>
    <div class='markdown-render' v-html="html"/>
    <!-- <div>{{this.$store.state.editor.html}}</div> -->
</template>

<script>
import marked from "marked";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
// 지원 할 코드 형식들을 불러옵니다
// http://prismjs.com/#languages-list 참조
import "prismjs/components/prism-bash.min.js";
import "prismjs/components/prism-javascript.min.js";
import "prismjs/components/prism-jsx.min.js";
import "prismjs/components/prism-css.min.js";
export default {
  props: ["markdown"],
  mounted() {
    Prism.highlightAll();
  },
  updated() {
    Prism.highlightAll();
  },
  computed: {
    html: {
      get() {
        return (
          this.$props.markdown &&
          marked(this.$props.markdown, {
            breaks: true,
            sanitize: true
          })
        );
      }
    }
  }
};
</script>

<style lang="scss">
@import "src/styles/utils";
.markdown-render {
  blockquote {
    border-left: 4px solid $oc-blue-6;
    padding: 1rem;
    background: $oc-gray-1;
    margin-left: 0;
    margin-right: 0;
    p {
      margin: 0;
    }
  }

  h1,
  h2,
  h3,
  h4 {
    font-weight: 500;
  }

  // 텍스트 사이의 코드
  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    code {
      font-family: "D2 Coding";
      background: $oc-gray-0;
      padding: 0.25rem;
      color: $oc-blue-6;
      border: 1px solid $oc-gray-2;
      border-radius: 2px;
    }
  }

  // 코드 블록
  code[class*="language-"],
  pre[class*="language-"] {
    font-family: "D2 Coding";
  }

  a {
    color: $oc-blue-6;
    &:hover {
      color: $oc-blue-5;
      text-decoration: underline;
    }
  }

  // 표 스타일
  table {
    border-collapse: collapse;
    width: 100%;
  }

  table,
  th,
  td {
    border: 1px solid $oc-gray-4;
  }

  th,
  td {
    font-size: 0.9rem;
    padding: 0.25rem;
    text-align: left;
  }

  // 이미지 최대사이즈 설정 및 중앙정렬
  img {
    max-width: 100%;
    margin: 0 auto;
    display: block;
  }
}
</style>