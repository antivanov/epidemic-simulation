import Vue from 'vue'
import Vuex from 'vuex'
import { World, Person, emptyMetrics } from '../../../common/common';

Vue.use(Vuex);

const state: {
  world: World
} = {
  world: new World(new Array<Person>(), emptyMetrics)
};

export default new Vuex.Store({
  state,
  mutations: {
    updateWorld(state, world: World) {
      state.world = world;
    }
  },
  actions: {
  },
  modules: {
  }
});
