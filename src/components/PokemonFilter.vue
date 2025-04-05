<template>
  <div class="mb-4 d-flex flex-column flex-md-row gap-2">
    <input
      type="text"
      class="form-control"
      v-model="filters.name"
      @input="emitFilters"
      :placeholder="$t('name')"
    />
    <input
      type="number"
      class="form-control"
      v-model="filters.id"
      @input="emitFilters"
      :placeholder="$t('id')"
    />
    <select class="form-control" v-model="filters.type" @change="emitFilters">
      <option value="">{{ $t("allTypes") }}</option>
      <option v-for="type in types" :key="type.name" :value="type.name">
        {{ type.name }}
      </option>
    </select>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      filters: {
        name: "",
        id: "",
        type: "",
      },
      types: [],
    };
  },
  created() {
    axios.get("https://pokeapi.co/api/v2/type").then((res) => {
      this.types = res.data.results;
    });
  },
  methods: {
    emitFilters() {
      this.$emit("filter-change", this.filters);
    },
  },
};
</script>
