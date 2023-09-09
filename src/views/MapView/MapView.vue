<template>  
  <div>
    <h1>Map</h1>
    <div id="map" class="livemap-wrapper" ref="map"></div>
  </div>
</template>

<!-- <template src="./MapView.html">  
</template> -->

<style src="./MapView.scss" lang="scss" scoped>
</style>

<script>
import 'leaflet/dist/leaflet.css';
import leaflet from 'leaflet'
import 'leaflet-rotatedmarker';
// import { LatLng, latLngBounds, latLng, point } from 'leaflet';
import { customIcons } from '../../helpers/MapHelper';
import { getAcarsPosition, getWazzup } from '../../data/http/listRequest';

export default {
  props: {
    tilesUrl: {
      type: String,
      default: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      // default: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
    },
    attribution: {
      type: String,
      default: '&copy; <a href=\'https://www.openstreetmap.org/copyright\'>OpenStreetMap</a> contributors',
    },
  },
  data() {
    return {
      zoom: 13.5,
      map: null,
      tileLayer: null,
      markers: {},
      testPilot: null,
      updateInterval: null
    };
  },
  async mounted() {
    this.start();
  },
  unmounted() {
    clearInterval(this.updateInterval);
  },
  methods: {
    createMap() {
      this.map = leaflet.map(this.$refs.map).setView([0,0], 4);
      this.tileLayer = leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);
    },  
    async start() {
      this.createMap();
      const wazzup = await getWazzup();
      const pilots= wazzup.clients.pilots;

      const latitudes = [];
      const longitudes = [];

      pilots.forEach(pilot => {
        if (pilot.lastTrack) {
          const { latitude, longitude, heading } = pilot.lastTrack;
          this.markers[pilot.userId] = leaflet.marker([latitude, longitude], {
            icon: customIcons.iconPlane
          }).addTo(this.map).setRotationAngle(heading);
          latitudes.push(latitude);
          longitudes.push(longitude);
        }
      });      
      this.updateInterval = setInterval(this.update, 5000);
    },
    async update() {
      console.log('update');
      const wazzup = await getWazzup();
      const acars = await getAcarsPosition();
      const pilots= wazzup.clients.pilots;
      pilots.forEach(pilot => {
        if (pilot.lastTrack) {
          const { latitude, longitude, heading } = pilot.lastTrack;
          let marker = this.markers[pilot.userId];
          if (marker) {
            marker.setLatLng([latitude, longitude]).setRotationAngle(heading);
          } else {
            this.markers[pilot.userId] = leaflet.marker([latitude, longitude], {
              icon: customIcons.iconPlane
            }).addTo(this.map).setRotationAngle(heading);
          }
        }
      });

      // Acars Users
      const { latitude, longitude, heading } = acars[0];
      console.log('latitude, longitude, heading :>> ', latitude, longitude, heading);
      let marker = this.markers['test_acar'];
      if (marker) {
        marker.setLatLng([latitude, longitude]).setRotationAngle(heading);
      } else {
        this.markers['test_acar'] = leaflet.marker([latitude, longitude], {
          icon: customIcons.acarPlane
        }).addTo(this.map).setRotationAngle(heading);
      }
    }
  }
}
</script>