<template>
  <div id="map" />
</template>

<script>
import googleMapsInit from '../utils/GoogleMaps';

export default {
  data() {
    return ({
      map: null,
      infoWindow: null,
      restaurants: [],
    });
  },
  beforeMount() { this.getRestauData(); },
  async mounted() {
    try {
      const google = await googleMapsInit();
      // const geocoder = new google.maps.Geocoder();
      this.map = new google.maps.Map(this.$el, {
        center: { lat: 48.866667, lng: 2.333333 },
        zoom: 14,
      });
      this.infoWindow = new google.maps.InfoWindow();

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          this.infoWindow.setPosition(pos);
          this.infoWindow.setContent('Location found.');
          this.infoWindow.open(this.map);
          this.map.setCenter(pos);
        }, () => {
          this.handleLocationError(true, this.infoWindow, this.map.getCenter());
        });
      }
    } catch (e) {
      // console.error(e);
    }
  },
  methods: {
    handleLocationError(browserHasGeolocation, infoWindow, pos) {
      this.infoWindow.setPosition(pos);
      this.infoWindow.setContent(browserHasGeolocation
        ? 'Error: The Geolocation service failed.'
        : 'Error: Your browser doesn\'t support geolocation.');
      this.infoWindow.open(this.map);
    },
    getRestauData() {
      fetch('data.json')
        .then((response) => response.json())
        .then((data) => {
          this.restaurants = data;
          this.$emit('fetchedRestaurants', this.restaurants);
        });
    },
  },
};
</script>

<style scoped>
#map {

    width : 1000vw;
    height: 1000px;
}
</style>
