<template>
    <v-content>
      <v-container fluid>
        <v-row
          align="center"
          justify="center"
        >
          <v-col cols="10">
            <v-card>
              <SimulationsActions />
              <v-container fluid>
                <v-row>
                  <v-col align="center" justify="center">
                    <PopulationView />
                  </v-col>
                  <v-col align="center" justify="center">
                    <StatisticsView />
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
        <v-row
          align="center"
          justify="center"
        >
          <v-col cols="10">
            <v-card>
              <v-container fluid>
                <v-row>
                  <v-col align="center" justify="center">
                    <StateModelView />
                  </v-col>
                  <v-col align="center" justify="center">
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
         <!-- TODO: State graph visualization and parameters -->
         <!-- TODO: Restrictive actions configuration -->
        </v-row>
      </v-container>
    </v-content>
</template>

<script>

  // @ is an alias to /src
  import PopulationView from '@/components/PopulationView.vue'
  import StatisticsView from '@/components/StatisticsView.vue'
  import StateModelView from '@/components/StateModelView.vue'
  import SimulationsActions from '@/components/SimulationActions.vue'
  import Api from '../api'

  export default {
    name: 'MainPage',
    components: {
      PopulationView,
      StatisticsView,
      StateModelView,
      SimulationsActions
    }
  }
</script>