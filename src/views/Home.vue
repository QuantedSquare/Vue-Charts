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
                                <v-axis axis="x" isTime></v-axis>
                                <v-axis axis="y"></v-axis>
                                <g v-for="dataset in randomCollection">
                                    <v-labels textAnchor="start"></v-labels>
                                    <v-line v-bind="dataset"></v-line>
                                    <v-points v-bind="dataset" isTime>
                                        <!-- <v-labels text="y"></v-labels> -->
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
import Bars from '@/components/Layers/Bars.vue'
import Line from '@/components/Layers/Line.vue'
import Points from '@/components/Layers/Points.vue'
import Axis from '@/components/Layers/Axis.vue'
import Labels from '@/components/Layers/Labels.vue'


export default {
    name: 'home',
    components: {
        // HelloWorld
        'v-chart': Chart,
        'v-bars': Bars,
        'v-line': Line,
        'v-points': Points,
        'v-axis': Axis,
        'v-labels': Labels,
        ChartControls
    },
    data: function() {
        return {
            randomPoints: this.getRandomPoints(),
            randomCollection: this.getRandomCollection()
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
    }
}
</script>