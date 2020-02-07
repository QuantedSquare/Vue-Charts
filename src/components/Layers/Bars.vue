<template>
    <g>
        <rect :fill="color" v-for="point in points" :x="xScale(point.x)" :y="yScale(point.y)" :width="xScale.bandwidth()" :height="positiveOrZero(getHeight() - yScale(point.y))"></rect>
        <slot></slot>
    </g>
</template>
<script>
import { scaleLinear, scaleBand, min, max } from 'd3'
import Layer from '@/components/Layers/Layer.js'

export default {
    name: 'v-bars',
    mixins: [Layer],
    data: function() {
        let xScale = scaleBand(),
            yScale = scaleLinear();

        // let yMax = this.getMax('y');

        xScale.range([0, this.getWidth()]);
        xScale.domain(this.points.map(point => point.x));
        xScale.padding(0.2);

        yScale.range([this.getHeight(), 0]);
        yScale.domain([this.getMin('y'), this.getMax('y')]);

        return {
            xScale: xScale,
            yScale: yScale,
        }
    }
}
</script>