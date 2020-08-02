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
  cumulativeInfected: number;
}

export interface Metrics {
  healthy: number[],
  confirmed: number[],
  cumulativeInfected: number[],
  immune: number[],
  dead: number[]
}

export class Statistics {
  metrics: Array<DayMetrics>;
  constructor(metrics: Array<DayMetrics> = []) {
    this.metrics = metrics;
  }
  appendDayMetrics(dayMetrics: DayMetrics) {
    this.metrics.push(dayMetrics);
  }
  getLatestDay(): number {
    return this.metrics.length;
  }

  getMetrics(): Metrics {
    const healthy = this.metrics.map(dayMetrics => dayMetrics.healthy);
    const confirmed = this.metrics.map(dayMetrics =>
      dayMetrics.infected + dayMetrics.contagious + dayMetrics.accute + dayMetrics.intensiveCare
    );
    const cumulativeInfected = this.metrics.map(dayMetrics => dayMetrics.cumulativeInfected);
    const immune = this.metrics.map(dayMetrics => dayMetrics.immune);
    const dead = this.metrics.map(dayMetrics => dayMetrics.dead);

    return {
      healthy,
      confirmed,
      cumulativeInfected,
      immune,
      dead
    };
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