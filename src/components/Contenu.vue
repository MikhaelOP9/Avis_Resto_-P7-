<template>
  <div class="container-fluid card row">
    <restaurantRateListModal
      v-if="modalInformations_display"
      :name="modalInformations_name"
      :address="modalInformations_address"
      :rates="modalInformations_rates"
      @close-rates="closeRestaurantRateListModal"
    />
    <div
      id="alignement"
      class="row-md"
    >
      <div
        id="alignRow"
      >
        <restaurantCard
          v-for="(restaurant, index) in restaurants"
          id="restaurantCard"
          :key="restaurant.id"
          :restaurant="restaurant"
          :index="index"
          class="container col-sm-6 col-md-6 col-lg-6 col-xl-6"
          @open-rates="openRestaurantRateListModal"
          @laisser-avis="openRestaurantSendRateModal"
        />
      </div>
      <restaurantSendRateModal
        v-if="modalRate_display"
        :name="modalRate_name"
        :address="modalRate_address"
        :index="modalRate_index"
        @close-send-rate="closeRestaurantSendRateModal"
        @avis-laisse="avisLaisse($event)"
      />
      <mapComponent
        id="map"
        class="container col-sm-6 col-md-6 col-lg-12 col-xl-12"
        @fetchedRestaurant="updateRestaurant"
      />
    </div>
  </div>
</template>
<script>
import restaurantSendRateModal from './LaisserAvis.vue';
import restaurantRateListModal from './RestaurantRateListModal.vue';
import mapComponent from './GoogleMap.vue';
import restaurantCard from './RestaurantCard.vue';

export default {
  name: 'Contenu',
  components: {
    restaurantCard,
    mapComponent,
    restaurantRateListModal,
    restaurantSendRateModal,
  },
  data() {
    return {
      restaurants: [],
      modalInformations_name: '',
      modalInformations_address: '',
      modalInformations_rates: [],
      modalInformations_display: false,
      modalRate_name: '',
      modalRate_address: '',
      modalRate_index: 0,
      modalRate_display: false,
      revele: false,
    };
  },
  methods: {
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
      this.modalRate_index = data.modalRate_index;
      this.modalRate_display = true;
    },
    closeRestaurantSendRateModal() {
      this.modalRate_display = false;
    },
    avisLaisse(data) {
      this.restaurants[data.index].reviews.push({
        text: data.comment,
        rating: data.stars,
      });
    },
    updateRestaurant(data) {
      this.restaurants.push(data);
    },
  },
};
</script>

<style scoped src="./Contenu.css">
</style>
