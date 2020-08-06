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

export interface Metrics {
  healthy: number[],
  activeCases: number[],
  cumulativeInfected: number[],
  immune: number[],
  dead: number[]
}

export const emptyMetrics: Metrics = {
  healthy: [],
  activeCases: [],
  cumulativeInfected: [],
  immune: [],
  dead: []
}

export class World {
  constructor(public readonly population: Array<Person>, public readonly metrics: Metrics) {
  }
}

export const worldDimensions: WorldDimensions = {
  width: 500,
  height: 500
};