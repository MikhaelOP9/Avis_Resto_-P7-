<template>
  <div
    id="cardGlobal"
    class="container-fluid card row"
  >
    <div id="alignNavbar">
      <filtre-resto
        @filter-min-rate="setMinRate"
        @filter-max-rate="setMaxRate"
      />
      <search-places
        id="searchPlaces"
        @updatedSearchZone="updateSearchZone"
      />
    </div>
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
          class="container col-md-7"
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
        class="container col-12"
        :restaurants="filteredRestaurants"
        :position="userPos"
        @saveNewResto="createNewRestaurant"
        @open-rates="openRestaurantRateListModal"
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
import googleMapsInit from '../utils/GoogleMaps';
import searchPlaces from './SearchPlaces.vue';

export default {
  name: 'Contenu',
  components: {
    restaurantCard,
    mapComponent,
    restaurantRateListModal,
    restaurantSendRateModal,
    filtreResto,
    searchPlaces,
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
      google: null,
      places: null,
      pos: {
        lat: 0,
        lng: 0,
      },
      userPos: {
        lat: 0,
        lng: 0,
      },
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
  watch: {
    userPos: {
      handler() {
        this.pos = this.userPos;
      },
    },
    pos: {
      handler(newVal, oldVal) {
        const distance = this.calculateDistance(oldVal.lat, oldVal.lng, newVal.lat, newVal.lng);
        if (distance > 5000) {
          this.restaurants = [];
        }
        this.updateRestaurants();
      },
      deep: true,
    },
  },
  async mounted() {
    this.google = await googleMapsInit();
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      }, () => {
        this.userPos = {
          lat: 48.866667,
          lng: 2.333333,
        };
      });
    } else {
      this.userPos = {
        lat: 48.866667,
        lng: 2.333333,
      };
    }
  },
  methods: {
    handleLocationError(browserHasGeolocation, infoWindow, pos) {
      this.infoWindow.setPosition(pos);
      this.infoWindow.setContent(browserHasGeolocation
        ? 'Erreur: le service de geolocalisation n\'a pas fonctionné.'
        : 'Erreur: votre navigateur ne supporte pas la geolocalisation.');
      this.infoWindow.open(this.map);
    },
    getRestaurantDetails(restaurantId) {
      return new Promise((resolve) => {
        this.places.getDetails({
          placeId: restaurantId,
          // fields: ['rating', 'review'],
        }, (restaurantDetails) => {
          resolve(restaurantDetails);
        });
      });
    },
    delayGetRestaurantDetails() {
      return new Promise((resolve) => {
        window.setTimeout(resolve, 1000);
      });
    },
    updateRestaurants() {
      if (!this.places) {
        this.places = new this.google.maps.places.PlacesService(document.createElement('div'));
      }
      this.places.nearbySearch({
        location: {
          lat: this.pos.lat,
          lng: this.pos.lng,
        },
        radius: 250,
        type: 'restaurant',
      }, async (data) => {
        for (let i = 0; i < data.length; i += 1) {
          const restaurant = data[i];
          if (JSON.stringify(this.restaurants).indexOf(restaurant.name) === -1) {
            // eslint-disable-next-line
            await this.delayGetRestaurantDetails();
            // eslint-disable-next-line
            const restaurantDetails = await this.getRestaurantDetails(restaurant.place_id);
            this.restaurants.push({
              ...restaurant,
              ...restaurantDetails,
            });
          }
        }
      });
    },
    createNewRestaurant(data) {
      this.restaurants.push(data);
    },
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
    setMinRate(minRate) {
      this.filterMinRate = minRate;
    },
    setMaxRate(maxRate) {
      this.filterMaxRate = maxRate;
    },
    updateSearchZone(position) {
      this.pos = {
        lat: position.lat(),
        lng: position.lng(),
      };
      this.userPos = {
        lat: position.lat(),
        lng: position.lng(),
      };
    },
    calculateDistance(lat1, lng1, lat2, lng2) {
      const distance = this.google.maps.geometry.spherical.computeDistanceBetween(
        new this.google.maps.LatLng(lat1, lng1),
        new this.google.maps.LatLng(lat2, lng2),
      );
      return distance;
    },
  },
};
</script>

<style scoped src="./Contenu.css">
</style>
