<template>
  <div class="hello">
    <span>World visualization</span>
    {{ msg }}

    <ul id="example-1">
      <li v-for="person in population" :key="person.id">
        {{ person.id }} - {{ person.state }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import store from '../store';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class World extends Vue {
  @Prop() private msg!: string;

  get population() {
     return store.state!.world!.population;
  }
}
</script>

<style scoped lang="stylus">
div
  margin 40px 0 0
</style>
