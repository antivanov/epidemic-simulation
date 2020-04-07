export const interactionRange: number = 2

export const enum State {
  Healthy = "Healthy",
  Exposed = "Exposed",
  Infected = "Infected",
  Contagious = "Contagious",
  Accute = "Accute",
  IntensiveCare = "IntensiveCare",
  Immune = "Immune",
  Dead = "Dead"
}

export class Vector {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export interface WorldDimensions {
  width: number;
  height: number;
}

export class Person {
  position: Vector
  state: State
  constructor(position: Vector, state: State) {
    this.position = position;
    this.state = state;
  }
}

export interface DayMetrics {
  healthy: number;
  exposed: number;
  infected: number;
  contagious: number;
  accute: number;
  intensiveCare: number;
  immune: number;
  dead: number;
}

export class Statistics {
  metrics: Array<DayMetrics>;
  constructor() {
    this.metrics = [];
  }
  appendDayMetrics(dayMetrics: DayMetrics) {
    this.metrics.push(dayMetrics);
  }
  getLatestDay(): number {
    return this.metrics.length;
  }
}

export class World {
  population: Array<Person>;
  statistics: Statistics;
  constructor(population: Array<Person>, statistics: Statistics) {
    this.population = population;
    this.statistics = statistics;
  }
}

export const worldDimensions: WorldDimensions = {
  width: 500,
  height: 500
};