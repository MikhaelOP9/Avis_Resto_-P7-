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
  props: {
    restaurants: {
      type: Array,
      required: true,
    },
    position: {
      type: Object,
      required: true,
    },
  },
  data() {
    return ({
      google: null,
      map: null,
      infoWindow: null,
      modalNew_display: false,
      modalNew_position: null,
      userMarker: null,
      restauMarkers: [],
    });
  },
  watch: {
    position: {
      handler() {
        console.log(this.position);
        this.map.setCenter(this.position);
        if (this.userMarker) {
          this.userMarker.setMap(null);
        }
        this.userMarker = new this.google.maps.Marker({
          position: {
            lat: this.position.lat,
            lng: this.position.lng,
          },
          map: this.map,
          title: 'position',
          icon: '/userPosition1.png',
        });
      },
      deep: true,
    },
    restaurants: {
      handler() {
        this.restauMarkers.forEach((marker) => {
          marker.setMap(null);
        });
        this.restaurants.forEach((restaurant) => {
          this.registerPlace(restaurant);
        });
      },
    },
  },
  async mounted() {
    this.google = await googleMapsInit();
    // const geocoder = new google.maps.Geocoder();
    const mapContainer = this.$el.querySelector('div#map');
    this.map = new this.google.maps.Map(mapContainer, {
      center: this.position,
      zoom: 16,
    });
    this.map.addListener('click', (e) => {
      this.placeMarkerAndPanTo(e.latLng);
    });

    this.infoWindow = new this.google.maps.InfoWindow();
    // eslint-disable-next-line
    const marker = new this.google.maps.Marker({
      position: {
        lat: this.position.lat,
        lng: this.position.lng,
      },
      map: this.map,
      title: 'position',
      icon: '/userPosition1.png',
    });
    this.map.setCenter({
      lat: this.position.lat,
      lng: this.position.lng,
    });
  },
  methods: {
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
      marker.addListener('click', () => {
        const count = restaurant.reviews.length;
        let total = 0;
        restaurant.reviews.forEach((element) => {
          total += element.stars;
        });
        const avgRate = total / count;
        this.$emit('open-rates', {
          modalInformations_name: restaurant.name,
          modalInformations_address: restaurant.address,
          modalInformations_rates: restaurant.reviews,
          modalInformations_rate: avgRate,
          modalInformations_lat: restaurant.geometry.location.lat(),
          modalInformations_lng: restaurant.geometry.location.lng(),
        });
      });
      this.restauMarkers.push(marker);
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
      // TODO: $emit to parent to save new resto
      this.$emit('saveNewResto', data);
    },
  },
};
</script>

<style scoped>
@media (max-width:1200px){
  #map {
    height:1000px;
    min-width:300px;
    width: 100%;
    margin-left:40px;
  }
}
@media (max-width:1000px){
  #map {
    height:1000px;
    min-width:300px;
    width: 100%;
    margin-left:100px;
  }
}
@media (max-width:770px){
  #map {
    height:1000px;
    min-width:300px;
    width: 100%;
    margin-left:140px;
  }
}
  #map {
    height:1000px;
    min-width:300px;
    width: 75%;
}
</style>
