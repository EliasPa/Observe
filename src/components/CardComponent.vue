<template>
    <div class="center animated fadeIn">
        <div v-bind:class="classObj">
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text white-text">{{ location }} {{ temp.toString().substring(0,5) }}°C</h2>
            </div>
            <div class="mdl-card__supporting-text gray-text">
                {{ weather_text }}
            </div>
        </div>
    </div>
</template>

<script>
import "../assets/main.css";
import "../assets/card.css";

export default {
  name: "Table",
  data() {
    return {
      weather_text: "",
      classObj: {
        hotCard: true,
        coldCard: false,
        "mdl-card": true,
        "mdl-shadow--2dp": true
      }
    };
  },
  methods: {
    setText: function(location) {
      if (location != "" && this.temp) {
        let hotOrNot = "coldest";
        if (this.isHot) {
          hotOrNot = "hottest";
        }
        this.weather_text =
          location + " is the " + hotOrNot + " location at the moment!";
      } else {
          this.weather_text = 'Loading...'
      }
    }
  },
  props: ["location", "temp", "isHot"],
  watch: {
    location: function(value) {
      this.setText(value);
    }
  },
  mounted: function() {
    this.classObj.hotCard = this.isHot;
    this.classObj.coldCard = !this.isHot;
    this.setText(this.location);
  }
};
</script>

<style>

</style>