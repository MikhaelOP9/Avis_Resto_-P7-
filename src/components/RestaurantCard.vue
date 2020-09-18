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
      <br />
      {{ address }}
      <p>
        <i>{{ nbAvis }} Avis</i>
      </p>
      <!-- nombre d'avis : (computed qui retourne length de this.restaurant.ratings) + creer
      une nouvelle modale qui affiche les détails réstau avec avis + bouton laisser un avis-->
      <star-rating v-bind:star-size="25" :show-rating="false" :read-only="true" :rating="rate"></star-rating>
      <button
        type="button"
        class="btn btn-primary mt-3"
        data-toggle="modal"
        data-target="#exampleModal"
      >Laissez votre avis</button>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel"></h5>
              <star-rating v-bind:star-size="25"></star-rating>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">Laissez votre avis</span>
              </div>
              <textarea class="form-control" aria-label="With textarea"></textarea>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
              <button type="button" class="btn btn-primary">Enregistrer</button>
            </div>
          </div>
        </div>
      </div>
     
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
.mt-5,
.my-5 {
  margin-top: 1rem !important;
  padding-right: 100px;
}
.modal-title {
  margin-right: 20px;
}
</style>