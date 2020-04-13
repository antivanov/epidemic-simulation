<template>
  <div class="hello">
    <span>World visualization</span>
    {{ msg }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class World extends Vue {
  @Prop() private msg!: string;
}
</script>

<style scoped lang="stylus">
div
  margin 40px 0 0
</style>
