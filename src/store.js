import Vue from 'vue'
import Vuex from 'vuex'
import faker from "faker";
import { ls } from "./ls";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cards: ls.getItem('dashboard')
  },
  getters: {
    getCardById: state => id => {
      return state.cards.filter(c => c.id === window.Number(id))[0] || null;
    }
  },
  mutations: {
    setCards (state, cards) {
      state.cards = cards;
      ls.setItem('dashboard', state.cards);
    }
  },
  actions: {
    getDefaultCards (e, count = 4) {
      return Array.from(Array(count)).map((v, k) => ({
        id: k + 1,
        title: faker.lorem.words(),
        description: faker.lorem.sentence()
      }));
    }
  }
})
