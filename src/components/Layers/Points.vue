<template>
    <g>
        <circle v-for="point in points" :cx="center(point)[0]" :cy="center(point)[1]" :r="r" :fill="color" @mouseover="$emit('hover', point)" :style="poinStyle" />
        <slot></slot>
    </g>
</template>
<script>
import { scaleLinear, scaleTime, scalePoint } from 'd3'
import Layer from '@/components/Layers/Layer.js'

export default {
    name: 'v-points',
    mixins: [Layer],
    props: {
        r: {
            type: Number,
            default: 4
        },
        isMap: Boolean,
        pointer: Boolean
    },
    data: function() {
        let xScale = this.isTime ? scaleTime() : scaleLinear(),
            yScale = scaleLinear();

        xScale.range([0, this.getWidth()]);
        xScale.domain([this.getMin('x'), this.getMax('x')]);

        yScale.range([this.getHeight(), 0]);
        yScale.domain([this.getMin('y'), this.getMax('y')]);

        return {
            xScale: xScale,
            yScale: yScale,
        }
    },
    methods: {
        center: function(point) {
            if (this.isMap) {
                return this.$parent.geoProjection([point.x, point.y])
            } else return [this.xScale(point.x), this.yScale(point.y)]
        }
    },
    computed: {
        poinStyle: function() {
            return {
                cursor: this.pointer ? 'pointer' : 'default'
            }
        }
    }
}
</script>