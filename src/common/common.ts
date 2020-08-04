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

export interface CumulativeDayMetrics {
  cumulativeInfected: number;
}

export interface Metrics {
  healthy: number[],
  activeCases: number[],
  cumulativeInfected: number[],
  immune: number[],
  dead: number[]
}

export interface CumulativeMetrics {
  infected: number
}

export class Statistics {
  metrics: Array<DayMetrics & CumulativeDayMetrics>;
  cumulativeMetrics: CumulativeMetrics;
  constructor(metrics: Array<DayMetrics> = []) {
    this.metrics = [];
    this.cumulativeMetrics = {
      infected: 0
    };
    metrics.forEach(dayMetrics => this.appendDayMetrics(dayMetrics));
  }
  incrementInfected() {
    this.cumulativeMetrics.infected++;
  }
  appendDayMetrics(dayMetrics: DayMetrics) {
    this.metrics.push({
      ...dayMetrics,
      cumulativeInfected: this.cumulativeMetrics.infected
    });
  }
  getLatestDay(): number {
    return this.metrics.length;
  }
  getMetrics(): Metrics {
    const healthy = this.metrics.map(dayMetrics => dayMetrics.healthy);
    const activeCases = this.metrics.map(dayMetrics =>
      dayMetrics.infected + dayMetrics.contagious + dayMetrics.accute + dayMetrics.intensiveCare
    );
    const cumulativeInfected = this.metrics.map(dayMetrics => dayMetrics.cumulativeInfected);
    const immune = this.metrics.map(dayMetrics => dayMetrics.immune);
    const dead = this.metrics.map(dayMetrics => dayMetrics.dead);

    return {
      healthy,
      activeCases,
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