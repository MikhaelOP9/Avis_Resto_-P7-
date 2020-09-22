<template>
  <div class="card mt-5 ml-1 w-100">
    <div
      @click.prevent.stop="$emit('openRates', {
        modalInformations_name: name,
        modalInformations_address: address,
        modalInformations_rates: restaurant.ratings,
        modalInformations_rate: rate,   
      })
    ">
      <b>{{ name }}</b>
      <br/>
      {{ address }}
      <p>
        <i>{{ nbAvis }} Avis</i>
      </p>
      
      <star-rating v-bind:star-size="25" :show-rating="false" :read-only="true" :rating="rate"></star-rating>
      <button
        type="button"
        class="btn btn-primary mt-3"
        @click.prevent.stop="$emit('laisserAvis', {
          modalRate_name: name,
          modalRate_address: address,
        })"
      >Laissez votre avis</button>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";

export default {
  name: "restaurantCard",
  props: {
    restaurant: {
      type: Object,
      required: true,
    },
  },
  components: {
    StarRating,
  },
  data() {
    return {
      name: "",
      address: "",
      moyStars: "",
    };
  },
  methods: {},
  computed: {
    rate() {
      let count = this.restaurant.ratings.length;
      let total = 0;
      this.restaurant.ratings.forEach((element) => {
        total += element.stars;
      });
      return total / count;
    },
    nbAvis() {
      let count = this.restaurant.ratings.length;
      return count;
    },
  },
  created() {
    this.name = this.restaurant.restaurantName;
    this.address = this.restaurant.address;
  },
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
</style>