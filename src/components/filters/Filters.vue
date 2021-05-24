<template>
  <div class="filters">
    <section class="main">
      <div class="filters__header header" v-on:click="toggleFilters">
        <span class="header__title">Filtros:</span>
        <img alt="Ícone de Filtragem" class="header__icon" src="../../assets/icon-filter.svg" />
      </div>
      <form class="form" v-if="showFilters">
        <div class="form__field field">
          <label for="author" class="field__label">Ator ou Atriz:</label>
          <input
            class="field__input"
            name="author"
            placeholder="Digite o nome de ator ou atriz"
            v-model="author"
          />
        </div>

        <div class="form__field field">
          <label for="author" class="field__label">Ano:</label>
          <select class="field__select" name="year" v-model="year">
            <option
              :key="year.value"
              :selected="year.selected"
              :value="year.value"
              v-for="year in yearsOptions"
              >{{ year.label }}</option
            >
          </select>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Filters',
  // props: {
  //   msg: String,
  // },
  data() {
    return {
      author: '',
      year: '',
      showFilters: false,
      yearsOptions: [
        {
          label: 'Escolha o ano de lançamento',
          selected: true,
          value: '',
        },
      ],
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
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
  },
  beforeMount() {
    this.generateYears();
  },
};
</script>

<style scoped lang="scss">
@import './Filters.scss';
</style>
