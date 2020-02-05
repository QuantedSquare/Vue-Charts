<template>
    <svg :viewBox="'0 0 ' + width + ' ' + height">
        <g :transform="display">
            <slot></slot>
        </g>
    </svg>
</template>
<script>
export default {
    name: 'v-chart',
    props: {
        height: {
            type: Number,
            default: 480
        },
        width: {
            type: Number,
            default: 720
        },
        left: {
            type: Number,
            default: 50
        },
        right: {
            type: Number,
            default: 50
        },
        top: {
            type: Number,
            default: 50
        },
        bottom: {
            type: Number,
            default: 50
        }
    },
    computed: {
        display: function() {
            return 'translate(' + this.left + ',' + this.top + ')';
        }
    }
}
</script>