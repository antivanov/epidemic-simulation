import Vue from 'vue'
import Vuex from 'vuex'
import { World, Person, Statistics } from '../../../common/common';

Vue.use(Vuex);

const state: {
  world: World
} = {
  world: new World(new Array<Person>(), new Statistics())
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
