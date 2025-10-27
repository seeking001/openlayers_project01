<template>
  <div id="map"></div>
</template>

<script>
import { onMounted } from "vue";
import "ol/ol.css";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import View from "ol/View";

export default {
  name: "App",
  setup() {
    onMounted(() => {
      new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new XYZ({
              url: "http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=5911fa4ad51d6af49b0b3be1eba86a2f",
              wrapX: false,
            }),
          }),
          new TileLayer({
            source: new XYZ({
              url: "http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=5911fa4ad51d6af49b0b3be1eba86a2f",
              wrapX: false,
            }),
          }),
        ],
        view: new View({
          center: [104, 36],
          projection: "EPSG:4326",
          zoom: 4.9,
          extent: [-180, -85, 180, 85],
        }),
      });
    });
  },
};
</script>

<style>
#map {
  width: 100vw;
  height: 100vh;
}
</style>