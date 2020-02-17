<template>
    <g>
        <path :d="geoDrawer(getFeatures())" :style="mapStyle"></path>
        <slot></slot>
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
        }
    },
    data: function() {
        let geoProjection = projections[this.projection](),
            geoDrawer = geoPath();

        // console.log(this.getFeatures(), this.width, this.height);

        geoProjection.fitSize([this.getWidth(), this.getHeight()], this.getFeatures());
        // geoProjection.rotate([, 0, 0])
        // console.log(geoProjection.rotate());


        geoDrawer.projection(geoProjection);

        return {
            geoDrawer: geoDrawer,
            geoProjection: geoProjection
        }
    },
    methods: {
        getFeatures: function() {
            return topojson.feature(this.topology, 'FRA');
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
            this.geoProjection.fitSize([this.getWidth(), this.getHeight()], this.getFeatures());
            this.$forceUpdate();
        },
        height: function() {
            this.geoProjection.fitSize([this.getWidth(), this.getHeight()], this.getFeatures());
            this.$forceUpdate();
        }
    }
}
</script>