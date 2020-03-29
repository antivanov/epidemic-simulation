import { WorldDimensions, State, Vector, Person, World, worldDimensions } from '../common/common';

const infectedShareAtStart = 0.01;

const infectedToContagiousTime = 50;
const infectedToContagiousProbability = 0.02;

function hasOcurred(probability: number): boolean {
  return Math.random() <= probability;
}

class PersonSimulation {
  worldDimensions: WorldDimensions
  position: Vector
  speed: Vector
  state: State
  timeInCurrentState: number
  // Isolated from contacting other persons, either because of being in a hospital State.Accute or dead State.Dead
  isIsolated: false
  constructor(worldDimensions: WorldDimensions, position: Vector, speed: Vector, state: State) {
    this.timeInCurrentState = 0;
    this.position = position;
    this.state = state;
    this.worldDimensions = worldDimensions;
    this.speed = speed;
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

  update() {
    this.timeInCurrentState = this.timeInCurrentState + 1;
    if (this.state === State.Infected) {
      if ((this.timeInCurrentState >= infectedToContagiousTime) && hasOcurred(infectedToContagiousProbability)) {
        this.state = State.Contagious;
        this.timeInCurrentState = 0;
      }
    }
    this.move();
  }

  getPerson(): Person {
    return new Person(this.position, this.state);
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

class WorldSimulation {
  dimensions: WorldDimensions
  personSimulations: Array<PersonSimulation>
  constructor(dimensions: WorldDimensions) {
    this.dimensions = dimensions;
  }

  populate(populationSize: number) {
    this.personSimulations = [];
    for (let i = 0; i < populationSize; i++) {
      const position = new Vector(randomUpTo(this.dimensions.width), randomUpTo(this.dimensions.height));
      const speed = new Vector(randomOfMagnitude(maxSpeed), randomOfMagnitude(maxSpeed));
      const isInfected = hasOcurred(infectedShareAtStart);
      const personState = isInfected ? State.Infected : State.Healthy;
      const personSimulation = new PersonSimulation(this.dimensions, position, speed, personState);
      this.personSimulations.push(personSimulation);
    }
  }

  update() {
    this.personSimulations.forEach(personSimulation => {
      personSimulation.update();
    });
  }

  getWorld(): World {
    const persons = this.personSimulations.map(personSimulation => personSimulation.getPerson())
    return new World(persons);
  }
}

const worldSimulation = new WorldSimulation(worldDimensions);
worldSimulation.populate(500);

export default worldSimulation;