<template>
    <g>
        <path v-if="display" :d="geoDrawer(getFeatures())" :style="mapStyle"></path>
        <slot v-bind="{geoProjection}"></slot>
    </g>
</template>
<script>
import { geoPath } from 'd3'
import * as projections from 'd3-geo'

import * as topojson from 'topojson-client'
import Layer from '@/components/Layers/Layer.js'

export default {
    name: 'v-map',
    mixins: [Layer],
    props: {
        topology: Object,
        projection: {
            type: String,
            default: 'geoOrthographic'
        },
        featuresKey: {
            required: true,
            type: String
        },
        display: {
            type: Boolean,
            default: true
        }
    },
    data: function() {
        let geoProjection = this.$parent.geoProjection || projections[this.projection](),
            geoDrawer = geoPath();

        // console.log(this.getFeatures(), this.width, this.height);

        if (!this.$parent.geoProjection) geoProjection.fitSize([this.getWidth(), this.getHeight()], this.getFeatures());
        // geoProjection.rotate([, 0, 0])
        // console.log(geoProjection.rotate());


        geoDrawer.projection(geoProjection);

        return {
            geoDrawer: geoDrawer,
            geoProjection: geoProjection,
            isMap: true
        }
    },
    methods: {
        getFeatures: function() {
            return topojson.feature(this.topology, this.featuresKey);
        }
    },
    computed: {
        mapStyle: function() {
            return {
                stroke: this.color,
                fill: 'none',
                'stroke-width': '0.5px'
            }
        }
    },
    watch: {
        width: function() {
            if (!this.$parent.geoProjection) this.geoProjection.fitSize([this.getWidth(), this.getHeight()], this.getFeatures());
            this.$forceUpdate();
        },
        height: function() {
            if (!this.$parent.geoProjection) this.geoProjection.fitSize([this.getWidth(), this.getHeight()], this.getFeatures());
            this.$forceUpdate();
        }
    }
}
</script>