<template>
    <div class="center table animated fadeIn">
        <table class="weatherTable mdl-data-table mdl-js-data-table mdl-shadow--2dp">
            <thead>
                <tr>
                    <th class="icon mdl-data-table__cell--non-numeric">
                        <i class=" material-icons">place</i>
                    </th>
                    <th>
                        <i class="icon material-icons">brightness_5</i>
                    </th>
                    <th class="t-text">Max</th>
                    <th class="t-text">Min</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in weatherData">
                    <td class="mdl-data-table__cell--non-numeric">{{ item.location }}</td>
                    <td>{{ item.temperature.toString().substring(0,5) }}°C</td>
                    <td>{{ item.max.toString().substring(0,5) }}°C</td>
                    <td>{{ item.min.toString().substring(0,5) }}°C</td>
                </tr>
                <tr v-if="loading"></tr>
                <tr>
                    <td class="mdl-data-table__cell--non-numeric">
                        <tt-component :text="locationText"></tt-component>
                    </td>
                    <td class="mdl-data-table__cell--non-numeric">
                        <tt-component :text="temperatureText"></tt-component>
                    </td>
                    <td class="mdl-data-table__cell--non-numeric">
                        <tt-component :text="maxText"></tt-component>
                    </td>
                    <td class="mdl-data-table__cell--non-numeric">
                        <tt-component :text="minText"></tt-component>
                    </td>
                </tr>
            </tbody>

            <div class="refresh">
                <button v-on:click="getAll()" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                    <i class="material-icons">refresh</i>
                </button>
            </div>
            <div v-if="loading" class="spinner">
                <vue-simple-spinner></vue-simple-spinner>
            </div>
        </table>


    </div>
</template>

<script>
    import "../assets/main.css"
    import "../assets/table.css"
    let axios = require("axios")
    let config = require("../config.js")

    import ttComponent from "./ttComponent"

    export default {
        name: "Table",
        data() {
            return {
                loading: true,
                weatherData: [],
                locationText: "Location",
                temperatureText: "Last logged temperature",
                maxText: "Maximum temperature in the last 24 hours",
                minText: "Minimum temperature in the last 24 hours"
            };
        },
        methods: {
            getAll: function () {
                
                let vue = this
                let url = config.url + "temperatures"
                vue.loading = true
                vue.weatherData = []
                axios.get(url)
                    .then(res => {
                        vue.loading = false
                        vue.weatherData = res.data.weatherData
                    })
                    .catch(err => {
                        loading = true
                        // console.log(err.response.code)
                    })
            }
        },
        components: {
            ttComponent
        },
        mounted() {
            this.getAll();
        }
    };
</script>