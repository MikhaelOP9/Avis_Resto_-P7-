<template>
  <div class="container card">
    <restaurantRateListModal
      :name="modalInformations_name"
      :address="modalInformations_address"
      :rates="modalInformations_rates"
      :rate="modalInformations_rate"
      v-if="modalInformations_display"
      v-on:closeRates="closeRestaurantRateListModal"
    />
    <div id="alignement">
      <div class="row-md" id="alignRow">
        <restaurantCard
          :key="restaurant.id"
          v-for="restaurant in restaurants"
          :restaurant="restaurant"
          class="container"
          v-on:openRates="openRestaurantRateListModal"
          v-on:laisserAvis="openRestaurantSendRateModal"
        />
      </div>
      <restaurantSendRateModal 
        :name="modalRate_name"
        :address="modalRate_address"
        v-if="modalRate_display" 
        v-on:closeSendRate="closeRestaurantSendRateModal"
        v-on:avisLaisse="avisLaisse($event)"
      ></restaurantSendRateModal>

      <mapComponent></mapComponent>
    </div>
  </div>
</template>
<script>
import restaurantSendRateModal from "./LaisserAvis";
import restaurantRateListModal from "./RestaurantRateListModal";
import mapComponent from "./GoogleMap";
import restaurantCard from "./RestaurantCard";

export default {
  components: {
    restaurantCard,
    mapComponent,
    restaurantRateListModal,
    restaurantSendRateModal,
  },

  name: "Contenu",
  data() {
    return {
      restaurants: [],
      modalInformations_name: "",
      modalInformations_address: "",
      modalInformations_rates: [],
      modalInformations_rate: 0,
      modalInformations_display: false,
      modalRate_name: "",
      modalRate_address: "",
      modalRate_display: false,
    };
  },

  methods: {
    getRestauData() {
      fetch("data.json")
        .then((response) => response.json())
        .then((data) => (this.restaurants = data));
      // console.log(this.restaurant.restaurantName)
      // console.log(this.restaurants[1].restaurantName)
    },
    openRestaurantRateListModal(data) {
      this.modalInformations_name = data.modalInformations_name;
      this.modalInformations_address = data.modalInformations_address;
      this.modalInformations_rates = data.modalInformations_rates;
      this.modalInformations_rate = data.modalInformations_rate;
      this.modalInformations_display = true;
    },
    closeRestaurantRateListModal() {
      this.modalInformations_display = false;
    },
    openRestaurantSendRateModal(data) {
      this.modalRate_name = data.modalRate_name;
      this.modalRate_address = data.modalRate_address;
      this.modalRate_display = true;
    },
    closeRestaurantSendRateModal() {
      this.modalRate_display = false;
    },
    avisLaisse(blahblah){
      console.log(blahblah)
    }
  }, 
    created() {
    this.getRestauData();
  },
};
</script>

<style scoped src="./Contenu.css">
</style>