import { min, max } from 'd3'

export default {
    props: {
        points: {
            type: Array
            // required: true
        },
        label: String,
        xMin: {
            type: Number,
            default: function() {
                return this.$parent._xMin
            }
        },
        xMax: {
            type: Number,
            default: function() {
                return this.$parent._xMax
            },
        },
        yMin: {
            type: Number,
            default: function() {
                return this.$parent._yMin
            },
        },
        yMax: {
            type: Number,
            default: function() {
                return this.$parent._yMax
            },
        },
        color: {
            type: String,
            default: function() {
                if (this.$parent.colorScale && this.label) {
                    return this.$parent.colorScale(this.label);
                } else return 'rgb(12, 204, 249)';
            }
        }
    },
    methods: {
        getWidth: function() {
            return this.$parent.width - (this.$parent.right || 0) - (this.$parent.left || 0);
        },
        getHeight: function() {
            return this.$parent.height - (this.$parent.top || 0) - (this.$parent.bottom || 0);
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
        },
        width: function() {
            return this.getWidth();
        },
        height: function() {
            return this.getHeight();
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