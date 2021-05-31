<template>
  <div class="filters pa-4 pt-0">
    <form @submit.prevent="submitFilters">
      <v-autocomplete
        :disable-lookup="loadingAuthor"
        :items="authors"
        :loading="loadingAuthor"
        :search-input.sync="search"
        color="cyan darken-1"
        item-text="name"
        item-value="id"
        label="Ator ou Atriz:"
        no-data-text="Sem atores ou atrizes encontrados"
        placeholder="Começe a digitar para procurar"
        v-model="author"
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
      author: null,
      authors: [],
      genre: null,
      genres: [],
      loadingAuthor: false,
      loadingGenres: true,
      search: null,
      year: null,
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

    async submitFilters() {
      console.log("Author -> ", this.author);
      console.log("Ano -> ", this.year);
      console.log("Gênero -> ", this.genre);
    },
  },
  beforeMount() {
    this.generateYears();
    this.getGenres();
  },
  watch: {
    search(val) {
      if (this.loadingAuthor) return;

      if (val.length <= 3) return;

      this.loadingAuthor = true;

      const url = "http://localhost:3000/api/search/author";

      axios
        .get(url, {
          params: {
            author: val,
          },
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((res) => {
          const { authors } = res.data;
          this.authors = authors;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loadingAuthor = false;
        });
    },
  },
};
</script>

<style scoped lang="scss">
@import "./Filters.scss";
</style>
