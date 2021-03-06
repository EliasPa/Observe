import Vue from 'vue'
import App from './App.vue'
import Vue2Leaflet from 'vue2-leaflet'
import './../node_modules/leaflet/dist/leaflet.css'
import L from 'leaflet'
import Spinner from 'vue-simple-spinner'

Vue.component('v-map', Vue2Leaflet.Map)
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer)
Vue.component('v-marker', Vue2Leaflet.Marker)
Vue.component('vue-simple-spinner', Spinner) 
new Vue({
  el: '#app',
  render: h => h(App)
})
