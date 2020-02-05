<template>
    <g>
        <line :x1="axis == 'x' ? scale(_xMin) : 0" :x2="axis == 'x' ? getWidth() : 0" :y1="axis == 'y' ? scale(_yMin) : getHeight()" :y2="axis == 'y' ? scale(_yMax) : getHeight()" stroke="black"></line>
        <!-- <text class="lines-layer" :x="chartData.$data.xScale(tick)" :y="chartData.$data.yScale(chartData._yMin) + 15" text-anchor="middle">{{tick}}</text> -->
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
        },
        isTime: {
            type: Boolean,
            default: false
        },
        curve: {
            type: String,
            default: 'curveLinear'
        }
    },
    methods: {
        getParentScale: function() {
            return this.$parent[this.axis + 'Scale'];
        }
    },
    computed: {
        scale: function() {
            console.log(this);

            let parentScale = this.getParentScale();

            if (!parentScale) {
                let scale = this.isTime ? scaleTime() : scaleLinear();

                if (this.axis == 'x') {
                    scale.range([0, this.getWidth()]);
                } else scale.range([this.getHeight(), 0]);

                scale.domain([this.getMin(this.axis), this.getMax(this.axis)]);

                return scale;
            } else return parentScale;
        }
    }
}
</script>