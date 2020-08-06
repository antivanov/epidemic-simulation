import { WorldStateMessage, StartSimulation, StopSimulation } from '../../../common/messages';
import store from '../store';

class Api {

  ws: WebSocket | null = null;

  init() {
    // TODO: The server url should be configurable and not only localhost
    this.ws = new WebSocket("ws://localhost:8089");

    this.ws.onmessage = event => {
      const message: WorldStateMessage = JSON.parse(event.data);
      store.commit('updateWorld', message.world);
    };
  }

  start() {
    this.ws!.send(JSON.stringify(StartSimulation));
  }

  stop() {
    this.ws!.send(JSON.stringify(StopSimulation));
  }
}


export default new Api();