<template>
  <svg id="stateModelView"></svg>
</template>

<script lang="ts">
import * as d3 from 'd3';

import { Component, Prop, Vue } from "vue-property-decorator";

const stateNodeRadius = 15;
const stateNodes = [
  {x: 30, y: 50, label: 'Healthy'},
  {x: 150, y: 50, label: 'Exposed'},
  {x: 60, y: 120, label: 'Immune'}
];

@Component
export default class StateModelView extends Vue {

  mounted() {
    //TODO: Better integration with Vue or do we really need to use D3? Can we just use Vue templates and components instead?
    const svg = d3.select('#stateModelView');

    const group = svg.selectAll('g')
      .data(stateNodes)
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.x}, ${d.y})`);

    group.append('circle')
      .attr('class', 'nodes')
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('r', stateNodeRadius);

    group.append('text')
      .attr('dx', d => stateNodeRadius + 5)
      .attr('dy', d => 5)
      .text(d => d.label);
  }
}
</script>

<style scoped lang="stylus"></style>