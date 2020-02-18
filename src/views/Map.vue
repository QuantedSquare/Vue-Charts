<template>
    <div class="map">
        <v-container>
            <v-row justify="center">
                <v-col cols="2">
                    <v-switch v-model="showProvinces" label="Provinces"></v-switch>
                </v-col>
                <v-col cols="2">
                    <v-switch v-model="showCities" label="Cities"></v-switch>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-col cols="8" md="8" lg="8">
                    <ChartControls>
                        <template v-slot:default="chartOptions">
                            <v-chart v-bind="chartOptions">
                                <v-map :topology="provinces" color="grey" featuresKey="FRA" :display="showProvinces">
                                    <v-map :topology="borders" color="black" featuresKey="FRA_country"></v-map>
                                    <v-points v-show="showCities" :points="cities" isMap v-on:hover="hoverPoint" pointer>
                                    </v-points>
                                </v-map>
                            </v-chart>
                        </template>
                    </ChartControls>
                </v-col>
                <v-col cols="4">
                    <v-chart :collection="randomCollection">
                        <v-axis axis="x" isTime></v-axis>
                        <v-axis axis="y"></v-axis>
                        <g v-for="dataset in randomCollection">
                            <v-line v-bind="dataset" curve="curveMonotoneX"></v-line>
                            <v-points v-bind="dataset" isTime>
                            </v-points>
                        </g>
                    </v-chart>
                    <v-chart>
                        <v-bars :yMin="0" :points="randomPoints">
                            <v-axis axis="x"></v-axis>
                            <v-labels text="y"></v-labels>
                        </v-bars>
                    </v-chart>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import ChartControls from '@/components/ChartControls.vue'
import Chart from '@/components/Chart.vue'
import BarsLayer from '@/components/Layers/Bars.vue'
import LineLayer from '@/components/Layers/Line.vue'
import MapLayer from '@/components/Layers/Map.vue'
import PointsLayer from '@/components/Layers/Points.vue'
import AxisLayer from '@/components/Layers/Axis.vue'
import LabelsLayer from '@/components/Layers/Labels.vue'

import FRA from '@/assets/TopoJSON/FRA.json'
import FRA_borders from '@/assets/TopoJSON/FRA_country.json'
import FRA_cities from '@/assets/fr_data.json'

export default {
    name: 'home',
    components: {
        // HelloWorld
        'v-chart': Chart,
        'v-bars': BarsLayer,
        'v-map': MapLayer,
        'v-line': LineLayer,
        'v-points': PointsLayer,
        'v-axis': AxisLayer,
        'v-labels': LabelsLayer,
        ChartControls
    },
    data: function() {
        let provinces = FRA,
            borders = FRA_borders;
        // roads = roads,
        // urbanAreas = urban_areas;

        provinces.objects.FRA.geometries = provinces.objects.FRA.geometries.filter(g => {
            // console.log(g.properties);
            return g.properties.type_en == 'Metropolitan department';
        });

        return {
            provinces: provinces,
            borders: borders,
            cities: FRA_cities.map(city => {
                return {
                    x: city.lng,
                    y: city.lat,
                    label: city.name
                }
            }),
            randomPoints: this.getRandomPoints(),
            randomCollection: this.getRandomCollection(),
            showProvinces: false,
            showCities: true
        }
    },
    methods: {
        randomVal: function(min, max) {
            return min + Math.round(Math.random() * (max - min));
        },
        getRandomPoints: function(length = 10, yMin = 0, yMax = 10, isTime) {
            let oneDay = 1000 * 60 * 60 * 24;

            return new Array(length).fill().map((p, x) => {
                let xVal = isTime ? (new Date(Date.now() + (x * oneDay))) : x;

                return {
                    x: xVal,
                    y: this.randomVal(yMin, yMax),
                    label: 'Point ' + (x + 1)
                }
            });
        },
        getRandomCollection: function(nbPoints = 2, pointsLength, yMin, yMax, isTime = true) {
            return new Array(nbPoints).fill().map((l, i) => {
                return {
                    points: this.getRandomPoints(pointsLength, yMin, yMax, isTime),
                    label: 'Collection ' + (i + 1)
                }
            });
        },
        hoverPoint: function(point) {
            this.randomPoints = this.getRandomPoints();
            this.randomCollection = this.getRandomCollection();
        }
    },
    computed: {}
}
</script>