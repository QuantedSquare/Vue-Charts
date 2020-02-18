<template>
    <g>
        <line :x1="0" :x2="axis == 'x' ? getWidth() : 0" :y1="getHeight()" :y2="axis == 'y' ? 0 : getHeight()" stroke="black"></line>
        <g v-for="tick in ticks()" :transform="getTickPosition(tick)">
            <line :x1="0" :x2="axis == 'x' ? 0 : -5" :y1="0" :y2="axis == 'y' ? 0 : 5" stroke="black"></line>
            <text :x="axis == 'x' ? 0 : -7" :y="axis == 'y' ? 5 : 20" :text-anchor="axis == 'x' ? 'middle' : 'end'">{{isTime ? ticksFormat(tick) : tick}}</text>
        </g>
    </g>
</template>
<script>
import { scaleLinear, scaleTime, min, max } from 'd3'
import * as shapes from 'd3-shape'
import Layer from '@/components/Layers/Layer.js'

export default {
    name: 'v-axis',
    mixins: [Layer],
    props: {
        axis: {
            type: String,
            required: true
        }
    },
    data: function() {
        let scale = this.getParentScale();

        if (!scale) {
            scale = this.isTime ? scaleTime() : scaleLinear();

            if (this.axis == 'x') {
                scale.range([0, this.getWidth()]);
            } else scale.range([this.getHeight(), 0]);

            scale.domain([this.getMin(this.axis), this.getMax(this.axis)]);
        }

        return {
            scale: scale,
            ticksFormat: scale.tickFormat ? scale.tickFormat() : undefined
        }
    },
    methods: {
        getParentScale: function() {
            return this.$parent[this.axis + 'Scale'];
        },
        getTickPosition: function(tick) {
            let margin = 0;

            if (this.scale.bandwidth) {
                margin = this.scale.bandwidth() / 2;
            }

            let x = this.axis == 'x' ? this.scale(tick) + margin : 0,
                y = this.axis == 'y' ? this.scale(tick) : this.getHeight();

            return `translate(${x}, ${y})`
        },
        ticks: function() {
            if (this.scale.ticks) {
                return this.scale.ticks();
            } else return this.scale.domain();
        },
        updateDomain: function() {
            if (!this.getParentScale()) {
                this.scale.domain([this.getMin(this.axis), this.getMax(this.axis)]);
            }

            if (this.scale.ticksFormat) this.ticksFormat = this.scale.ticksFormat();
            this.$forceUpdate();
        }
    },
    watch: {
        _xMax: function() { this.updateDomain() },
        _xMin: function() { this.updateDomain() },
        _yMax: function() { this.updateDomain() },
        _yMin: function() { this.updateDomain() }
    }
}
</script>