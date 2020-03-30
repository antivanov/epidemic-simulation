import { World, Person, State, worldDimensions, interactionRange } from '../common/common';

//TODO: type?
const fillStyles = {
  [State.Healthy]: "#006600",
  [State.Infected]: "#cc6600",
  [State.Contagious]: "#cc0000",
  [State.Accute]: "#ff00ff",
  [State.Immune]: "#0000ff",
  [State.Dead]: "#b2b2b2"
};

//TODO: World should have the correct type
function show(world: World, context: CanvasRenderingContext2D) {
  //TODO: Read from a common configuration
  context.clearRect(0, 0, worldDimensions.width, worldDimensions.height);
  world.population.forEach((person: Person) => {
    context.strokeStyle = fillStyles[person.state];
    context.beginPath();
    context.arc(person.position.x, person.position.y, interactionRange, 0, 2 * Math.PI);
    context.stroke();
  });
}


const canvas = <HTMLCanvasElement>document.getElementById('worldVisualization');
//TODO: Read from a common configuration
canvas.width = 500;
canvas.height = 500;
const context = canvas.getContext('2d');

const ws = new WebSocket("ws://localhost:8089");

ws.onmessage = event => {
  const world: World = JSON.parse(event.data);
  show(world, context);
}