<template>
    <div v-if="this.$props.visible">
        <div v-bind:class="['gray-background', this.animation]"/>
            <div class='modal-wrapper'>
                <div v-bind:class="['modal', this.animation]">
                    <div class='question'>
                        <div class='title'>포스트 삭제</div>
                        <div class='description'>이 포스트를 정말로 삭제하시겠습니까?</div>
                    </div>
                    <div class='options'>
                        <div class="button">
                            <btn-component :onClick="this.hideModal" :theme="'gray'" :disabled="false" :buttonTitle="'취소'" />
                        </div>
                        <div class="button">
                            <btn-component :theme="'default'" :onClick="this.removePost" :disabled="false" :buttonTitle="'삭제'" />
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
import btnComponent from "@/components/common/Button.vue";
export default {
  components: {
    btnComponent
  },
  data() {
    return {
      animate: false
    };
  },
  props: ["visible"],
  methods: {
    hideModal() {
      this.$store.dispatch("hideModal", { name: "remove" });
    },
    async removePost() {
      try {
        await this.$store.dispatch("removePost", this.$route.params.id);
        this.hideModal();
        this.$router.push({
          name: "ListPage"
        });
      } catch (e) {
        console.log(e);
      }
    },
    startAnimation() {
      this.animate = true;
      setTimeout(() => {
        this.animate = false;
      }, 250);
    }
  },
  watch: {
    visible: function(nextVisible, prevVisible) {
      this.startAnimation();
    }
  },
  computed: {
    animation: {
      get() {
        return this.animate && (this.$props.visible ? "enter" : "leave");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/styles/utils";

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes slideUp {
  0% {
    transform: translateY(50vh);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes slideDown {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(50vh);
  }
}

.gray-background {
  background: rgba(100, 100, 100, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  &.enter {
    animation: fadeIn 0.25s ease-in both;
  }
  &.leave {
    animation: fadeOut 0.25s ease-in both;
  }
}

.modal-wrapper {
  z-index: 10;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .modal {
    @include material-shadow(3, 0.5);
    background: white;
    &.enter {
      animation: slideUp 0.25s ease-in both;
    }
    &.leave {
      animation: slideDown 0.25s ease-in both;
    }

    .question {
      background: white;
      padding: 2rem;
      .title {
        font-size: 1.25rem;
        font-weight: 500;
      }
      .description {
        margin-top: 0.25rem;
      }
    }

    .options {
      padding: 1rem;
      background: $oc-gray-1;
      text-align: right;
      display: flex;
      flex-direction: row-reverse;
      .button + .button {
        margin-right: 1rem;
      }
    }
  }
}
</style>