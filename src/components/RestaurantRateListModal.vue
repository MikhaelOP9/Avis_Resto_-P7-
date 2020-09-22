<template>
  <div
    class="modal fade"
    id="modalAvis"
    tabindex="99"
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
          <star-rating :star-size="25" :read-only="true" :show-rating="false" :rating="rate"></star-rating>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" v-for="(note, index) in rates" :key="index"> 
          {{note.comment}}  
          <br> 
          <star-rating :star-size="25" :read-only="true" :show-rating="false" :rating="note.stars"></star-rating>  
        </div>
        <!-- <div class="modal-body" v-for="(note, index) in rates" :key="index"> {{note.stars}}</div> -->
          <!-- //v-for qui boucle sur la variable rates (avis ou note in rates) à la place du lorem 
          faire un $emit de l'avis qui est laissé, et dans contenu.vue faire un console.log dudit avis-->
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import starRating from "vue-star-rating";
import $ from "jquery";

export default {
  name: "restaurantRateListModal",
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
  components: {
    starRating,
  },
  // beforeMount(){
  //   this.name = this.$props.name;
  //   this.address = this.$props.address;
  //   this.rates = this.$props.rates;
  //   this.rate = this.$props.rate;
  // },
  mounted() {
    console.log(this.rates)
    $("#modalAvis").modal("show");
    $("#modalAvis").on("hide.bs.modal", () => {
      this.$emit("closeRates");
    });
  },
};
</script>
<style></style>