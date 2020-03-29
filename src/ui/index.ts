import { World, Person, State, worldDimensions } from '../common/common';

//TODO: type?
const fillStyles = {
  [State.Healthy]: "green",
  [State.Infected]: "orange",
  [State.Contagious]: "#ff7b25",
  [State.Accute]: "#c94c4c",
  [State.Immune]: "#034f84",
  [State.Dead]: "#b2b2b2"
};

//TODO: World should have the correct type
function show(world: World, context: CanvasRenderingContext2D) {
  //TODO: Read from a common configuration
  context.clearRect(0, 0, worldDimensions.width, worldDimensions.height);
  world.population.forEach((person: Person) => {
    context.strokeStyle = fillStyles[person.state];
    context.beginPath();
    context.arc(person.position.x, person.position.y, person.interactionRange, 0, 2 * Math.PI);
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