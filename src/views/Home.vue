<template>
    <div class="home">
        <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
        <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
        <v-container>
            <v-row justify="center">
                <v-col cols="8">
                    <v-chart :collection="randomCollection" :right="100">
                        <v-axis axis="x"></v-axis>
                        <v-axis axis="y"></v-axis>
                        <g v-for="dataset in randomCollection">
                            <v-labels textAnchor="start"></v-labels>
                            <v-line v-bind="dataset"></v-line>
                            <v-points v-bind="dataset"></v-points>
                        </g>
                    </v-chart>
                </v-col>
                <v-col cols="8">
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
        'v-labels': Labels
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
            return new Array(length).fill().map((p, x) => {
                let xVal = isTime ? (new Date(Date.now() + (x * oneDay))) : x;

                return {
                    x: xVal,
                    y: this.randomVal(yMin, yMax),
                    label: 'Point ' + (x + 1)
                }
            });
        },
        getRandomCollection: function(nbPoints = 2, pointsLength, yMin, yMax, isTime) {
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