import { World } from '../../../common/common';
import store from '../store';

class Api {

  init() {
    // TODO: The server url should be configurable and not only localhost
    const ws = new WebSocket("ws://localhost:8089");

    ws.onmessage = event => {
      const world: World = JSON.parse(event.data);
      store.commit('updateWorld', world);
    };
  }
}


export default new Api();