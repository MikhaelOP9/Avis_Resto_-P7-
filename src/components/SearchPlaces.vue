<template>
  <div
    class="form-inline mt-2 mb-2"
  >
    <form>
      <input
        v-model="searchValue"
        class="form-control mr-sm-2"
        type="text"
        placeholder="Rechercher une ville"
        name="search"
        @focus="resetAutoComplete"
      >
      <button
        class="btn btn-outline-success my-2 my-sm-0"
        type="submit"
        @click.stop.prevent="submitInput"
      >
        Rechercher
        <i
          class="fa fa-search"
        />
      </button>
    </form>
  </div>
</template>
<script>
import GoogleMapsInit from '../utils/GoogleMaps';

export default {
  name: 'SearchPlaces',
  data() {
    return {
      google: null,
      autoComplete: null,
      searchField: null,
      searchValue: '',
    };
  },
  async mounted() {
    this.google = await GoogleMapsInit();
    this.searchField = document.querySelector('input.form-control[name="search"]');
    // eslint-disable-next-line no-new
    this.autoComplete = new this.google.maps.places.Autocomplete(this.searchField, {
      types: ['(cities)'],
      componentRestrictions: {
        country: ['fr'],
      },
    });
    this.autoComplete.addListener('place_changed', () => {
      if (!this.searchValue) {
        return;
      }
      const selectedPlace = this.autoComplete.getPlace();
      if (!selectedPlace) {
        // eslint-disable-next-line no-alert
        window.alert(`${this.searchValue} n'a pas été trouvé dans la base de donnée des villes française`);
        return;
      }
      const position = selectedPlace.geometry.location;
      this.$emit('updatedSearchZone', position);
    });
  },
  methods: {
    submitInput() {
      this.google.maps.event.trigger(this.autoComplete, 'place_changed');
    },
    resetAutoComplete() {
      this.searchValue = '';
      this.autoComplete.set('place', null);
    },
  },
};

</script>
<style scoped>
  .form-inline{
    margin-left: 492px;
}
@media (max-width:1200px){
  .form-inline{
    margin-left: 313px;
}
}
@media (max-width:990px){
    .form-inline{
    margin-left: 73px;
}
}
</style>
