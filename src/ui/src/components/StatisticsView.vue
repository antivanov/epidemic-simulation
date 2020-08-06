<template>
  <div class="statistics-view">
    <h3>Key statistics</h3>
    <canvas></canvas>
    <div>Day {{ metrics.length }}</div>
  </div>
</template>

<script lang="ts">
//TODO: Make sure that Chart has the correct type
import { Chart } from 'chart.js';

import store from '../store';
import { Component, Prop, Vue } from 'vue-property-decorator';

import { World, Person, State, worldDimensions, interactionRange, Metrics, emptyMetrics } from '../../../common/common';

//TODO: Real type from the chart.js library?
const chartOptions = {
  responsive: false,
  title: {
    display: true,
    text: 'Epidemics Development'
  },
  tooltips: {
    mode: 'index',
    intersect: false,
  },
  hover: {
    mode: 'nearest',
    intersect: true
  },
  scales: {
    x: {
      display: true,
      scaleLabel: {
        display: true,
        labelString: 'Day'
      }
    },
    y: {
      display: true,
      scaleLabel: {
        display: true,
        labelString: 'Count'
      }
    }
  }
};

//TODO: Real type from the chart.js library?
function buildLabelsAndDatasets(metrics: Metrics): { labels: any, datasets: any} {
  const totalDataPoints = Math.max(metrics.healthy.length, minimumNumberOfDays);
  const {
    healthy,
    activeCases,
    cumulativeInfected,
    immune,
    dead
  } = metrics;

  //TODO: What actual chart lines do we want to show? Should they relate closer to the defined Person states?
  // Can we reuse common colors?
  const labels = Array.from(Array(totalDataPoints).keys());
  const datasets = [
    {
      label: 'healthy',
      backgroundColor: "#006600",
      borderColor: "#006600",
      data: healthy,
      fill: false,
    },
    {
      label: 'active',
      backgroundColor: 'rgb(204, 0, 0)',
      borderColor: 'rgb(204, 0, 0)',
      data: activeCases,
      fill: false,
    },
    {
      label: 'cumulative confirmed',
      backgroundColor: 'rgb(255, 69, 0)',
      borderColor: 'rgb(255, 69, 255)',
      data: cumulativeInfected,
      fill: false
    },
    {
      label: 'immune',
      backgroundColor: 'rgb(0, 0, 255)',
      borderColor: 'rgb(0, 0, 255)',
      data: immune,
      fill: false,
    },
    {
      label: 'dead',
      backgroundColor: 'rgb(178, 178, 178)',
      borderColor: 'rgb(178, 178, 178)',
      data: dead,
      fill: false,
    }
  ];
  return {
    labels,
    datasets
  };
}

const minimumNumberOfDays = 60;

@Component
export default class StatisticsView extends Vue {

  lastKnownStatisticsLength = 0;

  chart: Chart | null = null

  get metrics(): Metrics {
     return store.state!.world!.metrics;
  }

  getCanvasContext(): CanvasRenderingContext2D {
    const canvas = this.$el.querySelector('canvas');
    canvas!.width = worldDimensions.width;
    canvas!.height = worldDimensions.height;
    return canvas!.getContext('2d')!;
  }

  mounted() {
    this.chart = this.createStatisticsChart(this.getCanvasContext());
    this.updateStatisticsChart(this.chart!, this.metrics);
  }

  updated() {
    this.updateStatisticsChart(this.chart!, this.metrics);
  }

  updateStatisticsChart(chart: Chart, metrics: Metrics): void {
    if (metrics.healthy.length != this.lastKnownStatisticsLength) {
      this.lastKnownStatisticsLength = metrics.healthy.length;

      const labelsAndDatasets = buildLabelsAndDatasets(metrics);

      chart.data = {
        ...chart.data,
        ...labelsAndDatasets
      };
      chart.update(0);
    }
  }

  createStatisticsChart(context: CanvasRenderingContext2D): Chart {
    const config = {
      type: 'line',
      data: buildLabelsAndDatasets(emptyMetrics),
      options: chartOptions
    };

    return new Chart(context, config);
  }
}
</script>

<style scoped lang="stylus">
canvas
  border 1px solid black
div
  margin 40px 0 0

.statistics-view
  display: inline-block
</style>
