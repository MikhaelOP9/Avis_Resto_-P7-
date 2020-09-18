<template>
  <div id="app">
    <img id="logo" class="navbar-brand" alt="Avis Resto logo" src="./assets/Logo.png">
  <div id="alignement"> 
    <contenu></contenu>
   

  </div>
  </div>
</template>

<script>

import Contenu from './components/Contenu'



export default {
  name: 'App',
  components: {
    'contenu': Contenu,
    
  }
}
</script>

<style>
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
p{
  margin-bottom: 0rem
}
</style>
