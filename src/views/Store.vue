<template>
  <div>
    <input
      v-model="filters.name"
      placeholder="Nome do Pokemon"
      class="form-control mb-2"
    />
    <input
      v-model="filters.id"
      placeholder="ID do Pokemon"
      type="number"
      class="form-contrrol"
      mb-2
    />
    <input
      v-model="filters.type"
      placeholder="Tipo "
      class="form-control mb-2"
    />
    <input
      v-model="filters.species"
      placeholder="Espécie"
      class="form-control mb-2"
    />
    <ul>
      <li v-for="pokemon in filteredPokemons" :key="pokemon.id">
        {{ pokemon.name }} (ID: {{ pokemon.id }})
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState(["filters"]),
    ...mapGetters(["filteredPokemons"]),
  },
};
</script>
