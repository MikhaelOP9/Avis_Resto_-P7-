<template>
  <div
    id="modalAvis"
    class="modal show"
    tabindex="99"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div
      id="RestaurantRateListModal"
      class="modal-dialog"
      role="document"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5
            id="exampleModalLabel"
            class="modal-title"
          >
            <b>{{ name }}</b>
            {{ address }}
          </h5>
          <star-rating
            :star-size="25"
            :show-rating="false"
            :read-only="true"
            :rating="rating"
          />
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="$emit('close-rates')"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <img
          :src="`https://maps.googleapis.com/maps/api/streetview?size=300x300&location=${lat},${lng}&key=AIzaSyDfFBkQLiNONnJ4y_safmg4m1XQfHf6Uqo`"
          alt="Street view"
        >
        <div
          v-for="(note, index) in rates"
          :key="index"
          class="modal-body"
        >
          {{ note.text }}
          <br>
          <star-rating
            :star-size="25"
            :read-only="true"
            :show-rating="false"
            :rating="note.rating"
          />
        </div>
        <div
          class="modal-footer"
        />
      </div>
    </div>
  </div>
</template>
<script>
import starRating from 'vue-star-rating';

export default {
  name: 'RestaurantRateListModal',
  components: {
    starRating,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    rates: {
      type: Array,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  computed: {
    rating() {
      const count = this.rates.length;
      let total = 0;
      this.rates.forEach((element) => {
        total += element.rating;
      });
      return total / count;
    },
  },
};
</script>
<style>
.modal {
  display: block !important;
}
#RestaurantRateListModal {
    height: 500px;
    overflow-y: scroll;
    pointer-events: auto !important;
}
</style>
