<template>
  <div class="population-view">
    <canvas></canvas>
    <div>World population {{ population.length }}</div>
  </div>
</template>

<script lang="ts">
import store from '../store';
import { Component, Prop, Vue } from 'vue-property-decorator';

import { World, Person, State, worldDimensions, interactionRange } from '../../../common/common';

//TODO: type?
const fillStyles = {
  [State.Healthy]: "#006600",
  [State.Exposed]: "#006600",
  [State.Infected]: "#cc6600",
  [State.Contagious]: "#cc0000",
  [State.Accute]: "#ff00ff",
  [State.IntensiveCare]: "#ffd9e3",
  [State.Immune]: "#0000ff",
  [State.Dead]: "#b2b2b2"
};

function showPopulation(population: Array<Person>, context: CanvasRenderingContext2D) {
  context.clearRect(0, 0, worldDimensions.width, worldDimensions.height);

  population.forEach((person: Person) => {
    context.strokeStyle = fillStyles[person.state];
    context.beginPath();
    context.arc(person.position.x, person.position.y, interactionRange, 0, 2 * Math.PI);
    context.stroke();
  });
}

@Component
export default class PopulationView extends Vue {

  get population() {
     return store.state!.world!.population;
  }

  getCanvasContext(): CanvasRenderingContext2D {
    const canvas = this.$el.querySelector('canvas');
    canvas!.width = worldDimensions.width;
    canvas!.height = worldDimensions.height;
    return canvas!.getContext('2d')!;
  }

  mounted() {
    showPopulation(this.population, this.getCanvasContext());
  }

  updated() {
    showPopulation(this.population, this.getCanvasContext());
  }
}
</script>

<style scoped lang="stylus">
canvas
  border 1px solid black
div
  margin 40px 0 0
.population-view
  display: inline-block
</style>
