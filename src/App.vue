<template>
  <div id="app">
    <div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
      <div v-on:click="updateData()" class="mdl-shadow--2dp mdl-tabs__tab-bar">
        <a href="#view" class="mdl-tabs__tab is-active">View data</a>
        <a reg="log" href="#log" class="mdl-tabs__tab">Log data</a>
      </div>
      <div class="mdl-tabs__panel is-active" id="view">
        <div class="mdl-grid padded">
          <div class="mdl-layout-spacer"></div>
          <div>
            <card-component :isHot="true" :location="hot.name" :temp="hot.temp"></card-component>
            <card-component :isHot="false" :location="cold.name" :temp="cold.temp"></card-component>
          </div>
          <table-component ref="weatherTable"></table-component>
          <div class="mdl-layout-spacer"></div>
        </div>
      </div>
      <div class="mdl-tabs__panel" id="log">
        <div class="mdl-grid padded">
          <div class="mdl-layout-spacer"></div>
          <div>
            <form-component v-for="location in locations" :location="location" :onClick="() => changeCoords(location)"></form-component>
          </div>
          <map-component v-if="mapTabSelected" :locationCoordinates="locationCoordinates"></map-component>
          <div class="mdl-layout-spacer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TableComponent from './components/TableComponent.vue'
  import FormComponent from './components/FormComponent.vue'
  import CardComponent from './components/CardComponent.vue'
  import MapComponent from './components/MapComponent.vue'
  let config = require('./config')
  let axios = require('axios')

  export default {
    name: "app",
    data() {
      return {
        mapTabSelected: false,
        temp: 37,
        hot: {
          name: '',
          temp: 0
        },
        cold: {
          name: '',
          temp: 0
        },
        locations: [],
        locationCoordinates: ['60.1697530', '24.9490830']
      };
    },
    methods: {
      changeTab: function(){
        let logTab = this.$refs.log
        if(log.classList.contains('is-active'))
          this.mapTabSelected = true
        else
          this.mapTabSelected = false
        
      },
      getAllTemperatures: function () {
        console.log(process.env)
        let url = config.url + 'location'
        let vue = this
        axios.get(url).then((res) => {
          vue.cold.name = res.data.min.location
          vue.cold.temp = res.data.min.temp
          vue.hot.name = res.data.max.location
          vue.hot.temp = res.data.max.temp
        }).catch((err) => {
          console.log(err.response.error)
        })
      },
      getAllLocations: function () {
        let url = config.url + 'locations'
        let vue = this
        axios.get(url).then((res) => {
          vue.locations = res.data.locations
        }).catch((err) => {
          console.log(err.response.error)
        })
      },
      updateData: function(){
        this.changeTab()
        this.getAllTemperatures()
        this.$refs.weatherTable.getAll()
      },
      changeCoords: function(location){
        let url = config.url + 'locationCoordinates'
        let vue = this
        let data = {
          name: location
        }
        axios.post(url, data).then((res) => {
          vue.locationCoordinates = res.data.coordinates
        }).catch((err) => {
          console.log(err.response.error)
        })
      }
    },
    components: {
      TableComponent,
      FormComponent,
      CardComponent,
      MapComponent
    },
    mounted: function () {
      this.getAllTemperatures()
      this.getAllLocations()
    }
  };
</script>

<style>
  .medium-padding {
    padding: 1%;
  }

  .main {
    width: 70%
  }

  .mdl-card {
    min-height: 10px;
  }
</style>