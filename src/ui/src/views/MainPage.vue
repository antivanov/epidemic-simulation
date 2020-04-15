<template>
  <div class="main-page">
    <PopulationView />
    <StatisticsView />
  </div>
</template>

<script>
// @ is an alias to /src
import PopulationView from '@/components/PopulationView.vue';
import StatisticsView from '@/components/StatisticsView.vue'

export default {
  name: 'Home',
  components: {
    PopulationView,
    StatisticsView
  }
}
</script>