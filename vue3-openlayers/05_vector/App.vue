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
  import VectorLayer from 'ol/layer/Vector'
  import { Vector, XYZ } from 'ol/source'
  import GeoJSON from 'ol/format/GeoJSON'
  import Style from 'ol/style/Style'
  import Fill from 'ol/style/Fill'
  import Stroke from 'ol/style/Stroke'
  import { LineString, Point } from 'ol/geom'
  import CircleStyle from 'ol/style/Circle'
  import Translate from 'ol/interaction/Translate'

  // 通过ref定义地图和图层变量
  const map = ref(null)
  const layers = ref({
    generalLayer: null,
    generalMarkLayer: null,
    vectorLayer: null
  })

  // 初始化地图--使用onMounted生命周期钩子确保DOM已加载
  onMounted(() => {
    // 一、挂载地图
    // 1. 标准地图
    layers.generalLayer = new TileLayer({
      source: new XYZ({
        url: 'http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=5911fa4ad51d6af49b0b3be1eba86a2f',
        wrapX: false
      })
    })
    // 2. 标准地图标注
    layers.generalMarkLayer = new TileLayer({
      source: new XYZ({
        url: 'http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=5911fa4ad51d6af49b0b3be1eba86a2f',
        wrapX: false
      })
    })
    // 3. 矢量图
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
          color: 'rgba(0, 255, 255, 0.8)',
          width: 2
        })
      })
    })

    // 二、创建地图实例
    map.value = new Map({
      target: 'map',
      layers: [layers.generalLayer, layers.generalMarkLayer, layers.vectorLayer],
      // 创建视图
      view: new View({
        center: [104, 36],
        projection: 'EPSG:4326',
        zoom: 4.9,
        extent: [-180, -85, 180, 85]
      })
    })

    // 三、添加矢量图形
    // 1. 添加矢量标记点
    const addPoint = () => {
      const point1 = new Feature({
        geometry: new Point([114.30, 30.60])
      })
      point1.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 6,
            fill: new Fill({
              color: 'rgba(255,255,255,0.5)'
            }),
            stroke: new Stroke({
              color: 'red',
              width: 1
            })
          })
        })
      )

      const point2 = new Feature({
        geometry: new Point([114.00, 22.30])
      })
      point2.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 12,
            fill: new Fill({
              color: 'rgba(255,255,255,0.5)'
            }),
            stroke: new Stroke({
              color: 'blue',
              width: 1
            })
          })
        })
      )

      // 创建图层
      const pointLayer = new VectorLayer({
        source: new Vector({
          features: [point1, point2]
        })
      })

      // 向地图添加图层
      map.value.addLayer(pointLayer)

      // 设置矢量图形拖动效果
      const translate = new Translate({
        layers: [pointLayer]
      })
      map.value.addInteraction(translate)
    }
    // 调用函数
    addPoint()

    // 2. 添加矢量标记线
    const addLine = () => {
      const line = new Feature({
        geometry: new LineString([[114.00, 22.30], [114.30, 30.60]])
      })
      // 设置线样式
      line.setStyle(
        new Style({
          stroke: new Stroke({
            color: 'green',
            width: 2
          })
        })
      )

      // 创建图层
      const lineLayer = new VectorLayer({
        source: new Vector({
          features: [line]
        })
      })

      // 向地图添加图层
      map.value.addLayer(lineLayer)

      // 设置矢量图形拖动效果
      const translate = new Translate({
        layers: [lineLayer]
      })
      map.value.addInteraction(translate)
    }
    // 调用函数
    addLine()
  })
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#map{
  width: 100vw;
  height: 100vh;
}
</style>