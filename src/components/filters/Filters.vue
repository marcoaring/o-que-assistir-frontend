<template>
  <div class="filters pa-4 pt-0">
    <form @submit.prevent="submitFilters">
      <v-autocomplete
        :disable-lookup="loadingActor"
        :items="actors"
        :loading="loadingActor"
        :search-input.sync="search"
        color="cyan darken-1"
        item-text="name"
        item-value="id"
        label="Ator ou Atriz:"
        no-data-text="Sem atores ou atrizes encontrados"
        placeholder="Começe a digitar para procurar"
        v-model="actor"
      ></v-autocomplete>

      <v-select
        :items="yearsOptions"
        color="cyan darken-1"
        item-text="label"
        item-value="value"
        label="Ano:"
        placeholder="Escolha o ano de lançamento"
        v-model="year"
      ></v-select>

      <v-select
        :items="genres"
        :loading="loadingGenres"
        color="cyan darken-1"
        item-text="name"
        item-value="id"
        label="Gênero:"
        placeholder="Escolha o gênero"
        v-model="genre"
      ></v-select>

      <v-autocomplete
        :disable-lookup="loadingStreamings"
        :items="streamings"
        chips
        color="cyan darken-1"
        item-text="name"
        item-value="id"
        label="Streaming:"
        multiple
        placeholder="Escolha o streaming"
        v-model="streaming"
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
  props: ["toggleFilters"],
  data() {
    return {
      actor: null,
      actors: [],
      genre: null,
      genres: [],
      loadingActor: false,
      loadingGenres: true,
      loadingStreamings: true,
      search: null,
      streaming: null,
      streamings: [],
      year: null,
      yearsOptions: [],
    };
  },
  methods: {
    getGenres() {
      const url = "http://localhost:3000/api/films/genres";

      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((res) => {
          const { genres } = res.data;
          this.genres = genres;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loadingGenres = false;
        });
    },

    getStreamings() {
      const url = "http://localhost:3000/api/films/streamings";

      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((res) => {
          const { streamings } = res.data;
          this.streamings = streamings;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loadingStreamings = false;
        });
    },

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
      const index = this.streaming.indexOf(item.id);
      if (index >= 0) this.streaming.splice(index, 1);
    },

    async submitFilters() {
      this.toggleFilters();
      console.log("Ator ou Atriz -> ", this.actor);
      console.log("Ano -> ", this.year);
      console.log("Gênero -> ", this.genre);
      console.log("Streaming -> ", this.streaming.toString());
    },
  },
  beforeMount() {
    this.generateYears();
    this.getGenres();
    this.getStreamings();
  },
  watch: {
    search(val) {
      if (this.loadingActor) return;

      if (val.length <= 3) return;

      this.loadingActor = true;

      const url = "http://localhost:3000/api/search/actor";

      axios
        .get(url, {
          params: {
            actor: val,
          },
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((res) => {
          const { actors } = res.data;
          this.actors = actors;
        })
        .catch((err) => {
          console.log(err);
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
