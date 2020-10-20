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
            :read-only="true"
            :show-rating="false"
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
    rate: {
      type: Number,
      required: true,
    },
  },
};
</script>
<style>
.modal {
  display: block !important;
}
</style>
