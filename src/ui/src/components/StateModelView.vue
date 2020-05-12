<template>
  <div>
    <h3>State model</h3>
    <svg id="stateModelView"></svg>
  </div>
</template>

<script lang="ts">
import * as d3 from 'd3';
import { Component, Prop, Vue } from "vue-property-decorator";

import { State } from '../../../common/common';
import { stateColors } from '../common/state';

const stateNodeRadius = 15;
const stateNodes = [
  {x: 60, y: 100, state: State.Healthy},
  {x: 300, y: 100, state: State.Exposed},
  {x: 540, y: 100, state: State.Infected},
  {x: 60, y: 240, state: State.Immune},
  {x: 300, y: 285, state: State.Accute},
  {x: 540, y: 240, state: State.Contagious},
  {x: 180, y: 380, state: State.IntensiveCare},
  {x: 480, y: 380, state: State.Dead},
];

const transitions = [{

}];

//TODO: Draw transitions between nodes

//TODO: Fill the node with the color of the corresponding state (extract common state colors to somewhere inside the ui part?)
//TODO: Visualize the transition parameters: probability, base duration
//TODO: Allow to change the transition parameters, listen for the changes and log updates parameters
//TODO: Draw the whole state model

//TODO: Better integration with Vue or do we really need to use D3? Can we just use Vue templates and components instead?

//TODO: Render the parameters returned by the server
//TODO: Send updated parameters to the server when restarting a simulation, save first in the Vuex state before sending
//TODO: Indicate visually that parameters have not been yet applied?

@Component
export default class StateModelView extends Vue {

  mounted() {
    const svg = d3.select('#stateModelView');

    const group = svg.selectAll('g')
      .data(stateNodes)
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.x}, ${d.y})`);

    group.append('circle')
      .attr('class', 'nodes')
      .attr('fill', d => stateColors[d.state])
      .attr('stroke', 'black')
      .attr('r', stateNodeRadius);

    group.append('text')
      .attr('dx', d => stateNodeRadius + 5)
      .attr('dy', d => 5)
      .text(d => d.state);
  }
}
</script>

<style scoped lang="stylus">
  svg
    min-width 740px
    min-height 440px
</style>