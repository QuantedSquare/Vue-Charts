import { min, max } from 'd3'

export default {
    props: {
        points: {
            type: Array,
            required: true
        },
        xMin: Number,
        xMax: Number,
        yMin: Number,
        yMax: Number,
        color: {
            type: String,
            default: '#FF1278'
        }
    },
    methods: {
        getWidth: function() {
            return this.$parent.width - this.$parent.right - this.$parent.left;
        },
        getHeight: function() {
            return this.$parent.height - this.$parent.top - this.$parent.bottom;
        },
        getMax: function(axis) {
            let fixed = typeof(this[axis + 'Max']) == 'number';

            return fixed ? this[axis + 'Max'] : max(this.points, point => point[axis])
        },
        getMin: function(axis) {
            let fixed = typeof(this[axis + 'Min']) == 'number';

            return fixed ? this[axis + 'Min'] : min(this.points, point => point[axis])
        },
        positiveOrZero: function(nb) {
            return nb > 0 ? nb : 0;
        }
    },
    computed: {
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
        }
    },
    watch: {
        '$parent.width': function() {
            this.xScale.range([0, this.getWidth()]);
        },
        '$parent.height': function() {
            this.yScale.range([this.getHeight(), 0]);
            this.drawYAxis();
        }
    }
}