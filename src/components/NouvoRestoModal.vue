<template>
  <div
    v-if="revele"
    class="bloc-modale"
  >
    <div
      class="overlay"
      @click="toggleModale"
    />
    <div class="modale card">
      <div
        class="btn-modale btn btn-danger"
        @click="toggleModale"
      >
        X
      </div>
      <h2>Ajoutez un resto !</h2>
      <input
        class="form-control form-control-lg mt-2"
        type="text"
        placeholder="Nom"
      >
      <br>
      <input
        class="form-control form-control-lg mt-2"
        type="text"
        placeholder="Adresse"
      >
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          @click="toggleModale"
        >
          Fermer
        </button>
        <button
          type="button"
          class="btn btn-primary"
          data-dismiss="modal"
          @click="toggleModale"
        >
          Enregistrer
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Modale',
  props: ['revele', 'toggleModale'],
};
</script>
<style>
.bloc-modale{
    position: fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    width:100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.overlay{
    background: rgba(0,0,0,0.5);
    position: fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
}
.modale{
    background: #f1f1f1;
    color:#333;
    padding:50px;
    position: fixed;
    bottom:10%;
}
.btn-modale{
    position: absolute;
    top:10px;
    right:10px;
}
</style>
