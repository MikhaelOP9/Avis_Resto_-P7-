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
              <star-rating v-bind:star-size="25" :read-only="true" :rating="rate"></star-rating>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div
              class="modal-body"
            >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut, iste.</div>
            <div class="modal-footer">
              <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button> -->
            </div>
          </div>
        </div>
      </div>
</template>
<script>
import starRating from "vue-star-rating";
import $ from 'jquery';

export default {
    name: "restaurantRateListModal",
    props: {
        name: {
            type:String,
            required: true,

        },
        address: {
            type: String,
            required: true,
        },
        rates:{
            type: Array,
            required: true,
        },
        rate:{
            type: Number,
            required: true
        }
    },
    components:{
        starRating,
    },
    mounted (){
        $('#modalAvis').modal("show");
        $('#modalAvis').on("hide.bs.modal", ()=>{
            this.$emit("closeRates");
        })
    }
}

</script>
<style></style>