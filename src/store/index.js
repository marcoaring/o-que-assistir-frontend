import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    genres: [],
    loading: false,
    movies: [],
    noMovieFound: false,
    selectedYear: null,
    showFilters: false,
    streamings: [],
    token: localStorage.token || "",
  },
  mutations: {
    searchMovie(
      state,
      params = {
        actors: null,
        year: null,
        genres: null,
        streamings: null,
      }
    ) {
      state.movies = [];
      state.selectedYear = null;
      state.loading = true;
      axios
        .get(`${process.env.VUE_APP_API_URL}search/movie`, {
          params,
        })
        .then((res) => {
          if (res.data.movies.length === 0) {
            state.noMovieFound = true;
          }

          if (res.data.selectedYear) {
            state.selectedYear = res.data.selectedYear;
          }

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
    setToken(state, token) {
      state.token = token;
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
      axios.get(`${process.env.VUE_APP_API_URL}films/genres`).then((res) => {
        commit("setGenres", res.data.genres);
      });
    },
    getStreamings({ commit }) {
      axios
        .get(`${process.env.VUE_APP_API_URL}films/streamings`)
        .then((res) => {
          commit("setStreamings", res.data.streamings);
        });
    },
  },
  modules: {},
});
