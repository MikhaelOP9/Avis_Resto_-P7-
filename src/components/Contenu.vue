<template>
  <div class="container card">
    <restaurantRateListModal
      v-if="modalInformations_display"
      :name="modalInformations_name"
      :address="modalInformations_address"
      :rates="modalInformations_rates"
      :rate="modalInformations_rate"
      @close-rates="closeRestaurantRateListModal"
    />
    <div id="alignement">
      <div
        id="alignRow"
        class="row-md"
      >
        <restaurantCard
          v-for="(restaurant, index) in restaurants"
          :key="restaurant.id"
          :restaurant="restaurant"
          :index="index"
          class="container"
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
      <mapComponent @fetchedRestaurant="updateRestaurant" />
      <modale
        :revele="revele"
        :toggle-modale="toggleModale"
      />
      <div
        class="btn btn-success"
        @click="toggleModale"
      >
        ajoutez un resto!
      </div>
    </div>
  </div>
</template>
<script>
import restaurantSendRateModal from './LaisserAvis.vue';
import restaurantRateListModal from './RestaurantRateListModal.vue';
import mapComponent from './GoogleMap.vue';
import restaurantCard from './RestaurantCard.vue';
import modale from './NouvoRestoModal.vue';

export default {
  name: 'Contenu',
  components: {
    restaurantCard,
    mapComponent,
    restaurantRateListModal,
    restaurantSendRateModal,
    modale,
  },
  data() {
    return {
      restaurants: [],
      modalInformations_name: '',
      modalInformations_address: '',
      modalInformations_rates: [],
      modalInformations_rate: 0,
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
    toggleModale() {
      this.revele = !this.revele;
    },
  },

};
</script>

<style scoped src="./Contenu.css">
</style>
