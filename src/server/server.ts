import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import worldSimulation from './simulation';

const app = express();

const server = http.createServer(app);
const wsServer = new WebSocket.Server({ server });

setInterval(() => {
  worldSimulation.update();
}, 100);

wsServer.on('connection', (ws: WebSocket) => {
  ws.on('message', (message: string) => {
    console.log(`received: ${message}`);
  });
  setInterval(() => {
    const message = JSON.stringify(worldSimulation.getWorld());
    ws.send(message)
  }, 100);
});

app.use(express.static('../../compiled/ui'))

const port = process.env.PORT || 8089;
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});