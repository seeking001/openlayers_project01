<template>
  <!-- 创建地图容器 -->
  <div id="map"></div>
  <!-- 创建地图控件 -->
  <!-- 创建鼠标坐标 -->
  <div id="mouse-position"></div>
  <!-- 创建小地图 -->
  <div id="overview-map"></div>
  <!-- 创建比例尺 -->
  <div id="scale-line"></div>
</template>

<script setup>
// 引入vue3的composition API
import { onMounted, ref } from "vue"

// 引入ol
import "ol/ol.css"
import Map from 'ol/Map.js'
import View from 'ol/View.js'
import TileLayer from 'ol/layer/Tile.js'
import XYZ from 'ol/source/XYZ.js'

// 引入控件
import MousePosition from 'ol/control/MousePosition.js'
import { defaults } from 'ol/control/defaults'
// import { default as defaultControls } from 'ol/control'
import { createStringXY } from "ol/coordinate"
import { FullScreen, OverviewMap, ScaleLine, ZoomSlider, ZoomToExtent } from "ol/control"

// 采用ref建立地图变量
const map = ref(null)
// 采用ref建立图层变量
const layers = ref({
  generalLayer: null,
  generalMarkLayer: null
})

onMounted(() => {
  // 一、渲染图层
  // 1. 渲染标准图层
  layers.generalLayer = new TileLayer({
    source: new XYZ({
      url: 'http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=5911fa4ad51d6af49b0b3be1eba86a2f',
      wrapX: false
    })
  })

  // 2. 渲染标准图层标记
  layers.generalMarkLayer = new TileLayer({
    source: new XYZ({
      url: 'http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=5911fa4ad51d6af49b0b3be1eba86a2f',
      wrapX: false
    })
  })

  // 二、配置地图控件
  // 1. 鼠标位置显示坐标
  const mousePosition = new MousePosition({
    coordinateFormat: createStringXY(4),
    projection: 'EPSG:4326',
    className: 'custom-mouse-position',
    target: document.getElementById('mouse-position')
  })
  // 2. 小地图
  const overviewMap = new OverviewMap({
    target: document.getElementById('overview-map')
  })
  // 3. 比例尺
  const scaleLine = new ScaleLine({
    target: document.getElementById('scale-line')
  })

  // 三、创建地图
  map.value = new Map({
    target: 'map',
    layers: [layers.generalLayer, layers.generalMarkLayer],
    view: new View({
      center: [104, 36],
      projection: 'EPSG:4326',
      zoom: 4.9,
      extend: [-180, -85, 180, 85]
    }),
    // 添加地图控件
    controls: defaults().extend([
      // 全屏控件
      new FullScreen(),
      // 鼠标坐标控件
      mousePosition,
      // 小地图控件
      overviewMap,
      // 比例尺控件
      scaleLine,
      // 滑动视线调整
      new ZoomSlider(),
      // 视线调整到最大
      new ZoomToExtent()
    ])
  })
})

</script>

<style scoped>
#map {
  width: 100vw;
  height: 100vh;
}

#mouse-position {
  position: absolute;
  right: 50px;
  bottom: 5px;
}

#overview-map {
  position: absolute;
  bottom: 180px;
}

#scale-line {
  position: absolute;
  left: 250px;
}
</style>