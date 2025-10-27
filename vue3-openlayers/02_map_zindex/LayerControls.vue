<template>
  <div class="zindex">
    <div class="generalLayer">
      <!-- 使用Vue的事件绑定语法 @click 替代原生的onclick -->
      <button class="generalLayer-zindex" @click="$emit('generalLayerBtn')">标准图层</button>
      <!-- 使用v-model实现双向数据绑定 -->
      <input type="checkbox" id="generalLayer-mark" v-model="generalMarkChecked">
      <label for="generalLayer-mark">标注</label>
    </div>
    <div class="satelliteLayer">
      <button class="satelliteLayer-zindex" @click="$emit('satelliteLayerBtn')">卫星图层</button>
      <input type="checkbox" id="satelliteLayer-mark" v-model="satelliteMarkChecked">
      <label for="satelliteLayer-mark">标注</label>
    </div>
    <div class="terrainLayer">
      <button class="terrainLayer-zindex" @click="$emit('terrainLayerBtn')">地形图层</button>
      <input type="checkbox" id="terrainLayer-mark" v-model="terrainMarkChecked">
      <label for="terrainLayer-mark">标注</label>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

// 定义从父组件接收的props
const props = defineProps({
  generalMarkVisible:{
    type: Boolean,
    default:true
  },
  satelliteMarkVisible:{
    type: Boolean,
    default:true
  },
  terrainMarkVisible: {
    type: Boolean,
    default:true
  }
})

// 定义从子组件发出的事件
const emit = defineEmits([
    'generalLayerBtn',
    'generalMarkBtn',
    'satelliteLayerBtn',
    'satelliteMarkBtn',
    'terrainLayerBtn',
    'terrainMarkBtn'
  ])

// 使用ref创建响应式变量
const generalMarkChecked = ref(props.generalMarkVisible)
const satelliteMarkChecked = ref(props.satelliteMarkVisible)
const terrainMarkChecked = ref(props.terrainMarkVisible)

// 监听复选框变化并触发相应事件
watch(generalMarkChecked, (newValue) => {
  emit('generalMarkBtn', newValue)
})
watch(satelliteMarkChecked, (newValue) => {
  emit('satelliteMarkBtn', newValue)
})
watch(terrainMarkChecked, (newValue) => {
  emit('terrainMarkBtn', newValue)
})
</script>