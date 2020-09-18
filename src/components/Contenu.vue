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
    <!-- <liste prenom="age"></liste> -->
    <!-- <button v-on:click="getRestauData">Get Restau Data</button> -->

    <!-- <div>{{moyStars()}}</div> -->
    <!-- <div>{{ restaurants }}</div> -->
    <!-- <div v-for="restauData in restaurants" :key="restauData.id" class="">{{ restauData.id }}</div> -->
    <div id="alignement">
      <div class="row-md" id="alignRow">

        <restaurantCard
          :key="restaurant.id"
          v-for="restaurant in restaurants"
          :restaurant="restaurant" class="container"
          v-on:openRates="openRestaurantRateListModal"
        />
      </div>
      <mapComponent></mapComponent>
    </div>
  </div>
</template>
<script>
import restaurantRateListModal from "./RestaurantRateListModal"
import mapComponent from "./GoogleMap";
import restaurantCard from "./RestaurantCard";

export default {
  components: {
    restaurantCard,
    mapComponent, 
    restaurantRateListModal
  },

  name: "Contenu",
  data() {
    return {
      restaurants: [],
      modalInformations_name:"",
      modalInformations_address:"",
      modalInformations_rates:[],
      modalInformations_rate:0,
      modalInformations_display: false,
      
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
    openRestaurantRateListModal(data){
      this.modalInformations_name = data.modalInformations_name;
      this.modalInformations_address = data.modalInformations_address;
      this.modalInformations_rates = data.modalInformations_rates;
      this.modalInformations_rate = data.modalInformations_rate;   
      this.modalInformations_display = true
    },
    closeRestaurantRateListModal(){
      this.modalInformations_display=false;
    }
  },
  
  created() {
    this.getRestauData();
  },
};
</script>
<style scoped src="./Contenu.css">


</style>