<template>
  <div>
    <h3>State model</h3>
    <svg id="stateModelView">
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="gray" />
        </marker>
      </defs>
    </svg>
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

//TODO: Proper type?
const stateNodePositions = stateNodes.reduce((acc: {[key: string]: {x: number, y: number}}, currentStateNode) => {
  acc[currentStateNode.state.toString()] = {x: currentStateNode.x, y: currentStateNode.y};
  return acc;
}, {});

const stateTransitions = [
  {
    from: State.Exposed,
    to: State.Infected
  },
  {
    from: State.Exposed,
    to: State.Healthy
  },
  {
    from: State.Infected,
    to: State.Contagious
  },
  {
    from: State.Contagious,
    to: State.Accute
  },
  {
    from: State.Accute,
    to: State.Immune
  },
  {
    from: State.Accute,
    to: State.IntensiveCare
  },
  {
    from: State.Contagious,
    to: State.Immune
  },
  {
    from: State.IntensiveCare,
    to: State.Immune
  },
  {
    from: State.IntensiveCare,
    to: State.Dead
  },
  {
    from: State.Immune,
    to: State.Healthy
  }
];

//TODO: Draw transitions between nodes

//TODO: Draw separate special transition from healthy to exposed (happens due to an outside interference)

//TODO: Fill the node with the color of the corresponding state (extract common state colors to somewhere inside the ui part?) - OK


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

    const nodeGroup = svg.selectAll('g')
      .data(stateNodes)
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.x}, ${d.y})`);

    nodeGroup.append('circle')
      .attr('class', 'nodes')
      .attr('fill', d => stateColors[d.state])
      .attr('stroke', 'black')
      .attr('r', stateNodeRadius);

    nodeGroup.append('text')
      .attr('dx', d => stateNodeRadius + 5)
      .attr('dy', d => 5)
      .text(d => d.state);

    //<line x1="295" y1="50" x2="95" y2="75" stroke="#000" stroke-width="5" marker-end="url(#arrow)" />
    const arrow = svg.selectAll('line')
      .data(stateTransitions.map(({from, to}) => {
        const fromPosition = stateNodePositions[from];
        const toPosition = stateNodePositions[to];
        let x1 = fromPosition.x;
        let y1 = fromPosition.y;
        let x2 = toPosition.x;
        let y2 = toPosition.y;

        const angle = Math.atan((y2 - y1)/(x2 - x1));

        //FIXME: Fix the computation so that all the arrows are displayed with the correct margin
        const xMargin = Math.cos(angle) * stateNodeRadius;
        const yMargin = Math.sin(angle) * stateNodeRadius;

        if (x1 < x2) {
          x1 = x1 + xMargin;
          x2 = x2 - xMargin;
        } else {
          x1 = x1 - xMargin;
          x2 = x2 + xMargin;
        }

        if (y1 < y2) {
          y1 = y1 + yMargin;
          y2 = y2 - yMargin;
        } else {
          y1 = y1 - yMargin;
          y2 = y2 + yMargin;
        }

        return {
          x1, x2, y1, y2
        };
      }))
      .enter()
      .append('line')
      .attr('x1', d => d.x1)
      .attr('y1', d => d.y1)
      .attr('x2', d => d.x2)
      .attr('y2', d => d.y2)
      .attr('stroke', 'gray')
      .attr('stroke-width', '2')
      .attr('marker-end', 'url(#arrow)');
  }
}
</script>

<style scoped lang="stylus">
  svg
    min-width 740px
    min-height 440px
</style>