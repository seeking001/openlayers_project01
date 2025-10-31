<template>
  <!-- 创建地图容器 -->
  <div id="map"></div>
  <SetBtn @setZoom="handleSetZoom" @setCenter="handleSetCenter"/>
</template>

<script setup>
import { onMounted, ref } from "vue";
import "ol/ol.css";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import View from "ol/View";
// 引入组件
import SetBtn from "./components/SetBtn.vue";

// 通过ref定义地图、图层和选择变量
const map = ref(null)
const layers = ref({
  generalLayer: null,
  generalMarkLayer: null
})

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

  // 二、创建地图实例
  map.value = new Map({
    target: 'map',
    layers: [layers.generalLayer, layers.generalMarkLayer],
    view: new View({
      center: [104, 36],
      projection: "EPSG:4326",
      zoom: 4.9,
      extent: [-180, -85, 180, 85]
    })
  })
})

  // 三、设置视图和中心点（要设置在onmounted外面）
  // 1. 设置视图
  // 获取设置视图按钮
  const handleSetZoom = () => {
    map.value.getView().setZoom(12)
  }

  // 2. 设置中心点
  const handleSetCenter = () => {
    map.value.getView().setCenter([114.30, 30.60])
  }
</script>

<style scoped>
#map {
  width: 100vw;
  height: 100vh;
}
</style>