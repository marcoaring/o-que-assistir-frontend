<template>
  <div class="filters pa-4 pt-0">
    <form @submit.prevent="submitFilters">
      <v-autocomplete
        :disable-lookup="loadingActor"
        :items="actors"
        :loading="loadingActor"
        :search-input.sync="searchActor"
        color="cyan darken-1"
        item-text="name"
        item-value="id"
        label="Ator ou Atriz:"
        no-data-text="Sem atores ou atrizes encontrados"
        placeholder="Começe a digitar para procurar"
        v-model="params.actors"
      ></v-autocomplete>

      <v-select
        :items="yearsOptions"
        color="cyan darken-1"
        item-text="label"
        item-value="value"
        label="Ano:"
        placeholder="Escolha o ano de lançamento"
        v-model="params.year"
      ></v-select>

      <v-select
        :items="this.$store.state.genres"
        color="cyan darken-1"
        item-text="name"
        item-value="id"
        label="Gênero:"
        placeholder="Escolha o gênero"
        v-model="params.genres"
      ></v-select>

      <v-autocomplete
        :items="this.$store.state.streamings"
        chips
        color="cyan darken-1"
        hide-selected
        item-text="name"
        item-value="id"
        label="Streaming:"
        menu-props="closeOnContentClick"
        multiple
        placeholder="Escolha o streaming"
        v-model="params.streamings"
      >
        <template v-slot:selection="data">
          <v-chip
            :input-value="data.selected"
            @click:close="remove(data.item)"
            @click="data.select"
            close
            v-bind="data.attrs"
          >
            <v-avatar left>
              <v-img :src="data.item.logo"></v-img>
            </v-avatar>
            {{ data.item.name }}
          </v-chip>
        </template>
        <template v-slot:item="data">
          <template>
            <v-list-item-avatar>
              <img :src="data.item.logo" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="data.item.name"></v-list-item-title>
            </v-list-item-content>
          </template>
        </template>
      </v-autocomplete>

      <v-btn color="cyan darken-1" elevation="2" type="submit" block dark
        >Filtrar</v-btn
      >
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Filters",
  data() {
    return {
      params: {
        actors: null,
        year: null,
        genres: null,
        streamings: null,
      },
      actors: [],
      loadingActor: false,
      searchActor: null,
      yearsOptions: [],
    };
  },
  methods: {
    generateYears() {
      const firstYear = 1885;
      let currentYear = new Date().getFullYear();

      while (currentYear >= firstYear) {
        this.yearsOptions.push({
          label: currentYear,
          selected: false,
          value: currentYear,
        });
        currentYear--;
      }
    },

    remove(item) {
      const index = this.params.streamings.indexOf(item.id);
      if (index >= 0) this.params.streamings.splice(index, 1);
    },

    async submitFilters() {
      this.params.streamings = this.params.streamings
        ? this.params.streamings.toString()
        : this.params.streamings;

      this.$store.commit("toggleFilters");
      this.$store.commit("searchMovie", this.params);
    },
  },
  beforeMount() {
    this.generateYears();
    this.$store.dispatch("getGenres");
    this.$store.dispatch("getStreamings");
  },
  watch: {
    searchActor(val) {
      if (this.loadingActor) return;

      if (val.length <= 3) return;

      this.loadingActor = true;

      axios
        .get(`${process.env.VUE_APP_API_URL}search/actor`, {
          params: {
            actor: val,
          },
        })
        .then((res) => {
          const { actors } = res.data;
          this.actors = actors;
        })
        .finally(() => {
          this.loadingActor = false;
        });
    },
  },
};
</script>

<style scoped lang="scss">
@import "./Filters.scss";
</style>
