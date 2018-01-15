<template>
    <div>
        <div :id="text" class="tooltip-icon icon material-icons">info</div>
        <div class="mdl-tooltip" :for="text">
            {{ partOne }}
            <br>
            {{ partTwo }}
        </div>
    </div>
</template>

<script>
    import '../assets/tooltip.css'

    export default {
        name: "Table",
        data() {
            return {
                classObj: {
                },
                partOne: '',
                partTwo: ''
            };
        },
        methods: {
            setText: function () {
                let split = this.text.split(' ')
                if (split.length > 1) {
                    let first = split.splice(0, split.length / 2)
                    let second = split.splice(0, split.length)
                    this.partOne = first.join(' ')
                    this.partTwo = second.join(' ')
                } else {
                    this.partOne = this.text
                }
            }
        },
        props: ['text'],
        mounted() {
            this.setText()
        }
    };
</script>

<style>
</style>