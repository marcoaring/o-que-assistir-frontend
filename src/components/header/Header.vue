<template>
  <div>
    <v-toolbar color="cyan darken-1" dark>
      <v-toolbar-title class="text-uppercase">O que assistir?</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn v-on:click="toggleFilters" icon>
        <v-icon>mdi-filter</v-icon>
      </v-btn>
    </v-toolbar>

    <Filters v-show="this.$store.state.showFilters" />
  </div>
</template>

<script>
import Filters from "@/components/filters/Filters.vue";

export default {
  name: "Header",
  components: {
    Filters,
  },
  methods: {
    toggleFilters() {
      this.$store.commit("toggleFilters");
    },
  },
};
</script>
