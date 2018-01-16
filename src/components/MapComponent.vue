<template>
    <div class="map_center animated fadeIn">
        <div v-bind:class="classObj">
            <v-map id="mapid" ref="map" :zoom="zoom" :center="locationCoordinates" :options="{ zoomControl: false }">
                <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
                <v-marker v-for="coord in coordinates" :lat-lng="coord"></v-marker>
            </v-map>
        </div>
    </div>
</template>

<script>
    import '../assets/main.css'
    import '../assets/map.css'
    let config = require('./../config')
    let axios = require('axios')

    export default {
        name: "Map",
        data() {
            return {
                classObj: {
                    "mdl-card": true,
                    "mdl-shadow--2dp": true
                },
                zoom: 6,
                center: [47.413220, -1.219482],
                url: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                marker: L.latLng(47.413220, -1.219482),
                path: '../assets/',
                coordinates: []
            }
        },
        methods: {
            getCoordinates: function () {
                let vue = this
                let url = config.url + 'coordinates'
                axios.get(url).then((res) => {
                    vue.coordinates = res.data.coordinates
                }).catch((err) => {
                    console.log(err)
                    console.log(err.error)
                })
            }
        },
        props: ['locationCoordinates'],
        mounted() {
            //window.componentHandler.upgradeDom()
            this.getCoordinates()
            let map = this.$refs.map.mapObject
        }
    };
</script>