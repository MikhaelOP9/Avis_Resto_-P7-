<template>
  <div class="card mt-5 ml-1 w-100">
    <div
      @click.prevent.stop="$emit('open-rates', {
        modalInformations_name: name,
        modalInformations_address: address,
        modalInformations_rates: restaurant.reviews,
        modalInformations_rate: rate,
      })
      "
    >
      <b>{{ name }}</b>
      <br>
      {{ address }}
      <p>
        <i>{{ nbAvis }} Avis</i>
      </p>
      <star-rating
        :star-size="25"
        :show-rating="false"
        :read-only="true"
        :rating="moyStars"
      />
      <button
        type="button"
        class="btn btn-primary mt-3"
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
      moyStars: '',
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
    nbAvis() {
      const count = this.restaurant.reviews.length;
      return count;
    },
  },
  created() {
    this.name = this.restaurant.name;
    this.address = `${this.restaurant.address_components[0].long_name} ${this.restaurant.address_components[1].long_name}`;
    this.moyStars = this.restaurant.rating;
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
  padding-right: 100px;
}
.modal-title {
  margin-right: 20px;
}
p{
  margin-bottom: 0rem
}
</style>
