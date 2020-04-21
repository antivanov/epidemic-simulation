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
  constructor(public x: number, public y: number) {}
}

export interface WorldDimensions {
  width: number;
  height: number;
}

export class Person {

  constructor(public readonly id: number,
              public readonly position: Vector,
              public readonly state: State) {}
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
  constructor(public readonly population: Array<Person>, public readonly statistics: Statistics) {
  }
}

export const worldDimensions: WorldDimensions = {
  width: 500,
  height: 500
};