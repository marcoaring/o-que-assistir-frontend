<template>
  <div class="home">
    <Header />
    <MovieCard v-if="this.$store.state.movies.length > 0" />

    <div class="d-flex justify-center mt-10" v-if="this.$store.state.loading">
      <v-progress-circular color="cyan" indeterminate></v-progress-circular>
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
};
</script>
