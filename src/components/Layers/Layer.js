import { min, max } from 'd3'

export default {
    props: {
        points: {
            type: Array
            // required: true
        },
        label: String,
        isTime: {
            type: Boolean,
            default: function() {
                return this.$parent.isTime || false;
            }
        },
        xMin: {
            type: [Number, Date],
            default: function() {
                return this.$parent._xMin
            }
        },
        xMax: {
            type: [Number, Date],
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
            if (!this.isMap) {
                if (this.isNumber(this.$parent['_' + axis + 'Max'])) return this.$parent['_' + axis + 'Max'];

                let fixed = typeof(this[axis + 'Max']) == 'number';
                if (!fixed && this[axis + 'Max']) fixed = this[axis + 'Max'].constructor.name == 'Date';

                if (!fixed) {
                    let maxVal = max(this.points, point => point[axis]);
                    if (this.isTime) maxVal = new Date(maxVal);

                    return maxVal;
                } else return this[axis + 'Max'];
            } else return 0;
        },
        getMin: function(axis) {
            if (!this.isMap) {
                if (this.isNumber(this.$parent['_' + axis + 'Min'])) return this.$parent['_' + axis + 'Min'];

                let fixed = typeof(this[axis + 'Min']) == 'number';
                if (!fixed && this[axis + 'Min']) fixed = this[axis + 'Min'].constructor.name == 'Date';

                if (!fixed) {
                    let minVal = min(this.points, point => point[axis]);
                    if (this.isTime) minVal = new Date(minVal);

                    return minVal;
                } else return this[axis + 'Min'];
            } else return 0;
        },
        positiveOrZero: function(nb) {
            return nb > 0 ? nb : 0;
        },
        isNumber: function(nb) {
            return typeof(nb) == 'number';
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
        // points: function() {
        //     console.log(this.getMin('y'), this.getMax('y'));
        //     if (this.xScale) this.xScale.domain([this.getMin('x'), this.getMax('x')]);
        //     if (this.yScale) this.yScale.domain([this.getMin('y'), this.getMax('y')]);
        //     this.$forceUpdate();
        // },
        _xMax: function() {
            if (this.xScale) this.xScale.domain([this._xMin, this._xMax]);
            this.$forceUpdate();
        },
        _xMin: function() {
            if (this.xScale) this.xScale.domain([this._xMin, this._xMax]);
            this.$forceUpdate();
        },
        _yMax: function() {
            if (this.yScale) this.yScale.domain([this._yMin, this._yMax]);
            this.$forceUpdate();
        },
        _yMin: function() {
            if (this.yScale) this.yScale.domain([this._yMin, this._yMax]);
            this.$forceUpdate();
        },
        width: function() {
            if (this.xScale) {
                this.xScale.range([0, this.width]);
                this.$forceUpdate();
            }
        },
        height: function() {
            if (this.yScale) {
                this.yScale.range([this.height, 0]);
                this.$forceUpdate();
            }
        }
    }
}