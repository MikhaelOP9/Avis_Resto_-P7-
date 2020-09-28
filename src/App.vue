<template>
  <div id="app">
    <img
      id="logo"
      class="navbar-brand"
      alt="Avis Resto logo"
      src="./assets/Logo.png"
    >
    <div id="alignement">
      <contenu />
    </div>
  </div>
</template>

<script>

import Contenu from './components/Contenu.vue';

export default {
  name: 'App',
  components: {
    contenu: Contenu,
  },
};
</script>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
@import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';

#alignement{
     display: flex;
      margin-top: -35px;
}
#logo{
  width:330px;
  text-align: left !important;
  margin: 12px;
  margin-bottom: 40px;
}
 #googleMap {
    width: 100%;
    height: 1000px;
    background-color: white;
     margin:2%;
}

</style>
