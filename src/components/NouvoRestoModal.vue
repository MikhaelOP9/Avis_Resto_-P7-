<template>
  <div
    class="bloc-modale"
  >
    <div class="modale card">
      <div
        class="btn-modale btn btn-danger"
        @click="$emit('close-send-nouvo-resto')"
      >
        X
      </div>
      <h2>Ajoutez un resto !</h2>
      <input
        v-model="name"
        class="form-control form-control-lg mt-2"
        type="text"
        placeholder="Nom"
      >
      <br>
      <input
        v-model="addressNumber"
        class="form-control form-control-lg mt-2"
        type="text"
        placeholder="Numero"
      >
      <input
        v-model="addressName"
        class="form-control form-control-lg mt-2"
        type="text"
        placeholder="Adresse"
      >
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          @click="$emit('close-send-nouvo-resto')"
        >
          Fermer
        </button>
        <button
          type="button"
          class="btn btn-primary"
          data-dismiss="modal"
          @click="nouvoResto"
        >
          Enregistrer
        </button>
      </div>
    </div>
  </div>
</template>
<script>

/*
   "photos":[
    {
      "height":683,
      "html_attributions":[
        "<a href=\"https://maps.google.com/maps/contrib/107243607673146406332\">Mamma Roma Oberkampf</a>"
      ],
      "width":1024
    },
    {
      "height":3024,
      "html_attributions":[
        "<a href=\"https://maps.google.com/maps/contrib/110671622940504369748\">Wenjie XU</a>"
      ],
      "width":3024
    },
    {
      "height":3000,
      "html_attributions":[
        "<a href=\"https://maps.google.com/maps/contrib/102734946616520189276\">Vincianne Ndom</a>"
      ],
      "width":4000
    },
    {
      "height":2988,
      "html_attributions":[
        "<a href=\"https://maps.google.com/maps/contrib/113642827214522606140\">Mohamed Ammour</a>"
      ],
      "width":5312
    },
    {
      "height":3024,
      "html_attributions":[
        "<a href=\"https://maps.google.com/maps/contrib/102395578146930217413\">laurent_a_paris</a>"
      ],
      "width":4032
    },
    {
      "height":3024,
      "html_attributions":[
        "<a href=\"https://maps.google.com/maps/contrib/102395578146930217413\">laurent_a_paris</a>"
      ],
      "width":4032
    },
    {
      "height":3024,
      "html_attributions":[
        "<a href=\"https://maps.google.com/maps/contrib/102395578146930217413\">laurent_a_paris</a>"
      ],
      "width":4032
    },
    {
      "height":3328,
      "html_attributions":[
        "<a href=\"https://maps.google.com/maps/contrib/108597091760497640786\">Veaceslav iacoboi</a>"
      ],
      "width":1872
    },
    {
      "height":4032,
      "html_attributions":[
        "<a href=\"https://maps.google.com/maps/contrib/111918180264265882296\">PIZZA ARTISANAL</a>"
      ],
      "width":3024
    },
    {
      "height":1536,
      "html_attributions":[
        "<a href=\"https://maps.google.com/maps/contrib/115222355321797306113\">Marine C</a>"
      ],
      "width":2560
    }
  ],
*/

export default {
  name: 'Modale',
  props: {
    position: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      name: '',
      addressNumber: '',
      addressName: '',
    };
  },
  methods: {
    nouvoResto() {
      const location = this.position;
      const restaurant = {
        geometry: {
          location: {
            lat() { return location.lat(); },
            lng() { return location.lng(); },
          },
        },
        name: this.name,
        rating: 0,
        address_components: [
          {
            long_name: this.addressNumber,
          },
          {
            long_name: this.addressName,
          },
        ],
        reviews: [],
      };
      this.$emit('nouvo-resto', restaurant);
      this.$emit('close-send-nouvo-resto');
    },
    openAddNewRestaurantModal() {
      this.modalNew_display = true;
    },
    closeAddNewRestaurantModal() {
      this.modalNew_display = false;
    },
  },
};
</script>
<style scoped>
.bloc-modale{
    position: fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    width:100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index:3;
}
.overlay{
    background: rgba(0,0,0,0.5);
    position: fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
}
.modale{
    background: #f1f1f1;
    color:#333;
    padding:50px;
    position: fixed;
    bottom:10%;
}
.btn-modale{
    position: absolute;
    top:10px;
    right:10px;
}
</style>
