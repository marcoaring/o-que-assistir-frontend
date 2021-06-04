import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    genres: [],
    loading: false,
    movies: [],
    showFilters: false,
    streamings: [],
  },
  mutations: {
    searchMovie(state, params) {
      state.loading = true;
      axios
        .get("http://localhost:3000/api/search/movie", {
          params,
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((res) => {
          state.movies = res.data.movies;
        })
        .finally(() => {
          state.loading = false;
        });
    },
    setGenres(state, genres) {
      state.genres = genres;
    },
    setStreamings(state, streamings) {
      state.streamings = streamings;
    },
    toggleFilters(state) {
      state.showFilters = !state.showFilters;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
  },
  actions: {
    getGenres({ commit }) {
      axios
        .get("http://localhost:3000/api/films/genres", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((res) => {
          commit("setGenres", res.data.genres);
        });
    },
    getStreamings({ commit }) {
      axios
        .get("http://localhost:3000/api/films/streamings", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((res) => {
          commit("setStreamings", res.data.streamings);
        });
    },
  },
  modules: {},
});
