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
    token: localStorage.token || "",
  },
  mutations: {
    searchMovie(state, params) {
      state.loading = true;
      axios
        .get(`${process.env.VUE_APP_API_URL}search/movie`, {
          params,
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
