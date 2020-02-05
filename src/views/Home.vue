<template>
    <div class="home">
        <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
        <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
        <v-container>
            <v-row justify="center">
                <v-col cols="8">
                    <v-chart>
                        <v-bars :points="randomPoints"></v-bars>
                        <v-line :points="randomPoints"></v-line>
                        <v-points :points="randomPoints"></v-points>
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

export default {
    name: 'home',
    components: {
        // HelloWorld
        'v-chart': Chart,
        'v-bars': Bars,
        'v-line': Line,
        'v-points': Points
    },
    data: function() {
        return {
            randomPoints: this.getRandomPoints()
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
        }
    }
}
</script>