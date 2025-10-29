<template>
  <!-- 创建地图容器 -->
  <div id="map"></div>
  <SelectArea/>
</template>

<script setup>
import { onMounted, ref } from "vue";
import "ol/ol.css";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import View from "ol/View";
import VectorLayer from "ol/layer/Vector";
import { Vector } from "ol/source";
import GeoJSON from "ol/format/GeoJSON";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Draw, { createBox, createRegularPolygon } from 'ol/interaction/Draw';
import Circlestyle from "ol/style/Circle";
import Modify from "ol/interaction/Modify";
<<<<<<< HEAD
=======
import Select from 'ol/interaction/Select';
>>>>>>> 85b8789a22416c6e4b7133d85bd704f3d5d146cb
// 引入组件
import SelectArea from "./components/SelectArea.vue";

// 通过ref定义地图和图层变量
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

  // 三、添加矢量图层
  // 1. 创建图层实例
  const vectorLayer = new VectorLayer({
    source: new Vector({
      url: 'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json',
      format: new GeoJSON()
    }),
    style: new Style({
      fill: new Fill({
        color: 'rgba(0, 255, 255, 0.1)',
      }),
      stroke: new Stroke({
        color: 'rgba(0, 255, 255, 0.5)',
        width: 1
      })
    })
  })
<<<<<<< HEAD
  // 3. 添加矢量图层
  map.value.addLayer(vectorLayer)

  // 创建绘图交互
  const vectorDraw = new Draw({
    source,

    // 定义绘制几何形状有多种组合形式：
    // 形式一：绘制多边形
    type: 'Polygon',
    // 形式二：绘制圆形
    // type: 'Circle',
    // 形式三：绘制长方形
    // type: 'Circle',
    // geometryFunction: createBox(),
    // 形式四：绘制正多边形
    // type: 'Circle',
    // geometryFunction: createRegularPolygon(6),

    // 定义绘制过程中的样式
=======
  // 向地图添加矢量图层
  map.value.addLayer(vectorLayer)

  // 2. 添加select交互
  const select = new Select({
>>>>>>> 85b8789a22416c6e4b7133d85bd704f3d5d146cb
    style: new Style({
      fill: new Fill({
        color: 'rgba(255, 0, 0, 0.2)'
      }),
      stroke: new Stroke({
<<<<<<< HEAD
        color: 'rgba(255, 0, 0, 0.8)',
        width: 1,
        lineDash: [6, 3]
      }),
      // 鼠标点上的图形样式
      image: new Circlestyle({
        radius: 3,
        fill: new Fill({
          color: 'rgba(255, 0, 0, 0.5)'
        })
=======
        color: 'rgba(255, 0, 0, 0.6)',
        width: 2
>>>>>>> 85b8789a22416c6e4b7133d85bd704f3d5d146cb
      })
    })
  })
  // 向地图添加select交互
  map.value.addInteraction(select)

<<<<<<< HEAD
  // 添加绘图交互
  map.value.addInteraction(vectorDraw)

  // 创建图形修改（拖动端点修改）
  const vectorModify = new Modify({
    source
  })
  map.value.addInteraction(vectorModify)
=======
  // 3. 添加监听选择事件
>>>>>>> 85b8789a22416c6e4b7133d85bd704f3d5d146cb
})
</script>

<style scoped>
#map {
  width: 100vw;
  height: 100vh;
}
</style>