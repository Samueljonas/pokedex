<template>
  <div class="card text-center mb-3">
    <img
      :src="pokemon.sprites.front_default"
      class="card-img-top"
      :alt="pokemon.name"
    />
    <div class="card-body">
      <h5 class="card-title text-capitalize">{{ pokemon.name }}</h5>
      <router-link :to="´/pokemon/%{pokemon.id}`" class="btn btn-primary">
        {{ $t("viewDetails") }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["pokemon"],
};
</script>
