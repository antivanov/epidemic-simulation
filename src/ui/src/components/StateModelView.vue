<template>
  <div>
    <h3>State model</h3>
    <svg id="stateModelView">
      <defs>
        <marker id="transitionArrow" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M 0 0 L 0 6 L 9 3 z" fill="gray" />
        </marker>
        <marker id="externalTransitionArrow" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M 0 0 L 0 6 L 9 3 z" fill="red" />
        </marker>
      </defs>
    </svg>
  </div>
</template>

<script lang="ts">
import * as d3 from 'd3';
import { Component, Prop, Vue } from "vue-property-decorator";

import { State } from '../../../common/common';
import { StateMachine, TransitionsFromState, ForcedTransitionToState, RandomTransitionToState } from '../../../common/state.machine';

import { stateColors } from '../common/state';

const stateTransitionCurvature = 40;
const stateNodeRadius = 15;
const stateNodes = [
  {x: 140, y: 100, state: State.Healthy},
  {x: 380, y: 100, state: State.Exposed},
  {x: 620, y: 100, state: State.Infected},
  {x: 140, y: 240, state: State.Immune},
  {x: 380, y: 330, state: State.Accute},
  {x: 620, y: 240, state: State.Contagious},
  {x: 260, y: 420, state: State.IntensiveCare},
  {x: 560, y: 420, state: State.Dead},
];

//TODO: Proper type?
const stateNodePositions = stateNodes.reduce((acc: {[key: string]: {x: number, y: number}}, currentStateNode) => {
  acc[currentStateNode.state.toString()] = {x: currentStateNode.x, y: currentStateNode.y};
  return acc;
}, {});

//TODO: The data for these transitions should be received from the server
const knownStateTransitions = new StateMachine({
  [State.Healthy]: new TransitionsFromState(State.Healthy, [], [new ForcedTransitionToState(State.Exposed)]),
  [State.Exposed]: new TransitionsFromState(State.Exposed, [new RandomTransitionToState(State.Infected, 0.50, 0), new RandomTransitionToState(State.Healthy, 0.50, 0)]),
  [State.Infected]: new TransitionsFromState(State.Infected, [new RandomTransitionToState(State.Contagious, 1.0, 2)]),
  [State.Contagious]: new TransitionsFromState(State.Contagious, [new RandomTransitionToState(State.Accute, 0.2, 2), new RandomTransitionToState(State.Immune, 0.8, 14)]),
  [State.Accute]: new TransitionsFromState(State.Accute, [new RandomTransitionToState(State.Immune, 0.75, 14), new RandomTransitionToState(State.IntensiveCare, 0.25, 2)]),
  [State.IntensiveCare]: new TransitionsFromState(State.IntensiveCare, [new RandomTransitionToState(State.Immune, 0.5, 14), new RandomTransitionToState(State.Dead, 0.5, 14)]),
  [State.Immune]: new TransitionsFromState(State.Immune, [new RandomTransitionToState(State.Healthy, 1.0, 365)]),
  [State.Dead]: new TransitionsFromState(State.Dead, [])
});

//TODO: Replace stateTransitions with knownStateTransitions
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
    from: State.Healthy,
    to: State.Exposed,
    isExternal: true
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

//TODO: Draw transitions between nodes - OK
//TODO: Draw separate special transition from healthy to exposed (happens due to an outside interference) - OK
//TODO: Fill the node with the color of the corresponding state (extract common state colors to somewhere inside the ui part?) - OK


//TODO: Visualize the transition parameters: probability, base duration
//TODO: Allow to change the transition parameters, listen for the changes and log updates parameters
//TODO: Draw the whole state model

//TODO: Better integration with Vue or do we really need to use D3? Can we just use Vue templates and components instead?

//TODO: Render the parameters returned by the server
//TODO: Send updated parameters to the server, auto-stop simulation, save first in the Vuex state before sending (?)
//TODO: Indicate visually that parameters have not been yet applied (? - do we need this at all: just send the updates immediately)

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

    const arrow = svg.selectAll('line')
      .data(stateTransitions.map(({from, to, isExternal}) => {
        const fromPosition = stateNodePositions[from];
        const toPosition = stateNodePositions[to];
        let x1 = fromPosition.x;
        let y1 = fromPosition.y;
        let x2 = toPosition.x;
        let y2 = toPosition.y;

        const angle = Math.atan(Math.abs(y2 - y1)/Math.abs(x2 - x1));

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

        let yDeltaSign = 1;
        if (x1 < x2) {
          yDeltaSign = -1;
        }
        let xDeltaSign = -1;
        if (y1 < y2) {
          xDeltaSign = 1;
        }
        const middleDeltas = {
          dx: xDeltaSign * stateTransitionCurvature * Math.sin(angle),
          dy: yDeltaSign * stateTransitionCurvature * Math.cos(angle)
        };
        const middle = {
          x: ((x1 + x2) / 2) + middleDeltas.dx,
          y: ((y1 + y2) / 2) + middleDeltas.dy
        };

        return {
          start: {
            x: x1,
            y: y1
          },
          end: {
            x: x2,
            y: y2
          },
          middle,
          isExternal
        };
      }))
      .enter()
      .append('path')
      .attr('d', d => `M ${d.start.x} ${d.start.y} C ${d.start.x} ${d.start.y}, ${d.middle.x} ${d.middle.y}, ${d.end.x} ${d.end.y}`)
      .attr('stroke', d => d.isExternal ? 'red': 'gray')
      .attr('stroke-width', '2')
      .attr('fill', 'none')
      .attr('marker-end', d => d.isExternal ? 'url(#externalTransitionArrow)' : 'url(#transitionArrow)');
  }
}
</script>

<style scoped lang="stylus">
  svg
    min-width 740px
    min-height 440px
</style>