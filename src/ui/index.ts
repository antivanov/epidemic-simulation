import { World, Person, State, worldDimensions, interactionRange, Statistics } from '../common/common';
import { Chart } from 'chartjs';
//TODO: Import Lodash
//import * as _ from 'lodash';

//TODO: type?
const fillStyles = {
  [State.Healthy]: "#006600",
  [State.Exposed]: "#006600",
  [State.Infected]: "#cc6600",
  [State.Contagious]: "#cc0000",
  [State.Accute]: "#ff00ff",
  [State.IntensiveCare]: "#ffd9e3",
  [State.Immune]: "#0000ff",
  [State.Dead]: "#b2b2b2"
};

//TODO: World should have the correct type
function showWorld(world: World, context: CanvasRenderingContext2D) {
  //TODO: Read from a common configuration
  context.clearRect(0, 0, worldDimensions.width, worldDimensions.height);
  //console.log(world.statistics);
  world.population.forEach((person: Person) => {
    context.strokeStyle = fillStyles[person.state];
    context.beginPath();
    context.arc(person.position.x, person.position.y, interactionRange, 0, 2 * Math.PI);
    context.stroke();
  });
}



const worldCanvas = <HTMLCanvasElement>document.getElementById('worldVisualization');
//TODO: Read from a common configuration
worldCanvas.width = 500;
worldCanvas.height = 500;
const world2DContext = worldCanvas.getContext('2d');

const statisticsCanvas = <HTMLCanvasElement>document.getElementById('epidemicStatistics');
statisticsCanvas.width = 500;
statisticsCanvas.height = 500;
const statistics2DContext = statisticsCanvas.getContext('2d');

const ws = new WebSocket("ws://localhost:8089");

const statisticsChart: Chart = createStatisticsChart(statistics2DContext);

ws.onmessage = event => {
  const world: World = JSON.parse(event.data);
  showWorld(world, world2DContext);
  updateStatisticsChart(statisticsChart, world.statistics);
}

const minimumNumberOfDays = 60;

let lastKnownStatisticsLength = 0;
function updateStatisticsChart(chart: Chart, statistics: Statistics): void {
  if (statistics.metrics.length > lastKnownStatisticsLength) {
    lastKnownStatisticsLength = statistics.metrics.length;

    const totalDataPoints = Math.max(statistics.metrics.length, minimumNumberOfDays);
    const healthy = statistics.metrics.map(dayMetrics => dayMetrics.healthy);
    const confirmed = statistics.metrics.map(dayMetrics =>
      dayMetrics.infected + dayMetrics.contagious + dayMetrics.accute
    );
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
