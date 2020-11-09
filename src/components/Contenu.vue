<template>
  <div
    id="cardGlobal"
    class="container-fluid card row"
  >
    <filtre-resto
      @filter-min-rate="setMinRate"
      @filter-max-rate="setMaxRate"
    />
    <restaurantRateListModal
      v-if="modalInformations_display"
      :name="modalInformations_name"
      :address="modalInformations_address"
      :rates="modalInformations_rates"
      :lat="modalInformations_lat"
      :lng="modalInformations_lng"
      @close-rates="closeRestaurantRateListModal"
    />
    <div
      id="alignement"
      class="row-md"
    >
      <div
        id="alignRow"
        class="row-md"
      >
        <restaurantCard
          v-for="(restaurant, index) in filteredRestaurants"
          id="restaurantCard"
          :key="restaurant.place_id"
          :restaurant="restaurant"
          :index="index"
          class="container col-7"
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
        class="container col-sm-12 col-md-12 col-lg-12 col-xl-12"
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
import filtreResto from './FiltreResto.vue';

export default {
  name: 'Contenu',
  components: {
    restaurantCard,
    mapComponent,
    restaurantRateListModal,
    restaurantSendRateModal,
    filtreResto,
  },
  data() {
    return {
      restaurants: [],
      modalInformations_name: '',
      modalInformations_address: '',
      modalInformations_rates: [],
      modalInformations_lat: 0,
      modalInformations_lng: 0,
      modalInformations_display: false,
      modalRate_name: '',
      modalRate_address: '',
      modalRate_index: 0,
      modalRate_display: false,
      revele: false,
      filterMinRate: 0,
      filterMaxRate: 5,
    };
  },
  computed: {
    filteredRestaurants() {
      return this.restaurants.filter((restaurant) => {
      // filtrer ici en fonction des filtres sélectionnés
        const rate = Math.ceil(restaurant.rating);
        const isInMinRange = (rate >= this.filterMinRate);
        const isInMaxRange = (rate <= this.filterMaxRate);
        const isInBound = (isInMinRange && isInMaxRange);
        if (isInBound) {
          // console.log({
          //   name: restaurant.name,
          //   initial: restaurant.rating,
          //   rate,
          //   isInMinRange,
          //   isInMaxRange,
          //   isInBound,
          // });
        }
        return isInBound;
      });
    },
  },
  methods: {
    openRestaurantRateListModal(data) {
      this.modalInformations_name = data.modalInformations_name;
      this.modalInformations_address = data.modalInformations_address;
      this.modalInformations_rates = data.modalInformations_rates;
      this.modalInformations_rate = data.modalInformations_rate;
      this.modalInformations_lat = data.modalInformations_lat;
      this.modalInformations_lng = data.modalInformations_lng;
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
    setMinRate(minRate) {
      this.filterMinRate = minRate;
    },
    setMaxRate(maxRate) {
      this.filterMaxRate = maxRate;
    },
  },
};
</script>

<style scoped src="./Contenu.css">
</style>
