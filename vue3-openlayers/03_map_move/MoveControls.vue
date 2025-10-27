<template>
  <div class="map-move">
    <button @click="emitMove('up')">上移</button>
    <button @click="emitMove('down')">下移</button>
    <button @click="emitMove('left')">左移</button>
    <button @click="emitMove('right')">右移</button>
    <button @click="emitMove('zh')">全国视图</button>
    <button @click="emitMove('wh')">移至武汉</button>
    <button @click="emitMove('sz')">移至深圳</button>
    <button @click="emitMove('xa')">移至西安</button>
    <button @click="emitMove('cd')">移至成都</button>
  </div>
</template>

<script setup>
// 引入vue3中的emit编译宏
import { defineEmits } from 'vue'

// 定义从子组件发出的事件
const emit = defineEmits(['moveMap'])

// 创建触发移动函数
const emitMove = (type) => {
  emit('moveMap', type)
}

</script>

<style scoped>
.map-move {
      position: absolute;
      top: 8px;
      left: 60px;
    }

.map-move button {
      margin-right: 5px;
      padding: 0 5px;
      font-size: 15px;
      font-weight: 700;
    }
</style>