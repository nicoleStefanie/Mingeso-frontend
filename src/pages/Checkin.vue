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
        apellidoCliente: '',
        codigoReserva: '',
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
      validarApellido:function(){
        if(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g.test(this.apellidoCliente)) {
          this.vatError2 = true;
          this.vatErrorMsg2 = null;
          return true }
        else{
          this.vatError2 = true;
          this.vatErrorMsg2 = "Ingrese un apellido válido.";
        }
      },
      enviar(){
        var url = api + '/registro/checkin';
        axios.post(url, {
          codigoReserva:this.codigoReserva,
          representante:this.apellidoCliente,
        }).then(response => {
          alert(response.data[0].message);
          console.log(response.data.message);
          if(response.data[0].message == 'OK' || true){
            location.href = "http://159.203.94.72/#/checkin/registro";
          }
          })
      },
  },
  };
</script>
