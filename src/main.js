import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import App from './App.vue';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;
// Vue.use(VueGoogleMaps, {
//   load: {
//     key: 'AIzaSyDfFBkQLiNONnJ4y_safmg4m1XQfHf6Uqo',
//     libraries: 'places', // necessary for places input
//   },
// });
new Vue({
  render: (h) => h(App),
}).$mount('#app');
