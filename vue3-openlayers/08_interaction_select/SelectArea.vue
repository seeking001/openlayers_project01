<template>
  <div class="selected-area">
    所选择的区域为：<span id="selected-name" :class="{ blue: selectedName !== '未选择' }">{{ selectedName }}</span>
  </div>
</template>

<script setup>
// 定义组件接收props
defineProps({
  selectedName: {
    type: String,
    default: '未选择'
  }
})
</script>

<style scoped>
.selected-area {
  position: absolute;
  top: 9px;
  left: 80px;
  padding: 5px 20px;
  background: rgba(0, 0, 255, 0.1);
  border: 2px solid rgba(0, 0, 255, 0.2)
}

#selected-name {
  font-size: 18px;
  font-weight: 700;
}

.blue {
  color: blue;
}
</style>