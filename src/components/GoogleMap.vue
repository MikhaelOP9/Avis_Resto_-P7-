<template>
  <div id="map" />
</template>

<script>
import googleMapsInit from '../utils/GoogleMaps';

export default {
  data() {
    return ({
      google: null,
      map: null,
      infoWindow: null,
      places: null,
      restaurants: [],
      lat: 0,
      lng: 0,
    });
  },
  watch: {
    restaurants(restaurants) {
      this.registerPlaces(restaurants);
    },
    lat() {
      this.updateRestaurants();
    },
    // lng() {
    //   this.updateRestaurants();
    // },
  },
  async mounted() {
    try {
      this.google = await googleMapsInit();
      // const geocoder = new google.maps.Geocoder();
      this.map = new this.google.maps.Map(this.$el, {
        center: { lat: 48.866667, lng: 2.333333 },
        zoom: 16,
      });
      this.infoWindow = new this.google.maps.InfoWindow();

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.infoWindow.setPosition({
            lat: this.lat,
            lng: this.lng,
          });
          this.infoWindow.setContent('Position trouvée.');
          this.infoWindow.open(this.map);
          this.map.setCenter({
            lat: this.lat,
            lng: this.lng,
          });
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
        ? 'Erreur: le service de geolocalisation n\'a pas fonctionné.'
        : 'Erreur: votre navigateur ne supporte pas la geolocalisation.');
      this.infoWindow.open(this.map);
    },
    updateRestaurants() {
      this.places = new this.google.maps.places.PlacesService(document.createElement('div'));
      this.places.nearbySearch({
        location: {
          lat: this.lat,
          lng: this.lng,
        },
        radius: 500,
        type: 'restaurant',
      }, (data) => {
        data.forEach((restaurant, index) => {
          window.setTimeout(() => {
            this.places.getDetails({
              placeId: restaurant.place_id,
              // fields: ['rating', 'review'],
            }, (restaurantDetails) => {
              this.restaurants.push({
                ...restaurant,
                ...restaurantDetails,
              });
            });
          }, 1000 * index);
        });
      });
    },
    registerPlaces(data) {
      console.log('data', data);
      data.forEach((restaurant, index) => {
        if (this.restaurants[index].markerCreated) return;
        this.restaurants[index].markerCreated = true;
        const coords = restaurant.geometry.location;
        // eslint-disable-next-line
        const position = new this.google.maps.LatLng(coords[1], coords[0]);
        const marker = new this.google.maps.Marker({
          position,
          map: this.map,
        });
        console.log('marker', marker, 'position', position);
      });
      this.$emit('fetchedRestaurants', data);
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
