export enum State {
    Healthy = "Healthy",
    Infected = "Infected",
    Contagious = "Contagious",
    Accute = "Accute",
    Immune = "Immune",
    Dead = "Dead"
}

export class Vector {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export interface WorldDimensions {
  width: number,
  height: number
}

export class Person {
  position: Vector
  state: State
  interactionRange: number = 2
  constructor(position: Vector, state: State) {
    this.position = position;
    this.state = state;
  }
}

export class World {
  population: Array<Person>;
  constructor(population: Array<Person>) {
    this.population = population;
  }
}

export const worldDimensions: WorldDimensions = {
  width: 500,
  height: 500
};