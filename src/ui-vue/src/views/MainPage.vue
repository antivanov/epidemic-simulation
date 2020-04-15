<template>
  <div class="main-page">
    <PopulationView />
  </div>
</template>

<script>
// @ is an alias to /src
import PopulationView from '@/components/PopulationView.vue'

export default {
  name: 'Home',
  components: {
    PopulationView
  }
}
</script>