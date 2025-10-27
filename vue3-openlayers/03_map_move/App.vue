<template>
  <!-- 创建地图容器 -->
  <div id="map"></div>
  <MoveControls @moveMap="handleMove"/>
</template>

<script setup>
// 引入vue3的组合式API
import { onMounted, ref } from 'vue'
// 引入ol
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
// 引入组件
import MoveControls from './components/MoveControls.vue'

// 使用ref创建响应式变量
// 1. 创建地图容器
const map = ref(null)
// 2. 创建图层容器
const layers = ref({
  generalLayer: null,
  generalMarkLayer: null
})

// 渲染图层和地图
onMounted(() => {
  // 1. 渲染标准图层
  layers.generalLayer = new TileLayer({
    source: new XYZ({
      url: 'http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=5911fa4ad51d6af49b0b3be1eba86a2f',
      wrapX: false
    })
  })
  // 2. 渲染标准注记图层
  layers.generalMarkLayer = new TileLayer({
    source: new XYZ({
      url: 'http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=5911fa4ad51d6af49b0b3be1eba86a2f',
      wrapX: false
    })
  })

  // 创建地图
  map.value = new Map({
    target: 'map',
    layers: [
      layers.generalLayer,
      layers.generalMarkLayer
    ],
    view: new View({
      center: [104, 36],
      projection: 'EPSG:4326',
      zoom: 4.9,
      extent: [-180, -85, 180, 85]
    })
  })
})


// 处理地图移动事件 - 使用对象映射的简洁写法
const handleMove = (type) => {
  // 更严谨的写法：如果地图未加载，那么就中止函数（此处可省略）
  // if (!map.value) return
  
  const view = map.value.getView()
  const center = view.getCenter()
  
  // 定义移动操作映射
  const moveActions = {
    up: () => view.animate({ center: [center[0], center[1] - 0.01], duration: 300 }),
    down: () => view.animate({ center: [center[0], center[1] + 0.01], duration: 300 }),
    left: () => view.animate({ center: [center[0] + 0.01, center[1]], duration: 300 }),
    right: () => view.animate({ center: [center[0] - 0.01, center[1]], duration: 300 }),
    zh: () => view.animate({ center: [104, 36], zoom: 4.9, duration: 2000 }),
    wh: () => view.animate({ center: [114.30, 30.60], zoom: 12, duration: 2000 }),
    sz: () => view.animate({ center: [114.00, 22.60], zoom: 12, duration: 2000 }),
    xa: () => view.animate({ center: [108.95, 34.25], zoom: 12, duration: 2000 }),
    cd: () => view.animate({ center: [104.06, 30.66], zoom: 12, duration: 2000 })
  }
  
  // 执行对应的移动操作
  if (moveActions[type]) {
    moveActions[type]()
  }
}


// 处理地图移动事件 - 使用 if-else 的写法比较易于理解
// const handleMove = (type) => {
//   // 更严谨的写法：如果地图未加载，那么就中止函数
//   // if (!map.value) return
  
//   const view = map.value.getView()
//   const center = view.getCenter()
  
//   // 使用 if-else 结构处理不同的移动类型
//   if (type === 'up') {
//     // 向上移动：纬度减小
//     view.animate({
//       center: [center[0], center[1] - 0.01],
//       duration: 300
//     })
//   } else if (type === 'down') {
//     // 向下移动：纬度增加
//     view.animate({
//       center: [center[0], center[1] + 0.01],
//       duration: 300
//     })
//   } else if (type === 'left') {
//     // 向左移动：经度增加
//     view.animate({
//       center: [center[0] + 0.01, center[1]],
//       duration: 300
//     })
//   } else if (type === 'right') {
//     // 向右移动：经度减小
//     view.animate({
//       center: [center[0] - 0.01, center[1]],
//       duration: 300
//     })
//   } else if (type === 'zh') {
//     // 全国视图
//     view.animate({
//       center: [104, 36],
//       zoom: 4.9,
//       duration: 2000
//     })
//   } else if (type === 'wh') {
//     // 移至武汉
//     view.animate({
//       center: [114.30, 30.60],
//       zoom: 12,
//       duration: 2000
//     })
//   } else if (type === 'sz') {
//     // 移至深圳
//     view.animate({
//       center: [114.00, 22.60],
//       zoom: 12,
//       duration: 2000
//     })
//   } else if (type === 'xa') {
//     // 移至西安
//     view.animate({
//       center: [108.95, 34.25],
//       zoom: 12,
//       duration: 2000
//     })
//   } else if (type === 'cd') {
//     // 移至成都
//     view.animate({
//       center: [104.06, 30.66],
//       zoom: 12,
//       duration: 2000
//     })
//   }
// }

</script>

<style scoped>
#map {
  width: 100vw;
  height: 100vh;
}
</style>