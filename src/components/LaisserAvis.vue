<template>
  <div
    id="exampleModal"
    class="modal show"
    role="dialog"
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
            v-model="stars"
            :star-size="25"
          />
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="$emit('close-send-rate')"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Laissez votre avis</span>
          </div>
          <textarea
            id="txt"
            v-model="comment"
            class="form-control"
            aria-label="With textarea"
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="$emit('close-send-rate')"
          >
            Fermer
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-dismiss="modal"
            @click="avisLaisse"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import starRating from 'vue-star-rating';

export default {
  name: 'LaisserAvis',
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
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      comment: '',
      stars: 0,
    };
  },
  methods: {
    avisLaisse() {
      this.$emit('avis-laisse', {
        comment: this.comment,
        stars: this.stars,
        index: this.index,
      });
      this.$emit('close-send-rate');
    },
  },

};
</script>
<style scoped>
.modal{
  display:block !important;
}
</style>
