<template>
  <div class="px-4">
    <v-card class="ma-3 mt-8 mx-auto justify-center">
      <v-img
        :src="
          this.$store.state.movies[0].background ||
          this.$store.state.movies[0].poster
        "
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.9)"
        height="275px"
      >
        <v-avatar class="tag" color="cyan darken-1" size="48">
          <div class="white--text font-weight-bold">
            {{ this.$store.state.movies[0].vote }}
          </div>
          <div class="white--text text-uppercase font-weight-bold tag-note">
            Nota
          </div>
        </v-avatar>
        <v-card-title v-text="this.$store.state.movies[0].title"></v-card-title>
      </v-img>

      <v-card-actions
        v-if="
          this.$store.state.movies[0].streamings &&
          this.$store.state.movies[0].streamings.flatrate.length > 0
        "
      >
        <div
          class="
            align-center
            d-flex
            font-weight-bold
            mx-2
            tag-note
            text-uppercase
          "
        >
          Assista em:
          <v-tooltip
            top
            v-for="streaming in this.$store.state.movies[0].streamings.flatrate"
            :key="streaming.id"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-img
                :src="streaming.logo"
                width="30px"
                class="mx-2 rounded-circle"
                v-bind="attrs"
                v-on="on"
              >
              </v-img>
            </template>
            <span>{{ streaming.name }}</span>
          </v-tooltip>
        </div>
      </v-card-actions>

      <v-divider
        class="mx-4"
        v-if="
          this.$store.state.movies[0].streamings &&
          this.$store.state.movies[0].streamings.flatrate.length > 0
        "
      ></v-divider>

      <v-card-actions class="justify-end">
        <!-- <v-btn color="cyan darken-1" text>Saber Mais</v-btn> -->
        <v-btn color="light-blue darken-4" text>Já assisti!</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "MovieCard",
};
</script>

<style scoped lang="scss">
.tag {
  flex-direction: column;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1;

  &-note {
    font-size: 10px;
  }
}
</style>
