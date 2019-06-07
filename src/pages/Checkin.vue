<template>
  <div class="container">
    <md-card>
      <md-card-header data-background-color="green" style="position: relative;">
        <h3 class="title">Check-in</h3>
      </md-card-header>
      <br>
      <md-card-content>
        <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-50">
              <b-form-input  @keyup="validarCodigo" v-model="codigoReserva" placeholder="Código Reserva"></b-form-input>
              <p class="error" v-if="vatError1">{{vatErrorMsg1}}</p>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <b-form-input  @keyup="validarApellido" v-model="apellidoCliente" placeholder="Apellido Cliente"></b-form-input>
              <p class="error" v-if="vatError2">{{vatErrorMsg2}}</p>
            </div>
            <br><br>
            <div class="md-layout-item md-small-size-100 md-size-100 text-center">
              <md-button class="md-raised md-success" style="width: 60%; font-size:20px" @click="validar">Comenzar Check-in</md-button>
            </div>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
  /* eslint-disable */
  import axios from 'axios';
  const api = 'http://159.203.94.72:8060/backend/';
  export default {
    components: {
    },
    data(){
      return{
        vatError1,
        vatErrorMsg1,
        vatError2,
        vatErrorMsg2,
      }
    },
    methods: {
      refresh(){
        location.reload(true);
      },
  },
  };
</script>
