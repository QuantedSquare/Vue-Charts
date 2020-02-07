<template>
    <svg :viewBox="'0 0 ' + width + ' ' + height">
        <g :transform="display">
            <slot></slot>
        </g>
    </svg>
</template>
<script>
import { min, max, scaleOrdinal, interpolateRgbBasis, quantize } from 'd3'

export default {
    name: 'v-chart',
    props: {
        isTime: {
            type: Boolean,
            default: false
        },
        height: {
            type: Number,
            default: 480
        },
        width: {
            type: Number,
            default: 720
        },
        left: {
            type: Number,
            default: 50
        },
        right: {
            type: Number,
            default: 50
        },
        top: {
            type: Number,
            default: 50
        },
        bottom: {
            type: Number,
            default: 50
        },
        collection: Array,
        colors: {
            type: Array,
            default: function() {
                return ['rgb(12, 204, 249)', 'rgb(255, 18, 120)']
            }
        },
        xMin: Number,
        xMax: Number,
        yMin: Number,
        yMax: Number
    },
    methods: {
        getMax: function(axis) {
            let maxVal = undefined,
                fixed = typeof(this[axis + 'Max']) == 'number';

            if (fixed) {
                maxVal = this[axis + 'Max'];
            } else if (this.collection && this.collection.length) {
                maxVal = max(this.collection.map(dataset => max(dataset.points, point => point[axis])));
            }

            return maxVal;
        },
        getMin: function(axis) {
            let minVal = undefined,
                fixed = typeof(this[axis + 'Min']) == 'number';

            if (fixed) {
                minVal = this[axis + 'Min'];
            } else if (this.collection && this.collection.length) {
                minVal = min(this.collection.map(dataset => min(dataset.points, point => point[axis])));

            }

            return minVal;
        },
    },
    computed: {
        display: function() {
            return 'translate(' + this.left + ',' + this.top + ')';
        },
        _xMax: function() {
            return this.getMax('x');
        },
        _xMin: function() {
            return this.getMin('x');
        },
        _yMax: function() {
            return this.getMax('y');
        },
        _yMin: function() {
            return this.getMin('y');
        },
        colorScale: function() {
            if (this.colors && this.collection) {
                let colorInterpolator = interpolateRgbBasis(this.colors);

                let quantizeLength = this.collection.length == 1 ? 2 : this.collection.length;

                return scaleOrdinal().domain(this.collection.map(dataset => dataset.label))
                    .range(quantize(t => colorInterpolator(t), quantizeLength));
            } else return undefined;
        }
    }
}
</script>