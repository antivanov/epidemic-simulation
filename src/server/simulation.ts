enum State {
  Healthy = "Healthy",
  Infected = "Infected",
  Contagious = "Contagious",
  Accute = "Accute",
  Immune = "Immune",
  Dead = "Dead"
}

class Vector {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Person {
  worldDimensions: WorldDimensions
  position: Vector
  speed: Vector
  interactionRange: number = 2
  state: State
  constructor(worldDimensions: WorldDimensions, position: Vector, speed: Vector, state: State) {
    this.worldDimensions = worldDimensions;
    this.position = position;
    this.speed = speed;
    this.state = state;
  }

  move() {
    if (this.position.x >= this.worldDimensions.width || this.position.x <= 0) {
      this.speed.x = - this.speed.x;
    }
    if (this.position.y >= this.worldDimensions.height || this.position.y <= 0) {
      this.speed.y = - this.speed.y;
    }
    this.position.x = this.position.x + this.speed.x * timeStep;
    this.position.y = this.position.y + this.speed.y * timeStep;
  }
}

const timeStep = 1;
const maxSpeed = 5;

function randomUpTo(value: number): number {
  return Math.round(Math.random() * value);
}

function randomSign(): number {
  return Math.random() > 0.5 ? 1 : -1;
}

function randomOfMagnitude(magnitude: number): number {
  return randomSign() * randomUpTo(magnitude);
}

interface WorldDimensions {
  width: number,
  height: number
}

class World {
  dimensions: WorldDimensions
  population: Array<Person>
  constructor(dimensions: WorldDimensions) {
    this.dimensions = dimensions;
  }

  populate(populationSize: number) {
    this.population = [];
    for (let i = 0; i < populationSize; i++) {
      const position = new Vector(randomUpTo(this.dimensions.width), randomUpTo(this.dimensions.height))
      const speed = new Vector(randomOfMagnitude(maxSpeed), randomOfMagnitude(maxSpeed))
      const person = new Person(this.dimensions, position, speed, State.Healthy)
      this.population.push(person);
    }
  }

  update() {
    this.population.forEach(person => {
      person.move();
    });
  }
}

const world = new World({ width: 500, height: 500 });
world.populate(100);

export default world;