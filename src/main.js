import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as VueGoogleMaps from "vue2-google-maps";


Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDfFBkQLiNONnJ4y_safmg4m1XQfHf6Uqo",
    libraries: "places" // necessary for places input
  }
});
new Vue({
  render: h => h(App),
}).$mount('#app')
