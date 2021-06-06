<template>
  <div class="home">
    <Header />

    <MovieCard v-if="this.$store.state.movies.length > 0" />

    <div class="content">
      <div
        class="text-center"
        v-show="
          this.$store.state.movies.length === 0 && !this.$store.state.loading
        "
      >
        <p>Olá <strong>nome-usuario</strong>, bem vindo a busca por filmes.</p>
        <p>
          Você pode utilizar o
          <strong>ícone de filtro</strong>(<v-icon>mdi-filter</v-icon>) no topo
          da página para encontrar o filme perfeito para o seu humor ou clicar
          no botão abaixo.
        </p>

        <v-btn
          v-on:click="searchMovie"
          :elevation="15"
          class="pa-7 mb-7 rounded-circle search-film"
          color="cyan darken-1"
          dark
          depressed
          >Buscar<br />Filme</v-btn
        >

        <p>
          O botão acima irá gerar um ano aleatório entre <strong>1885</strong> e
          <strong>{{ new Date().getFullYear() }}</strong>
          (o ano atual) e retornará o filme mais bem avaliado do ano
          selecionado.
        </p>
      </div>

      <div class="d-flex justify-center mt-10" v-if="this.$store.state.loading">
        <v-progress-circular color="cyan" indeterminate></v-progress-circular>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import MovieCard from "@/components/movie-card/MovieCard.vue";

export default {
  name: "Home",
  components: {
    Header,
    MovieCard,
  },
  methods: {
    async searchMovie() {
      this.$store.commit("searchMovie");
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  height: 100%;
  position: relative;

  .content {
    align-items: center;
    display: flex;
    flex-flow: column;
    justify-content: center;
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate(50%, -50%);
    width: 100%;

    p {
      font-size: 0.8rem;
      padding: 0 15px;
      text-align: left;
      width: 100%;
    }

    .search-film {
      width: 150px;
      height: 150px;
      font-size: 1.4rem;
    }
  }
}
</style>
