<template>
  <div class="container mt-4">
    <PokemonFilter @filter-change="applyFilters" />
    <div class="row">
      <div class="col-md-3" v-for="pokemon in pokemons" :key="pokemon.id">
        <PokemonCard :pokemon="pokemon" />
      </div>
    </div>
    <div ref="observer" class="mt-4 text-center" v-if="!endOfList">
      <span class="spinner-border"></span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PokemonCard from "@/components/PokemonCard.vue";
import PokemonFilter from "@/components/PokemonFilter.vue";

export default {
  components: { PokemonCard, PokemonFilter },
  data() {
    return {
      pokemons: [],
      offset: 0,
      limit: 20,
      filters: {},
      loading: false,
      endOfList: false,
    };
  },
  methods: {
    async loadPokemons() {
      if (this.loading || this.endOfList) return;
      this.loading = true;
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${this.offset}&limit=${this.limit}`
      );
      const details = await Promise.all(
        res.data.results.map((p) => axios.get(p.url).then((res) => res.data))
      );
      this.pokemons.push(...details);
      this.offset += this.limit;
      if (!res.data.next) this.endOfList = true;
      this.loading = false;
    },
    applyFilters(filters) {
      this.filters = filters;
      // implementar lógica para re-filtrar lista (filtragem client-side ou nova query)
    },
    initObserver() {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) this.loadPokemons();
      });
      observer.observe(this.$refs.observer);
    },
  },
  mounted() {
    this.loadPokemons();
    this.initObserver();
  },
};
</script>
