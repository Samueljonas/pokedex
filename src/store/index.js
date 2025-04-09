import { createStore } from "vuex";
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    pokemons: [],
    filters: {},
  },
  mutations: {
    setPokemons(state, payload) {
      state.pokemons = payload;
    },
    addPokemons(state, payload) {
      state.pokemons = [...state.pokemons, ...payload];
    },
    setFilters(state, payload) {
      state.filters = payload;
    },
  },
  actions: {
    async fetchPokemons({ commit }, { offset = 0, limit = 20 }) {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      );
      const fullData = await Promise.all(
        res.data.results.map((p) => axios.get(p.url).then((r) => r.data))
      );
      commit("addPokemons", fullData);
    },
  },
  modules: {
    filteredPokemons(state) {
      return state.pokemons.filter((pokemon) => {
        const nameMatch = state.filters.name
          ? pokemon.name
              .toLowerCase()
              .includes(state.filters.name.toLowerCase())
          : true;
        const idMatch = state.filters.id
          ? pokemon.id === Number(state.filters.id)
          : true;
        const typeMatch = state.filters.typeMatch
          ? pokemon.types.some(
              (t) => t.type.name === state.filters.type.toLowerCase()
            )
          : true;
        const speciesMatch = state.filters.speciesMatch
          ? pokemon.species?.name
              ?.toLowerCase()
              .includes(state.filters.species.toLowerCase())
          : true;
        return nameMatch && idMatch && typeMatch && speciesMatch;
      });
    },
  },
});
export default store;
