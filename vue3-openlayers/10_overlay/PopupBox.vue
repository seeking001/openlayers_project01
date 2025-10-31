<template>
  <div id="popup-box">
    <div id="popup-content" v-html="content"></div>
  </div>
</template>

<script setup>
// 定义组件接收props
defineProps({
  content: {
    type: String,
    default: ''
  },
  visible: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
#popup-box {
  background-color: rgba(0, 255, 255, 0.2);
  padding: 5px 15px;
  border-radius: 0 15px;
}
</style>