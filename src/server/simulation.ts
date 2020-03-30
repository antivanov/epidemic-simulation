import * as _ from 'lodash';

import { WorldDimensions, State, Vector, Person, World, worldDimensions, interactionRange } from '../common/common';

const infectedShareAtStart = 0.01;

const infectedToContagiousTime = 50;
const infectedToContagiousProbability = 0.02;

const diseaseTransferProbability = 0.1;

const contagiousToAccuteTime = 10;
const contagiousToAccuteProbability = 0.0005;

const contagiousToImmuneTime = 500;
const contagiousToImmuneProbability = 0.0085;

function hasOcurred(probability: number): boolean {
  return Math.random() <= probability;
}

function distance(vector: Vector, otherVector: Vector) {
  return Math.sqrt(Math.pow(vector.x - otherVector.x, 2) + Math.pow(vector.y - otherVector.y, 2));
}

class PersonSimulation {
  id: number
  worldDimensions: WorldDimensions
  position: Vector
  speed: Vector
  originalSpeed: Vector
  state: State
  //TODO: Create a separate method to set the state and reset this counter?
  timeInCurrentState: number
  // Isolated from contacting other persons, either because of being in a hospital State.Accute or dead State.Dead
  isIsolated: false
  constructor(id: number, worldDimensions: WorldDimensions, position: Vector, speed: Vector, state: State) {
    this.id = id;
    this.timeInCurrentState = 0;
    this.position = position;
    this.state = state;
    this.worldDimensions = worldDimensions;
    this.speed = speed;
    this.originalSpeed = speed;
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

  updateState() {
    this.timeInCurrentState = this.timeInCurrentState + 1;
    //TODO: Re-factor and generalize the state transition logic
    if (this.state === State.Infected) {
      if ((this.timeInCurrentState >= infectedToContagiousTime) && hasOcurred(infectedToContagiousProbability)) {
        this.state = State.Contagious;
        this.timeInCurrentState = 0;
      }
    }
    if (this.state === State.Contagious) {
      if ((this.timeInCurrentState >= contagiousToAccuteTime) && hasOcurred(contagiousToAccuteProbability)) {
        this.state = State.Accute;
        this.speed = new Vector(0, 0);
        this.timeInCurrentState = 0;
      }
      if ((this.timeInCurrentState >= contagiousToImmuneTime) && hasOcurred(contagiousToImmuneProbability)) {
        this.state = State.Immune;
        this.timeInCurrentState = 0;
      }
    }
  }

  update() {
    this.updateState();
    this.move();
  }

  onEncounterWith(other: PersonSimulation) {
    if (other.state === State.Contagious && this.state === State.Healthy) {
      if (hasOcurred(diseaseTransferProbability)) {
        console.log(`Person ${this.id} was infected by person ${other.id}`);
        this.state = State.Infected;
        this.timeInCurrentState = 0;
      }
    }
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

const sectionsNumber = 5;

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
      const personSimulation = new PersonSimulation(i, this.dimensions, position, speed, personState);
      this.personSimulations.push(personSimulation);
    }
  }

  update() {
    this.personSimulations.forEach(personSimulation => {
      personSimulation.update();
    });
    this.findEncountersAndUpdate();
  }

  findEncountersAndUpdate() {
    this.getSubworlds().forEach(ySubworlds => {
      ySubworlds.forEach(subworld => {
        this.findEncountersBetweenPersonsAndUpdate(subworld);
      });
    });
  }

  getSubworlds(): Array<Array<Array<PersonSimulation>>> {
    const sections = _.range(0, sectionsNumber, 1);
    const subWorlds: Array<Array<Array<PersonSimulation>>> = sections.map(() =>
      sections.map(_ => [])
    );
    this.personSimulations.forEach(personSimulation => {
      const subworldPosition = this.getSubworldPosition(personSimulation);
      subWorlds[subworldPosition.x][subworldPosition.y].push(personSimulation);
    });
    return subWorlds;
  }

  getSubworldPosition(personSimulation: PersonSimulation): Vector {
    const xStep = worldDimensions.width / sectionsNumber;
    const yStep = worldDimensions.height / sectionsNumber;

    const subWorldXIndex = Math.min(Math.floor(Math.max(personSimulation.position.x, 0) / xStep), sectionsNumber - 1);
    const subWorldYIndex = Math.min(Math.floor(Math.max(personSimulation.position.y, 0) / yStep), sectionsNumber - 1);

    return new Vector(subWorldXIndex, subWorldYIndex);
  }

  findEncountersBetweenPersonsAndUpdate(personSimulations: Array<PersonSimulation>): void {
    for (let personSimulation of personSimulations) {
      for (let otherPersonSimulation of personSimulations) {
        if ((distance(personSimulation.position, otherPersonSimulation.position) <= interactionRange) && (otherPersonSimulation !== personSimulation)) {
          personSimulation.onEncounterWith(otherPersonSimulation);
          otherPersonSimulation.onEncounterWith(personSimulation);
        }
      }
    }
  }

  getWorld(): World {
    const persons = this.personSimulations.map(personSimulation => personSimulation.getPerson())
    return new World(persons);
  }
}

const worldSimulation = new WorldSimulation(worldDimensions);
worldSimulation.populate(500);

export default worldSimulation;