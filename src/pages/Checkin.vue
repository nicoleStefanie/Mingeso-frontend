<template>
  <div class="container">
    <md-card>
      <md-card-header data-background-color="green" style="position: relative;">
        <h3 class="title">Check-in</h3>
      </md-card-header>
      <br>
      <md-card-content>
        <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-100">
              <b-form-input  @keyup="validarCodigo" v-model="codigoReserva" placeholder="Código Reserva"></b-form-input>
              <p class="error" v-if="vatError1">{{vatErrorMsg1}}</p>
            </div>
            <br><br>
            <div class="md-layout-item md-small-size-100 md-size-100 text-center" style="margin-top: 10px">
              <md-button class="md-raised md-success" style="width: 60%; font-size:20px" @click="enviar">Comenzar Check-in</md-button>
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
        vatError1: '',
        vatErrorMsg1: '',
        vatError2: '',
        vatErrorMsg2: '',
        codigoReserva: '',
        reserva: null,
      }
    },
    methods: {

      validarCodigo:function(){
        if(/^\d*$/.test(this.codigoReserva)){
            this.vatError1 = false;
            this.vatErrorMsg1 = null;
        }
        else{
          this.vatError1 = true;
          this.vatErrorMsg1 = "Ingrese un valor númerico."
        }
      },
      enviar(){
        var url = api + 'reservas/codigoReserva/';
        var codigoString = "" + this.codigoReserva;
        url = url + codigoString;
        axios.get(url).then((data) => {
          this.reserva = data.data;
          console.log(this.codigoReserva);
        });
        if(this.reserva != null){
          location.href = "http://159.203.94.72/#/reservaHabitacion/" + this.reserva.idReserva;
        } else {
          alert("El código de la reserva no existe.");
        }
      },
  },
  };
</script>
