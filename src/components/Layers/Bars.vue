<template>
    <g>
        <rect class="bar" :fill="color" v-for="point in renderedBars" :x="xScale(point.x)" :y="yScale(point.y)" :width="xScale.bandwidth()" :height="positiveOrZero(getHeight() - yScale(point.y))"></rect>
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

        let yMax = this.getMax('y');

        xScale.range([0, this.getWidth()]);
        xScale.domain(this.points.map(point => point.x));
        xScale.padding(0.2);

        yScale.range([this.getHeight(), 0]);
        yScale.domain([this.getMin('y'), yMax]);

        return {
            xScale: xScale,
            yScale: yScale,
            renderedBars: this.points
        }
    },
    watch: {
        points: function() {
            this.xScale.domain(this.points.map(point => point.x));
            this.yScale.domain([this._yMin, this._yMax]);
        }
    }
}
</script>