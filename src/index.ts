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
  interactionRange: number = 2
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
      const position = new Position(Math.round(Math.random() * this.width), Math.round(Math.random() * this.height))
      const person = new Person(position, State.Healthy)
      this.population.push(person);
    }
  }
}

const world = new World({ width: 500, height: 500 });
world.populate(100);

console.log(world.population[12])

window.addEventListener('load', () => {
  const canvas = <HTMLCanvasElement> document.getElementById('worldVisualization');
  canvas.width = world.width;
  canvas.height = world.height;
  const context = canvas.getContext('2d');

  for (let person of world.population) {
    context.beginPath();
    context.arc(person.position.x, person.position.y, person.interactionRange, 0, 2 * Math.PI);
    context.stroke();
  }
});
