<template>
  <div id="map"></div>
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
import Draw from "ol/interaction/Draw";
import { Circle } from "ol/geom";
import Modify from "ol/interaction/Modify"

// 通过ref定义地图和图层变量
const map = ref(null)
const layers = ref({
  generalLayer: null,
  generalMarkLayer: null,
  vectorLayer: null
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
  // 3. 矢量图层
  layers.vectorLayer = new VectorLayer({
    source: new Vector({
      url: 'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json',
      format: new GeoJSON()
    }),
    // 设置矢量图层样式
    style: new Style({
      fill: new Fill({
        color: 'rgba(0, 0, 0, 0.1)'
      }),
      stroke: new Stroke({
        color: 'rgba(0, 255, 0, 0.8)',
        width: 1
      })
    })
  })

  // 二、创建地图实例
  map.value = new Map({
    target: 'map',
    layers: [layers.generalLayer, layers.generalMarkLayer, layers.vectorLayer],
    view: new View({
      center: [104, 36],
      projection: "EPSG:4326",
      zoom: 4.9,
      extent: [-180, -85, 180, 85]
    })
  })

  // 三、创建绘制功能
  // 1. 创建矢量图源
  const source = new Vector()
  // 2. 创建矢量图层
  const vectorLayer = new VectorLayer({
    source,
    // 定义绘制后的图上显示样式
    style: new Style({
      fill: new Fill({
        color: 'rgba(0, 0, 0, 0.1)',
      }),
      stroke: new Stroke({
        color: 'rgba(0, 0, 255, 0.8)',
        width: 1,
        lineDash: [6, 3]  //虚线样式，第一个数字是虚线段长度，第二个数字是虚线间隔长度
      })
    })
  })

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
    // geometryFunction: Draw.createBox(),
    // 形式四：绘制正多边形
    // type: 'Circle',
    // geometryFunction: Draw.createRegularPolygon(6),

    // 定义绘制过程中的样式
    style: new Style({
      fill: new Fill({
        color: 'rgba(255, 0, 0, 0.1)'
      }),
      stroke: new Stroke({
        color: 'rgba(255, 0, 0, 0.8)',
        width: 1,
        lineDash: [6, 3]
      }),
      // 鼠标点上的图形样式
      // image: new Circle({
      //   radius: 3,
      //   fill: new Fill({
      //     color: 'rgba(255, 0, 0, 0,5)'
      //   })
      // })
    })
  })

  // 添加绘图交互
  map.value.addInteraction(vectorDraw)

  // 创建图形修改（拖动端点修改）
  const vectorModify = new Modify({
    source
  })
  map.value.addInteraction(vectorModify)
})
</script>

<style>
#map {
  width: 100vw;
  height: 100vh;
}
</style>