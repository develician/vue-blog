<template>
    <div>
        <post-container />
        <ask-remove-modal :visible="this.visible"/>
    </div> 
</template>

<script>
import PostContainer from "@/containers/PostContainer.vue";
import AskRemoveModal from "@/components/modal/AskRemoveModal.vue";
export default {
  components: {
    PostContainer,
    AskRemoveModal
  },
  computed: {
    visible: {
      get() {
        return this.$store.state.base.visible.remove;
      }
    }
  }
};
</script>

<style scoped>
</style>