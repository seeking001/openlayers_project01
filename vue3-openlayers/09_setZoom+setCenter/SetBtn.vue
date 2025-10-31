<template>
  <div class="setBtn">
    <button class="setZoom" @click="emitSetZoom">设置视图</button>
    <button class="setCenter" @click="emitSetCenter">设置中心点</button>
  </div>
</template>

<script setup>
// 定义组件发送事件
const emit = defineEmits(['setZoom', 'setCenter'])

// 事件处理函数
const emitSetZoom = () => {
  emit('setZoom')
}

const emitSetCenter = () => {
  emit('setCenter')
}
</script>

<style scoped>
.setBtn {
  position: absolute;
  top: 8px;
  left: 50px;
}

.setBtn button {
  margin: 0 2px;
  padding: 0 2px;
}
</style>