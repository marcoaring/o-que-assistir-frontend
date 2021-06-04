import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showFilters: false,
  },
  mutations: {
    toggleFilters(state) {
      state.showFilters = !state.showFilters;
    },
  },
  actions: {},
  modules: {},
});
