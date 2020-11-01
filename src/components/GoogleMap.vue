<template>
  <div>
    <modale
      v-if="modalNew_display"
      :position="modalNew_position"
      @close-send-nouvo-resto="closeAddNewRestaurantModal"
      @nouvo-resto="addNewRestaurant($event)"
    />
    <div
      id="map"
    />
  </div>
</template>

<script>
import googleMapsInit from '../utils/GoogleMaps';
import Modale from './NouvoRestoModal.vue';

export default {
  components: {
    Modale,
  },
  data() {
    return ({
      google: null,
      map: null,
      infoWindow: null,
      places: null,
      restaurants: [],
      pos: {
        lat: 0,
        lng: 0,
      },
      modalNew_display: false,
      modalNew_position: null,
    });
  },
  watch: {
    pos: {
      handler() {
        this.updateRestaurants();
      },
      deep: true,
    },
  },
  async mounted() {
    this.google = await googleMapsInit();
    // const geocoder = new google.maps.Geocoder();
    const mapContainer = this.$el.querySelector('div#map');
    this.map = new this.google.maps.Map(mapContainer, {
      center: { lat: 48.866667, lng: 2.333333 },
      zoom: 16,
    });
    this.map.addListener('click', (e) => {
      this.placeMarkerAndPanTo(e.latLng);
    });

    this.infoWindow = new this.google.maps.InfoWindow();

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // eslint-disable-next-line
        const marker = new this.google.maps.Marker({
          position: {
            lat: this.pos.lat,
            lng: this.pos.lng,
          },
          map: this.map,
          title: 'position',
          icon: '/userPosition1.png',
        });
        this.map.setCenter({
          lat: this.pos.lat,
          lng: this.pos.lng,
        });
      }, () => {
        this.handleLocationError(true, this.infoWindow, this.map.getCenter());
      });
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
        this.places = new this.google.maps.places.PlacesService(this.map);
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
            this.registerPlace({
              ...restaurant,
              ...restaurantDetails,
            });
          }
        }
      });
    },
    registerPlace(restaurant) {
      const coords = restaurant.geometry.location;
      // eslint-disable-next-line
      const marker = new this.google.maps.Marker({
        position: {
          lat: coords.lat(),
          lng: coords.lng(),
        },
        map: this.map,
        title: restaurant.name,
      });
      this.$emit('fetchedRestaurant', restaurant);
    },
    placeMarkerAndPanTo(latLng) {
      this.map.panTo(latLng);
      // eslint-disable-next-line no-new
      this.openAddNewRestaurantModal(latLng);
    },
    openAddNewRestaurantModal(position) {
      this.modalNew_position = position;
      this.modalNew_display = true;
    },
    closeAddNewRestaurantModal() {
      this.modalNew_display = false;
    },
    addNewRestaurant(data) {
      this.restaurants.push({
        ...data,
      });
      this.registerPlace({
        ...data,
      });
    },
  },
};
</script>

<style scoped>
#map {
    width : 100%;
    height:1000px;
    min-width:300px;
}
</style>
