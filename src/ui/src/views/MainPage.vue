<template>
    <v-content>
      <v-container fluid>
        <v-row
          align="center"
          justify="center"
        >
          <v-col cols="10">
            <v-card>
              <v-card-actions>
                <v-spacer />
                <!-- TODO: Update the button label as required -->
                <v-btn color="primary">Start/Pause</v-btn>
                <v-btn>Stop</v-btn>
                <v-btn>Restart</v-btn>
              </v-card-actions>
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
         <!-- TODO: State graph visualization and parameters -->
         <!-- TODO: Restrictive actions configuration -->
        </v-row>
      </v-container>
    </v-content>
</template>

<script>

  // @ is an alias to /src
  import PopulationView from '@/components/PopulationView.vue';
  import StatisticsView from '@/components/StatisticsView.vue'

  export default {
    name: 'MainPage',
    components: {
      PopulationView,
      StatisticsView
    }
  }
</script>