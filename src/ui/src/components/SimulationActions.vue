<template>
  <!--TODO: Buttons should be enabled/disabled based on the simulation state -->
  <v-card-actions>
    <v-spacer />
    <!-- TODO: Update the button label/behavior based on the current state of the simulation as required -->
    <v-btn color="primary" v-on:click="start">Start/Pause</v-btn>
    <v-btn v-on:click="stop">Stop</v-btn>
  </v-card-actions>
</template>

<script lang="ts">
import Api from "../api";

import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SimulationActions extends Vue {
  start() {
    Api.start();
  }

  stop() {
    Api.stop();
  }
}
</script>

<style scoped lang="stylus"></style>
