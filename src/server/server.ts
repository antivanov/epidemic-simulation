import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import worldSimulation from './simulation';
import * as path from 'path';
import { WorldStateMessage, Message, MessageType } from '../common/messages';

const app = express();

const server = http.createServer(app);
const wsServer = new WebSocket.Server({ server });

//TODO: Communication via a Web socket should be handled in a separate module
wsServer.on('connection', (ws: WebSocket) => {
  ws.on('message', (messageString: string) => {
    console.log(`received: ${messageString}`);
    const message: Message = <Message>JSON.parse(messageString);
    if (message.type === MessageType.StartSimulation) {
      console.log('Starting simulation...');
      worldSimulation.start();
    } else if (message.type === MessageType.StopSimulation) {
      console.log('Stopping simulation...');
      worldSimulation.stop();
    }
  });

  //TODO: If the simulation is stopped, does not make sense to send updates too often
  setInterval(() => {
    const message = JSON.stringify(new WorldStateMessage(worldSimulation.getWorld()));
    ws.send(message);
  }, 100);
});

const staticResourcesPath = path.resolve('../../compiled/ui');

console.log(`Serving static resources from: ${staticResourcesPath}`)

app.use(express.static(staticResourcesPath));

const port = process.env.PORT || 8089;
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});