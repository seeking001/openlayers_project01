<template>
  <div id="map"></div>
</template>

<script setup>
// 引入vue3
import { ref, onMounted } from 'vue'
// 引入ol
import 'ol/ol.css'
import { Feature, Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import { Vector, XYZ } from 'ol/source'
import { Point } from 'ol/geom'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import VectorLayer from 'ol/layer/Vector'
import Translate from 'ol/interaction/Translate'
import Draw from 'ol/interaction/Draw'

// 通过ref定义地图和图层变量
const map = ref(null)
const layers = ref({
  generalLayer: null,
  generalMarkLayer: null
})

//  初始化地图————使用onMounted生命周期钩子确保DOM已加载
onMounted(() => {
  // 一、挂载地图
  // 1. 标准图层
  layers.generalLayer = new TileLayer({
    source: new XYZ({
      url: 'http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=5911fa4ad51d6af49b0b3be1eba86a2f',
      wrapX: false
    })
  })
  // 2. 标准图层标记
  layers.generalMarkLayer = new TileLayer({
    source: new XYZ({
      url: 'http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=5911fa4ad51d6af49b0b3be1eba86a2f',
      wrapX: false
    })
  })

  // 二、创建地图实例
  map.value = new Map({
    target: 'map',
    layers: [layers.generalLayer, layers.generalMarkLayer],
    // 创建视图
    view: new View({
      center: [104, 36],
      projection: 'EPSG:4326',
      zoom: 4.9,
      extent: [-180, -85, 180, 85]
    })
  })

  // 三、创建图标icon并拖动
  const addIcon = () => {
    // 1. 设置西安标志点
    const icon1 = new Feature({
      geometry: new Point([108.95, 34.25])
    })
    icon1.setStyle([
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          scale: 0.2,
          src: 'icon.png'
        })
      })
    ])

    // 2. 设置成都标志点
    const icon2 = new Feature({
      geometry: new Point([104.06, 30.66])
    })
    icon2.setStyle([
      new Style({
        image: new Icon({
          anchor: [1.5, 1],
          scale: 0.2,
          src: 'icon.png'
        })
      })
    ])

    // 创建矢量图层
    const iconLayer = new VectorLayer({
      source: new Vector({
        features: [icon1, icon2]
      })
    })

    // 向地图添加图层
    map.value.addLayer(iconLayer)

    // 设置图标点位拖动效果 translate
    const translate = new Translate({
      layers: [iconLayer]
    })
    map.value.addInteraction(translate)
  }
  // 调用图层函数
  addIcon()

  // 四、绘制图标_鼠标点击添加图标 draw
  const addDrawIcon = () => {
    // 1. 创建图层（承接绘制的图标）
    const source = new Vector()
    const iconLayer = new VectorLayer({
      source
    })
    // 向地图添加图层
    map.value.addLayer(iconLayer)

    // 2. 设置图标样式
    const iconStyle = new Style({
      image: new Icon({
        src: 'icon.png',
        anchor: [0.5, 1],
        scale: 0.2,
        opacity: 1
      })
    })

    // 3. 设置鼠标绘制效果
    const draw = new Draw({
      source: source,
      type: 'Point',
      style: iconStyle  // 此行不设置时，鼠标为默认效果
    })

    // 4. 创建点击鼠标绘制事件
    draw.on('drawend', (e) => {
      e.feature.setStyle(iconStyle)
    })

    // 5. 给地图添加绘制结果
    map.value.addInteraction(draw)

    // 6. 设置图标点位拖动效果 translate
    const translate = new Translate({
      layers: [iconLayer]
    })
    map.value.addInteraction(translate)
  }
  // 调用绘制图层函数
  addDrawIcon()
})
</script>

<style scoped>
#map{
  width: 100vw;
  height: 100vh;
}
</style>