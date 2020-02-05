<template>
    <g>
        <circle v-for="point in points" :cx="xScale(point.x)" :cy="yScale(point.y)" r="4" :fill="color" />
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
        isTime: {
            type: Boolean,
            default: false
        },
    },
    data: function() {
        // let xScale = scalePoint(),
        let xScale = this.isTime ? scaleTime() : scaleLinear(),
            yScale = scaleLinear();

        xScale.range([0, this.getWidth()]);
        // xScale.domain(this.points.map(point => point.x));
        // xScale.padding(0.5);
        xScale.domain([this.getMin('x'), this.getMax('x')]);

        yScale.range([this.getHeight(), 0]);
        yScale.domain([this.getMin('y'), this.getMax('y')]);

        return {
            xScale: xScale,
            yScale: yScale
        }
    }
}
</script>