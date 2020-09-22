<template>
    <div id="map"></div>
</template>

<script>
import googleMapsInit from "../utils/GoogleMaps";

export default  {
    data(){
        return({
            map : null,
        });
    }, 
    async mounted(){
        try {
            const google = await googleMapsInit();
            // const geocoder = new google.maps.Geocoder();
            this.map = new google.maps.Map(this.$el, {
            center: { lat: 48.8400, lng: 2.35 },
            zoom: 13,
            });      
        } catch (e) {
            console.error(e)
        }
    }
}
</script>

<style scoped>
#map {
    
    width : 1000vw;
    height: 1000px;
}
</style>