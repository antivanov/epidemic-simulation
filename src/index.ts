enum State {
  Healthy = "Healthy",
  Infected = "Infected",
  Contagious = "Contagious",
  Accute = "Accute",
  Immune = "Immune",
  Dead = "Dead"
}

class Position {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Person {
  position: Position
  interactionRange: number = 5
  state: State
  constructor(position: Position, state: State) {
   this.position = position;
   this.state = state;
  }
}

class World {
  width: number
  height: number
  population: Array<Person>
  constructor(options: { width: number, height: number }) {
    this.width = options.width;
    this.height = options.height;
  }

  populate(populationSize: number) {
    this.population = [];
    for (let i = 0; i < populationSize; i++) {
      const position = new Position(Math.floor(Math.random() * this.width), Math.floor(Math.random() * this.height))
      const person = new Person(position, State.Healthy)
      this.population.push(person);
    }
  }
}

const world = new World({ width: 500, height: 500 });
world.populate(100);

console.log(world.population[12])
