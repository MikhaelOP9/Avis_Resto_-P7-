<template>
  <div class="card mt-5 ml-1 w-100">
    <div
      @click.prevent.stop="$emit('open-rates', {
        modalInformations_name: name,
        modalInformations_address: address,
        modalInformations_rates: restaurant.reviews,
        modalInformations_rate: rate,
        modalInformations_lat: restaurant.geometry.location.lat(),
        modalInformations_lng: restaurant.geometry.location.lng(),
      })
      "
    >
      <b>{{ name }}</b>
      <br>
      {{ address }}
      <star-rating
        :star-size="25"
        :show-rating="false"
        :read-only="true"
        :rating="rating"
      />
      <button
        type="button"
        class="btn btn-primary mt-2"
        @click.prevent.stop="$emit('laisser-avis', {
          modalRate_name: name,
          modalRate_address: address,
          modalRate_index: index,
        })"
      >
        Laissez votre avis
      </button>
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating';

export default {
  name: 'RestaurantCard',
  components: {
    StarRating,
  },
  props: {
    restaurant: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      name: '',
      address: '',
      rating: '',
    };
  },
  computed: {
    rate() {
      const count = this.restaurant.reviews.length;
      let total = 0;
      this.restaurant.reviews.forEach((element) => {
        total += element.stars;
      });
      return total / count;
    },
    // filteredRestaurants() {
    //   return this.restaurants.filter((restaurant) => {
    //   //filtrer ici en fonction des filtres sélectionnés
    //   });
    // },
  },
  created() {
    this.name = this.restaurant.name;
    this.address = `${this.restaurant.address_components[0].long_name} ${this.restaurant.address_components[1].long_name}`;
    this.rating = this.restaurant.rating;
  },
  methods: {},
};
</script>

<style scoped>
.btn:not(:disabled):not(.disabled) {
  cursor: pointer;
  margin-bottom: 20px;
}
.mt-5, .my-5 {
  margin-top: 1rem !important;

}
.modal-title {
  margin-right: 20px;
}
p{
  margin-bottom: 0rem
}
</style>
