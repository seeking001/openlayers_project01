<template>
  <!-- 创建地图容器 -->
  <div id="map"></div>
  <PopupBox ref="popupRef" :content="popupContent" :visible="popupVisible"/>
</template>

<script setup>
import { onMounted, ref } from "vue";
import "ol/ol.css";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import View from "ol/View";
// 引入组件
import PopupBox from "./components/PopupBox.vue";
import { Overlay } from "ol";

// 通过ref定义地图、图层、弹出框内容和弹出框可见状态
const map = ref(null)
const layers = ref({
  generalLayer: null,
  generalMarkLayer: null
})
const popupRef = ref(null)
const popupContent = ref('')
const popupVisible = ref(false)

//  初始化地图————使用onMounted生命周期钩子确保DOM已加载
onMounted(() => {
  // 一、配置图层
  // 1. 标准图层
  layers.generalLayer = new TileLayer({
    source: new XYZ({
      url: "http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=5911fa4ad51d6af49b0b3be1eba86a2f",
      wrapX: false
    })
  })
  // 2. 标准图层注记
  layers.generalMarkLayer = new TileLayer({
    source: new XYZ({
      url: "http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=5911fa4ad51d6af49b0b3be1eba86a2f",
      wrapX: false
    })
  })
  // 3. 设置浮动层（要在地图初始化之前设置）
  const overlay = new Overlay({
    element: popupRef.value.$el,
    autoPan: {
      animation: {
        duration: 300
      }
    }
  })

  // 二、创建地图实例
  map.value = new Map({
    target: 'map',
    layers: [layers.generalLayer, layers.generalMarkLayer],
    overlays: [overlay],
    view: new View({
      center: [104, 36],
      projection: "EPSG:4326",
      zoom: 4.9,
      extent: [-180, -85, 180, 85]
    })
  })

  // 地图点击事件
  map.value.on('click', function(e){
    const coordinate = e.coordinate
    const lon = coordinate[0].toFixed(4)
    const lat = coordinate[1].toFixed(4)
    // 更新弹出框内容
    popupContent.value = `
      <h3>此点坐标</h3>
      <p>经度：${lon}</p>
      <p>纬度：${lat}</p>
    `
    // 设置覆盖层位置并显示
    overlay.setPosition(e.coordinate)
    popupVisible.value = true
  })
})
</script>

<style scoped>
#map {
  width: 100vw;
  height: 100vh;
}
</style>