import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

const app = express();

const server = http.createServer(app);
const wsServer = new WebSocket.Server({ server });

wsServer.on('connection', (ws: WebSocket) => {
  ws.on('message', (message: string) => {
    console.log(`received: ${message}`);
  });
  setInterval(() => {
    ws.send('WebSocket message')
  }, 100);
});

app.use(express.static('.'))

const port = process.env.PORT || 8089;
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});