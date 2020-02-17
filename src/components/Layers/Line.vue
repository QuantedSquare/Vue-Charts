<template>
    <g>
        <path :style="lineStyle" :d="lineDrawer(points)"></path>
        <slot></slot>
    </g>
</template>
<script>
import { scaleLinear, scaleTime, scalePoint, min, max } from 'd3'
import * as shapes from 'd3-shape'
import Layer from '@/components/Layers/Layer.js'

export default {
    name: 'v-line',
    mixins: [Layer],
    props: {
        curve: {
            type: String,
            default: 'curveLinear'
        }
    },
    data: function() {
        // console.log(this);

        // let xScale = scalePoint(),
        let xScale = this.isTime ? scaleTime() : scaleLinear(),
            yScale = scaleLinear();

        let yMax = this.getMax('y');

        let lineDrawer = shapes.line()
            .x((d) => xScale(d.x))
            .y((d) => yScale(d.y))
            .curve(shapes[this.curve]);

        xScale.range([0, this.getWidth()]);
        // xScale.domain(this.points.map(point => point.x));
        // xScale.padding(0.5);
        xScale.domain([this.getMin('x'), this.getMax('x')]);

        yScale.range([this.getHeight(), 0]);
        yScale.domain([this.getMin('y'), yMax]);

        return {
            xScale: xScale,
            yScale: yScale,
            lineDrawer: lineDrawer
        }
    },
    computed: {
        lineStyle: function() {
            return {
                stroke: this.color,
                fill: 'none',
                'stroke-width': '1.5px'
            }
        }
    }
}
</script>