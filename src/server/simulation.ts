import { WorldDimensions, State, Vector, Person, World, worldDimensions } from '../common/common';

const infectedShareAtStart = 0.01;

class PersonSimulation {
  person: Person
  worldDimensions: WorldDimensions
  position: Vector
  speed: Vector
  state: State
  constructor(worldDimensions: WorldDimensions, position: Vector, speed: Vector, state: State) {
    this.person = new Person(position, state);
    this.worldDimensions = worldDimensions;
    this.speed = speed;
  }

  move() {
    if (this.person.position.x >= this.worldDimensions.width || this.person.position.x <= 0) {
      this.speed.x = - this.speed.x;
    }
    if (this.person.position.y >= this.worldDimensions.height || this.person.position.y <= 0) {
      this.speed.y = - this.speed.y;
    }
    this.person.position.x = this.person.position.x + this.speed.x * timeStep;
    this.person.position.y = this.person.position.y + this.speed.y * timeStep;
  }

  update() {
    this.move();
  }

  getPerson(): Person {
    return this.person;
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
      const isInfected = Math.random() <= infectedShareAtStart;
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