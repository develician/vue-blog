<template>
    <div v-if="this.$props.visible">
        <div class='gray-background'/>
            <div class='modal-wrapper'>
                <div class='modal'>
                    <div class='form'>
                    <div @click="this.$props.onCancel" class='close'>&times;</div>
                    <div class='title'>로그인</div>
                    <div class='description'>관리자 비밀번호를 입력하세요</div>
                    <input 
                        autofocus
                        type="password"
                        placeholder="비밀번호 입력" 
                        v-model="passwordComputed"
                        v-on:keypress.enter="onLogin" />
                    <div v-if="this.$store.state.base.loginModal.error" class="error">로그인 실패</div>
                    <div class='login' @click="this.onLogin">로그인</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ["visible", "onCancel", "onLogin"],

  computed: {
    passwordComputed: {
      get() {
        return this.$store.state.base.password;
      },
      set(value) {
        this.$store.commit("changePasswordInput", { value });
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

    .form {
      background: white;
      padding: 2rem;
      position: relative;
      padding-top: 2.5rem;
      width: 20rem;
      .close {
        line-height: 2rem;
        font-size: 2rem;
        position: absolute;
        right: 1rem;
        top: 0.5rem;
        cursor: pointer;
        &:hover {
          color: $oc-gray-6;
        }
      }
      .title {
        font-size: 1.25rem;
        font-weight: 500;
      }
      .description {
        margin-top: 0.25rem;
      }
      .error {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        color: $oc-red-6;
        text-align: center;
        font-size: 0.85rem;
      }

      input {
        width: 100%;
        font-size: 1.25rem;
        margin-top: 0.5rem;
        border: none;
        border-bottom: 1px solid $oc-gray-3;
        padding: 0.25rem;
        outline: none;
        border-radius: 4px;
      }

      .login {
        background: $oc-blue-6;
        text-align: center;
        color: white;
        font-weight: 500;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        cursor: pointer;
        margin-top: 1rem;
        font-size: 1.25rem;
        &:hover {
          background: $oc-blue-5;
        }
        &:active {
          background: $oc-blue-6;
        }
      }
    }
  }
}
</style>