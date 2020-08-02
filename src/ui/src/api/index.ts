import { WorldStateMessage, StartSimulation, StopSimulation } from '../../../common/messages';
import store from '../store';
import { World, Statistics } from '../../../common/common';

class Api {

  ws: WebSocket | null = null;

  init() {
    // TODO: The server url should be configurable and not only localhost
    this.ws = new WebSocket("ws://localhost:8089");

    this.ws.onmessage = event => {
      const message: WorldStateMessage = JSON.parse(event.data);
      store.commit('updateWorld', new World(message.world.population, new Statistics(message.world.statistics.metrics)));
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