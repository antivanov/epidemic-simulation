<template>
  <div class="population-view">
    <h3>Population</h3>
    <canvas></canvas>
    <div>{{ population.length }} persons</div>
  </div>
</template>

<script lang="ts">
import store from '../store';
import { Component, Prop, Vue } from 'vue-property-decorator';

import { World, Person, State, worldDimensions, interactionRange } from '../../../common/common';
import { stateColors } from '../common/state';

function showPopulation(population: Array<Person>, context: CanvasRenderingContext2D) {
  context.clearRect(0, 0, worldDimensions.width, worldDimensions.height);

  population.forEach((person: Person) => {
    context.strokeStyle = stateColors[person.state];
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
  display inline-block
</style>
