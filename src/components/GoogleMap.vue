<template>
  <div
    id="map"
  />
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
      pos: {
        lat: 0,
        lng: 0,
      },
      revele: false,
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
    try {
      this.google = await googleMapsInit();
      // const geocoder = new google.maps.Geocoder();
      this.map = new this.google.maps.Map(this.$el, {
        center: { lat: 48.866667, lng: 2.333333 },
        zoom: 16,
      });
      this.map.addListener('click', (e) => {
        console.log('yeah', e.latLng);
        this.placeMarkerAndPanTo(e.latLng, this.map);
      });

      this.infoWindow = new this.google.maps.InfoWindow();

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          this.infoWindow.setPosition({
            lat: this.pos.lat,
            lng: this.pos.lng,
          });
          this.infoWindow.setContent('Position trouvée.');
          this.infoWindow.open(this.map);
          this.map.setCenter({
            lat: this.pos.lat,
            lng: this.pos.lng,
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
          console.log(restaurant.name);
          console.log(JSON.stringify(this.restaurants));
          console.log(JSON.stringify(this.restaurants).indexOf(restaurant.name));
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
    placeMarkerAndPanTo(latLng, map) {
      console.log('yeah2', latLng, map);
      this.toggleModale();
      map.panTo(latLng);
      return new this.google.maps.Marker({
        position: latLng,
        map,
      });
    },
    toggleModale() {
      console.log('yeah3', this.revele);
      this.revele = !this.revele;
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
