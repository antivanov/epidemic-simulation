//TODO: World should have the correct type
function show(world: any, context: CanvasRenderingContext2D) {
  //TODO: Read from a common configuration
  context.clearRect(0, 0, world.dimensions.width, world.dimensions.height);
  world.population.forEach((person: any) => {
    context.beginPath();
    context.arc(person.position.x, person.position.y, person.interactionRange, 0, 2 * Math.PI);
    context.stroke();
  });
}

window.addEventListener('load', () => {
  const canvas = <HTMLCanvasElement> document.getElementById('worldVisualization');
  //TODO: Read from a common configuration
  canvas.width = 500;
  canvas.height = 500;
  const context = canvas.getContext('2d');

  const ws = new WebSocket("ws://localhost:8089");

  ws.onmessage = event => {
    const world = JSON.parse(event.data);
    show(world, context);
  }
});