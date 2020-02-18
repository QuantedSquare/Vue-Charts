<template>
    <div class="home">
        <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
        <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
        <v-container>
            <v-row justify="center">
                <v-col cols="10" md="8" lg="7">
                    <ChartControls>
                        <template v-slot:default="chartOptions">
                            <v-chart v-bind="chartOptions" :collection="randomCollection">
                                <v-map :topology="mapData" featuresKey="FRA">
                                </v-map>
                            </v-chart>
                        </template>
                    </ChartControls>
                </v-col>
                <v-col cols="10" md="8" lg="7">
                    <ChartControls>
                        <template v-slot:default="chartOptions">
                            <v-chart v-bind="chartOptions" :collection="randomCollection">
                                <v-axis axis="x" isTime></v-axis>
                                <v-axis axis="y"></v-axis>
                                <g v-for="dataset in randomCollection">
                                    <v-labels textAnchor="start"></v-labels>
                                    <v-line v-bind="dataset"></v-line>
                                    <v-points v-bind="dataset" isTime>
                                        <v-labels text="y"></v-labels>
                                    </v-points>
                                </g>
                            </v-chart>
                        </template>
                    </ChartControls>
                </v-col>
                <v-col cols="10" md="8" lg="7">
                    <ChartControls>
                        <template v-slot:default="chartOptions">
                            <v-chart v-bind="chartOptions">
                                <v-bars :yMin="0" :points="randomPoints">
                                    <v-axis axis="x"></v-axis>
                                    <v-labels text="y"></v-labels>
                                </v-bars>
                            </v-chart>
                        </template>
                    </ChartControls>
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
        let mapData = FRA;

        mapData.objects.FRA.geometries = mapData.objects.FRA.geometries.filter(g => {
            // console.log(g.properties);
            return g.properties.type_en == 'Metropolitan department';
        });

        return {
            randomPoints: this.getRandomPoints(),
            randomCollection: this.getRandomCollection(),
            mapData: FRA
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
        }
    },
    computed: {}
}
</script>