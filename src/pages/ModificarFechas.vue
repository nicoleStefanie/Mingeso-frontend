<template>
  <form id="simple">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Modificar fechas de la reserva N°{{this.$route.params.codigoReserva}}</h4>
        <p class="category">Completar con los datos</p>
      </md-card-header>
      <md-card-content>
        <br>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-33">
              <datepicker :disabledDates="fechasInicio" v-model="fechaInicio" type="date"  placeholder=" Fecha inicio"></datepicker>
                <p v-if="fechaInicio">{{ dateFormat(fechaInicio) }}</p>
          </div>
          <br><br><br>
          <div class="md-layout-item md-small-size-100 md-size-33">
              <datepicker :disabledDates="fechasTermino" v-model="fechaTermino" type="date"  placeholder=" Fecha Termino"></datepicker>
                <p v-if="fechaTermino">{{ dateFormat(fechaTermino) }}</p>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" @click="validar()">Modificar</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
const localhost = 'http://159.203.94.72:8060/backend/';
import Datepicker from 'vuejs-datepicker'
import { access } from 'fs';
var hoy = new Date()
export default {
  name: 'simple',
  components: {
    Datepicker
  },
    data(){
      return {
        disabled: {},
        nombre: '',
        seleccion:'',
        fechaInicio:'',
        fechaTermino:'',
        idHab: '',
        inicio: '',
        termino: '',
        errors: [],

        fechasInicio: {

          ranges: [// Rango de fechas desabilitadas hasta el dia presente
            {
              from: new Date(2019, 0, 1),
              to: hoy
            }
          ],
        },
        fechasTermino: {
            ranges: [// Rango de fechas desabilitadas hasta el dia presente
              {
                from: new Date(2019, 0, 1),
                to: hoy
              }
            ],
        },
      }
  },
  methods:{
    dateFormat: function(date) {
      //return date.getFullYear() + '-' + (date.getMonth() +1) + '-' + date.getDate();
      if(date.getMonth()< 10 && date.getDate() < 10)
      {
        return date.getFullYear() + '-0' + (date.getMonth() +1) + '-0' + date.getDate();
      }
      else if(date.getMonth()< 10){
        return date.getFullYear() + '-0' + (date.getMonth() +1) + '-' + date.getDate();
      }
      else if(date.getDate() < 10){
        return date.getFullYear() + '-' + (date.getMonth() +1) + '-0' + date.getDate();
      }
    },
    validar: function(){

      if(this.fechaInicio || this.fechaTermino ){
        this.modificarFechas();
      }
      else{
        alert('Se requiere completar todos los campos.')
      }
    },
    modificarFechas() {
      var url = localhost + '/reservahabitacion/update/';
      var idString = "" + this.$route.params.codigoReserva;
      url = url + idString;
      axios.post(url, {

        fechaInicio : this.fechaInicio,
        fechaTermino : this.fechaTermino,
        idHab : this.$route.params.idHabitacion

      })
      .then(response => {

        this.fechaInicio = "";
        this.fechaTermino = "";
        alert(response.data[0].message);
        console.log(response.data.message);
      })
      .catch(e => {
        this.errors.push(e)
      });
    }

  },
};
</script>

<style>
input,select {
  margin-left: 10px;
}
</style>
