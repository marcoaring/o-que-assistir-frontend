<template>
  <div class="home">
    <Header />
    <Filters />
  </div>
</template>

<script>
import Header from '@/components/header/Header.vue';
import Filters from '@/components/filters/Filters.vue';

export default {
  name: 'Home',
  components: {
    Filters,
    Header,
  },
};
</script>
