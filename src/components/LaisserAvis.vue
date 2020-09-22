<template>
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
          <h5 class="modal-title" id="exampleModalLabel">
            <b>{{ name }}</b>
            {{ address }}
          </h5>
          <star-rating v-bind:star-size="25"></star-rating>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Laissez votre avis</span>
          </div>
          <textarea v-model="txt" class="form-control" aria-label="With textarea" id="txt"></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
          <button type="button" class="btn btn-primary" v-on:click='avisLaisse'>Enregistrer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import starRating from "vue-star-rating";
    import $ from "jquery";

export default {
  name: "laisserAvis",
  data(){
    return {
      txt:""
    }
  },
  methods:{
    avisLaisse(){
      console.log("test")
      this.$emit('avisLaisse', this.txt)
    }
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
  },
  components: {
    starRating,
  },
  mounted() {
    $("#exampleModal").modal("show");
    $("#exampleModal").on("hide.bs.modal", () => {
      this.$emit("closeSendRate");
    });
  },
};
      </script>
      <style></style>