// Import vue component
import Chart from '../src/components/Chart.vue'

// Graphic Layers
import Bars from '../src/components/Layers/Bars.vue'
import Lines from '../src/components/Layers/Line.vue'
import Points from '../src/components/Layers/Points.vue'

// Text Layers
import Axis from '../src/components/Layers/Axis.vue'
import Labels from '../src/components/Layers/Labels.vue'

// Declare install function executed by Vue.use()
export function install(Vue) {
    if (install.installed) return;
    install.installed = true;

    Vue.component(Chart.name, Chart);

    // Graphic Layers
    Vue.component(Bars.name, Bars);
    Vue.component(Line.name, Line);
    Vue.component(Points.name, Points);
    // Text Layers
    Vue.component(Axis.name, Axis);
    Vue.component(Labels.name, Labels);
}

// Create module definition for Vue.use()
const plugin = {
    install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
}
if (GlobalVue) {
    GlobalVue.use(plugin);
}

// To allow use as module(npm / webpack / etc.) export component
export default {
    install,
    Chart,
    Bars,
    Line,
    Points,
    Axis,
    Labels
};