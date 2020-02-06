<template>
    <g>
        <g v-for="point in labels" :transform="getLabelPosition(point)">
            <text :x="textAnchor == 'start' ? 10 : 0" :y="textAnchor == 'start' ? 5 : -5" :text-anchor="textAnchor">{{point[text]}}</text>
        </g>
    </g>
</template>
<script>
import { scaleLinear, scaleTime, min, max } from 'd3'
import * as shapes from 'd3-shape'
import Layer from '@/components/Layers/Layer.js'

export default {
    name: 'v-labels',
    mixins: [Layer],
    props: {
        isTime: {
            type: Boolean,
            default: false
        },
        curve: {
            type: String,
            default: 'curveLinear'
        },
        text: {
            type: String,
            default: 'label'
        },
        textAnchor: {
            type: String,
            default: 'middle'
        }
    },
    methods: {
        getParentScale: function(axis) {
            return this.$parent[axis + 'Scale'];
        },
        getLabelPosition: function(point) {
            let xMargin = 0;

            if (this.xScale.bandwidth) {
                xMargin = this.xScale.bandwidth() / 2;
            }

            let x = this.xScale(point.x) + xMargin,
                y = this.yScale(point.y);

            return `translate(${x}, ${y})`
        }
    },
    computed: {
        xScale: function() {
            let parentScale = this.getParentScale('x');

            if (!parentScale) {
                let scale = this.isTime ? scaleTime() : scaleLinear();

                scale.range([0, this.getWidth()]);
                scale.domain([this.getMin('x'), this.getMax('x')]);

                return scale;
            } else return parentScale;
        },
        yScale: function() {
            let parentScale = this.getParentScale('y');

            if (!parentScale) {
                let scale = scaleLinear();

                scale.range([this.getHeight(), 0]);
                scale.domain([this.getMin('y'), this.getMax('y')]);

                return scale;
            } else return parentScale;
        },
        labels: function() {
            if (this.$parent.collection) {
                return this.$parent.collection.map(d => {
                    return {
                        x: this._xMax,
                        y: d.points[d.points.length - 1].y,
                        label: d.label
                    }
                });
            } else return this.$parent.points;
        }
    }
}
</script>