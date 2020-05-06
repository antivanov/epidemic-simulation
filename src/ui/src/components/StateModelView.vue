<template>
  <svg id="stateModelView"></svg>
</template>

<script lang="ts">
import * as d3 from 'd3';

import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class StateModelView extends Vue {

  mounted() {
    //TODO: Better integration with Vue or do we really need to use D3? Can we just use Vue templates and components instead?
    const svg = d3.select('#stateModelView');

    const circle = svg.selectAll('circle')
       .data([32, 57, 112, 293]);

    const circleEnter = circle.enter().append('circle');

    circleEnter.attr('cy', 60);
    circleEnter.attr('cx', (d, i) => i * 100 + 30);
    circleEnter.attr('r', d => Math.sqrt(d));
  }
}
</script>

<style scoped lang="stylus"></style>