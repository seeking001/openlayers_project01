<template>
  <!-- 地图容器 -->
  <div id="map"></div>
  <!-- 图层控制组件 -->
  <LayerControls
  @generalLayerBtn="generalLayerZindex"
  @generalMarkBtn="generalMarkChange"
  @satelliteLayerBtn="satelliteLayerZindex"
  @satelliteMarkBtn="satelliteMarkChange"
  @terrainLayerBtn="terrainLayerZindex"
  @terrainMarkBtn="terrainMarkChange"
  />
</template>

<script setup>  // 此处采用vue3语法糖写法
// 引入Vue3的composition API
import { onMounted, ref} from "vue";
// 引入openlayers
import "ol/ol.css";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import View from "ol/View";
// 引入图层控制组件
import LayerControls from "./components/LayerControls.vue";

// 使用ref创建响应式变量
// 1. 地图实例和地图容器实例
const map = ref(null)
// const mapContainer = ref(null)
// 2. 图层实例
const layers = ref({
  generalLayer: null,
  generalMarkLayer: null,
  satelliteLayer: null,
  satelliteMarkLayer: null
})
// 3. 注记图层可见性状态
const generalMarkVisible = ref(true)
const satelliteMarkVisible = ref(true)
const terrainMarkVisible = ref(true)
 
// 初始化地图--使用onMounted生命周期钩子确保DOM已加载
onMounted(() => {
  // 一、挂载图层（以天地图为例）
  // 1. 挂载标准图层
  layers.generalLayer = new TileLayer({
    source: new XYZ({
      url: "http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=5911fa4ad51d6af49b0b3be1eba86a2f",
      wrapX: false
    })
  })
  // 2. 挂载标准图层注记
  layers.generalMarkLayer = new TileLayer({
    source: new XYZ({
      url: "http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=5911fa4ad51d6af49b0b3be1eba86a2f",
      wrapX: false
    })
  })
  // 3. 挂载卫星图层
  layers.satelliteLayer = new TileLayer({
    source: new XYZ({
      url: "http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=5911fa4ad51d6af49b0b3be1eba86a2f",
      wrapX: false
    })
  })
  // 4. 挂载卫星图层注记
  layers.satelliteMarkLayer = new TileLayer({
    source: new XYZ({
      url: "http://t0.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=5911fa4ad51d6af49b0b3be1eba86a2f",
      wrapX: false
    })
  })
  // 5. 挂载地形图层
  layers.terrainLayer = new TileLayer({
    source: new XYZ({
      url: "http://t0.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=5911fa4ad51d6af49b0b3be1eba86a2f",
      wrapX: false
    })
  })
  // 6. 挂载地形图层注记
  layers.terrainMarkLayer = new TileLayer({
    source: new XYZ({
      url: "http://t0.tianditu.gov.cn/cta_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=5911fa4ad51d6af49b0b3be1eba86a2f",
      wrapX: false
    })
  })

  // 二、创建地图实例
  map.value = new Map({
    target: "map",
    layers: [
      layers.generalLayer,
      layers.generalMarkLayer,
      layers.satelliteLayer,
      layers.satelliteMarkLayer,
      layers.terrainLayer,
      layers.terrainMarkLayer
    ],
    view: new View({
      center: [114.0, 22.6],
      projection: "EPSG:4326",
      zoom: 12,
      extent: [-180, -85, 180, 85]
    })
  })
})

// 注册图层事件
// 1. 标准图层zindex事件
const generalLayerZindex = () => {
  layers.generalLayer.setZIndex(50)
  layers.generalMarkLayer.setZIndex(60)
  layers.satelliteLayer.setZIndex(30)
  layers.satelliteMarkLayer.setZIndex(40)
  layers.terrainLayer.setZIndex(10)
  layers.terrainMarkLayer.setZIndex(20)
}
// 2. 标准图层注记change事件
const generalMarkChange = (visible) => {
  generalMarkVisible.value = visible
  layers.generalMarkLayer.setVisible(visible)
}
// 3. 卫星图层zindex事件
const satelliteLayerZindex = () => {
  layers.generalLayer.setZIndex(50)
  layers.generalMarkLayer.setZIndex(60)
  layers.satelliteLayer.setZIndex(70)
  layers.satelliteMarkLayer.setZIndex(80)
  layers.terrainLayer.setZIndex(30)
  layers.terrainMarkLayer.setZIndex(40)
}
// 4. 卫星图层注记change事件
const satelliteMarkChange = (visible) => {
  satelliteMarkVisible.value = visible
  layers.satelliteMarkLayer.setVisible(visible)
}
// 5. 地形图层zindex事件
const terrainLayerZindex = () => {
  layers.generalLayer.setZIndex(50)
  layers.generalMarkLayer.setZIndex(60)
  layers.satelliteLayer.setZIndex(30)
  layers.satelliteMarkLayer.setZIndex(40)
  layers.terrainLayer.setZIndex(70)
  layers.terrainMarkLayer.setZIndex(80)
}
// 6. 地形图层注记change事件
const terrainMarkChange = (visible) => {
  terrainMarkVisible.value = visible
  layers.terrainMarkLayer.setVisible(visible)
}
</script>