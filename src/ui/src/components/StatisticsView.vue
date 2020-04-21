<template>
  <div class="hello">
    <canvas></canvas>
    <div>Day {{ statistics.metrics.length }}</div>
  </div>
</template>

<script lang="ts">
//TODO: Make sure that Chart has the correct type
import { Chart } from 'chart.js';

import store from '../store';
import { Component, Prop, Vue } from 'vue-property-decorator';

import { World, Person, State, worldDimensions, interactionRange, Statistics } from '../../../common/common';

const statisticsChartDimensions = {
  width: 1000,
  height: 500
};

const minimumNumberOfDays = 60;

// TODO: Move this to the component's state
let lastKnownStatisticsLength = 0;

function updateStatisticsChart(chart: Chart, statistics: Statistics): void {
  if (statistics.metrics.length > lastKnownStatisticsLength) {
    lastKnownStatisticsLength = statistics.metrics.length;

    const totalDataPoints = Math.max(statistics.metrics.length, minimumNumberOfDays);
    const healthy = statistics.metrics.map(dayMetrics => dayMetrics.healthy);
    const confirmed = statistics.metrics.map(dayMetrics =>
      dayMetrics.infected + dayMetrics.contagious + dayMetrics.accute
    );
    const cumulativeInfected = statistics.metrics.map(dayMetrics => dayMetrics.cumulativeInfected);
    const immune = statistics.metrics.map(dayMetrics => dayMetrics.immune);
    const dead = statistics.metrics.map(dayMetrics => dayMetrics.dead);

    const labels = Array.from(Array(totalDataPoints).keys());

    chart.data.labels = labels;
    chart.data.datasets = [
      {
        label: 'healthy',
        backgroundColor: 'rgb(0, 102, 0)',
        borderColor: 'rgb(0, 102, 0)',
        data: healthy,
        fill: false,
      },
      {
        label: 'confirmed',
        backgroundColor: 'rgb(204, 0, 0)',
        borderColor: 'rgb(204, 0, 0)',
        data: confirmed,
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
    chart.update(0);
  }
}

function createStatisticsChart(context: CanvasRenderingContext2D): Chart {
  const config = {
    type: 'line',
    data: {
      labels: Array.from(Array(minimumNumberOfDays).keys()),
      datasets: [
        {
          label: 'healthy',
          backgroundColor: 'rgb(0, 102, 0)',
          borderColor: 'rgb(0, 102, 0)',
          data: Array<number>(),
          fill: false,
        },
        {
          label: 'confirmed',
          backgroundColor: 'rgb(204, 0, 0)',
          borderColor: 'rgb(204, 0, 0)',
          data: [],
          fill: false,
        },
        {
          label: 'cumulative confirmed',
          backgroundColor: 'rgb(255, 69, 0)',
          borderColor: 'rgb(255, 69, 0)',
          data: [],
          fill: false
        },
        {
          label: 'immune',
          backgroundColor: 'rgb(0, 0, 255)',
          borderColor: 'rgb(0, 0, 255)',
          data: [],
          fill: false,
        },
        {
          label: 'dead',
          backgroundColor: 'rgb(178, 178, 178)',
          borderColor: 'rgb(178, 178, 178)',
          data: [],
          fill: false,
        }
      ]
    },
    options: {
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
    }
  };

  return new Chart(context, config);
}


@Component
export default class StatisticsView extends Vue {

  chart: Chart | null = null

  get statistics(): Statistics {
     return store.state!.world!.statistics;
  }

  getCanvasContext(): CanvasRenderingContext2D {
    const canvas = this.$el.querySelector('canvas');
    canvas!.width = worldDimensions.width;
    canvas!.height = worldDimensions.height;
    return canvas!.getContext('2d')!;
  }

  mounted() {
    this.chart = createStatisticsChart(this.getCanvasContext());
    updateStatisticsChart(this.chart!, this.statistics);
  }

  updated() {
    updateStatisticsChart(this.chart!, this.statistics);
  }
}
</script>

<style scoped lang="stylus">
canvas
  border 1px solid black
div
  margin 40px 0 0
</style>
