<template>
  <div class="container mt-4" v-if="pokemon">
    <h2 class="text-capitalize">{{ pokemon.name }} (#{{ pokemon.id }})</h2>

    <div class="row">
      <div class="col-md-6">
        <h4>Sprites</h4>
        <div class="d-flex flex-wrap gap-2">
          <img
            v-for="(sprite, key) in filteredSprites"
            :key="key"
            :src="sprite"
            :alt="key"
            class="img-thumbnail"
            style="width: 96px; height: 96px"
          />
        </div>
      </div>

      <div class="col-md-6">
        <h4>Movimentos</h4>
        <ul class="list-group">
          <li
            v-for="move in pokemon.moves"
            :key="move.move.name"
            class="list-group-item"
          >
            {{ move.move.name }}
          </li>
        </ul>
      </div>
    </div>

    <hr />

    <div class="mt-4">
      <h4>Games</h4>
      <ul class="list-inline">
        <li
          v-for="game in pokemon.game_indices"
          :key="game.version.name"
          class="list-inline-item badge badge-secondary"
        >
          {{ game.version.name }}
        </li>
      </ul>
    </div>

    <div class="mt-4">
      <h4>Evoluções</h4>
      <div v-if="evolutions.length">
        <ul class="list-group list-group-horizontal-sm flex-wrap">
          <li
            v-for="poke in evolutions"
            :key="poke.name"
            class="list-group-item text-capitalize"
          >
            {{ poke.name }}
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Nenhuma evolução encontrada</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      pokemon: null,
      evolutions: [],
    };
  },
  computed: {
    filteredSprites() {
      if (!this.pokemon?.sprites) return [];
      return Object.entries(this.pokemon.sprites)
        .filter(([key, value]) => value && typeof value === "string")
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});
    },
  },
  methods: {
    async fetchPokemon() {
      const { id } = this.$route.params;
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      this.pokemon = data;
      await this.fetchEvolutions();
    },
    async fetchEvolutions() {
      const speciesUrl = this.pokemon.species.url;
      const speciesRes = await axios.get(speciesUrl);
      const evoChainUrl = speciesRes.data.evolution_chain.url;
      const evoRes = await axios.get(evoChainUrl);

      const chain = evoRes.data.chain;
      this.evolutions = this.extractEvolutions(chain);
    },
    extractEvolutions(chain) {
      const evolutions = [];
      let current = chain;

      while (current) {
        evolutions.push({ name: current.species.name });
        current = current.evolves_to[0];
      }

      return evolutions;
    },
  },
  mounted() {
    this.fetchPokemon();
  },
};
</script>
