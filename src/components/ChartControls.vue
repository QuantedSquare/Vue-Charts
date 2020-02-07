<template>
    <v-row justify="center">
        <v-col cols="1">
            <v-range-slider class="vertical-slider" v-model="height" vertical min="0" max="480"></v-range-slider>
        </v-col>
        <v-col cols="11">
            <slot v-bind="chartProps"></slot>
        </v-col>
        <v-col cols="11">
            <v-range-slider v-model="width" min="0" max="720"></v-range-slider>
        </v-col>
    </v-row>
</template>
<script>
export default {
    name: 'chart-controls',
    data: function() {
        return {
            height: [50, 430],
            width: [50, 670]
        }
    },
    computed: {
        chartProps: function() {
            return {
                width: 720,
                height: 480,
                left: this.width[0],
                right: 720 - this.width[1],
                top: 480 - this.height[1],
                bottom: this.height[0]
            }
        }
    }
}
</script>
<style>
.vertical-slider,
.vertical-slider .v-input__slot {
    height: 100% !important;
}

.v-slider--vertical {
    height: 100%;
}
</style>