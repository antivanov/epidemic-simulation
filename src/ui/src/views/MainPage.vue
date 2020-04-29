<template>
    <v-content>
      <v-container fluid>
        <v-row
          align="center"
          justify="center"
        >
          <v-col cols="10">
            <v-card>
              <!-- TODO: Extract actions as a separate component -->
              <!--TODO: Buttons should be enabled/disabled based on the simulation state -->
              <v-card-actions>
                <v-spacer />
                <!-- TODO: Update the button label/behavior based on the current state of the simulation as required -->
                <v-btn color="primary" v-on:click="start">Start/Pause</v-btn>
                <v-btn v-on:click="stop">Stop</v-btn>
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
  import StatisticsView from '@/components/StatisticsView.vue';
  import Api from '../api';

  export default {
    name: 'MainPage',
    methods: {
      start() {
        Api.start();
      },
      stop() {
        Api.stop();
      }
    },
    components: {
      PopulationView,
      StatisticsView
    }
  }
</script>