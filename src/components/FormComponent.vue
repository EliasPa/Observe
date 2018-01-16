<template>
    <div v-bind:class="classObj">
        <div v-on:click="animateAndClick()" class="formCard mdl-card mdl-shadow--2dp">
            <div class="formTitle mdl-card__title">
                <h2 class="mdl-card__title-text gray-text">
                    <i class="material-icons">location_city</i>
                    {{location}}
                </h2>
            </div>
            <div class="formText mdl-card__supporting-text gray-text">
                <form @submit.prevent="log">
                    <!-- Numeric text field, for temperature -->
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input autocomplete="off" maxlength="12" v-model="temperature" class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?"
                            id="temperature">
                        <label class="mdl-textfield__label" for="temperature">°C currently in {{location}}...</label>
                        <span class="mdl-textfield__error">Temperature should be a number!</span>
                    </div>
                </form>
            </div>
            <div class="mdl-card__menu">
                <button v-on:click="log()" class="add mdl-js-ripple-effect mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored">
                    <i class="material-icons">add</i>
                </button>
            </div>
        </div>
        <div ref="snackBar" class="mdl-js-snackbar mdl-snackbar">
            <div class="mdl-snackbar__text">Hello</div>
            <button class="mdl-snackbar__action" type="button"></button>
        </div>
    </div>
</template>




<script>
    let config = require("./../config");
    import "../assets/main.css";
    import "../assets/form.css";

    let axios = require("axios");

    export default {
        name: "Form",
        data() {
            return {
                temperature: "",
                error: "",
                classObj: {
                    center: true,
                    animated: true,
                    fadeIn: true
                }
            };
        },
        methods: {
            showMessage: function (data) {
                let snackbarContainer = this.$refs.snackBar
                snackbarContainer.MaterialSnackbar.showSnackbar(data)
            },
            log: function () {
                if (!isNaN(this.temperature) && this.temperature != "") {
                    let url = config.url;
                    let vue = this;
                    let data = {
                        location: vue.location,
                        temperature: vue.temperature
                    };

                    axios.post(url, data)
                        .then(res => {
                            // TODO.
                            if (res.data.code == 200) {
                                this.showMessage({ message: 'Temperature logged successfully! Thank you' })
                            } else {
                                this.showMessage({ message: res.data.error })
                            }
                        })
                        .catch(err => {
                            if (err && err.response.code === 501) {
                                vue.error = "Please log a valid temperature.";
                            } else if (err) {
                                vue.error = "Unhandled error.";
                            }
                        });
                    this.temperature = ""
                    this.$el.querySelector(".mdl-textfield").MaterialTextfield.change(); // removes the, sometimes problematic,'is-dirty' class from the field.
                } else {
                    this.showMessage({ message: 'Please type in a number.' })
                }
            },
            animateAndClick: function () {
                this.onClick()
            }
        },
        props: ["location", "onClick"],
        mounted() {
            window.componentHandler.upgradeDom();
        }
    };
</script>