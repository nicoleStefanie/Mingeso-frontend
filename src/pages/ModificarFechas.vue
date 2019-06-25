<template>
  <form id="simple">
    <md-card>
      <md-card-header data-background-color="green">
        <h4 class="title">Modificar fechas de la reserva N°{{this.$route.params.codigoReserva}}</h4>
        <p class="category">Completar con los datos</p>
      </md-card-header>
      <md-card-content>
          <div class="md-layout">
              <div class="md-layout-item md-small-size-100 md-size-40">
                    <label>Fecha de inicio</label>
                    <datepicker :disabled-dates="fechasInicio" v-model="fechaInicio" type="String" placeholder=" Fecha Inicio"></datepicker>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-40">
                    <label>Fecha de término</label>
                    <datepicker :disabled-dates="fechasTermino" v-model="fechaTermino" type="String" placeholder=" Fecha Termino"></datepicker>
              </div>

              <div class="md-layout-item md-size-100 text-right">
                <md-button class="md-raised md-success" @click="volver">Volver</md-button>
                <md-button class="md-raised md-success" @click="validar">Modificar fechas</md-button>
              </div>
          </div>
      </md-card-content>
    </md-card>
  </form>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
const localhost = 'http://159.203.94.72:8060/backend';
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
        fechaInicioAntes: '',
        fechaTerminoAntes: '',
        fechaInicio:'',
        fechaTermino:'',
        IdHab: '',
        inicio: '',
        termino: '',
        errors: [],

        fechasInicio: {
          ranges: [// Rango de fechas desabilitadas hasta el dia presente
            {
              from: new Date(2019, 0, 1),
              to: new Date()
            }
          ],
        },
        fechasTermino: {
            ranges: [// Rango de fechas desabilitadas hasta el dia presente
              {
                from: new Date(2019, 0, 1),
                to: new Date()
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
        this.$vs.notify({title:'Se requiere completar los campos correctamente.',color:'danger',position:'bottom-center'});
      }
    },
    modificarFechas() {
      var url = localhost + '/reservahabitacion/update/';
      var idString = "" + this.$route.params.codigoReserva;
      url = url + idString;
      axios.post(url, {

        fechaInicio : this.fechaInicio,
        fechaTermino : this.fechaTermino,
        IdHab : this.$route.params.idHabitacion

      })
      .then(response => {
        if(response.data[0].message == 'OK'){
          this.$vs.notify({title:'Se modificaron las fechas correctamente.',color:'success',position:'bottom-center'});
          location.href = "http://159.203.94.72/#/";
        } else {
          this.$vs.notify({title:'No se pudieron modificar las fechas.',color:'danger',position:'bottom-center'});
        }
      })
      .catch(e => {
        this.errors.push(e)
      });
    },
    getFechas() {
      var url = localhost + '/reservahabitacion/';
      var reservas;
      axios.get(url).then((data) => {
        reservas = data.data;
        for(var i=0;i<reservas.length;i++){
          if(reservas[i].activa == true){
            if(reservas[i].habitacion.nroHabitacion == this.$route.params.nroHabitacion && reservas[i].reserva.codigoReserva == this.$route.params.codigoReserva){
              var auxFechaInicio = reservas[i].fechaInicioRH.split("T")[0];
              var auxFechaTermino = reservas[i].fechaTerminoRH.split("T")[0];
              var diaInicio = parseInt(auxFechaInicio.split("-")[2])+1;
              var diaTermino = parseInt(auxFechaTermino.split("-")[2])+1;
              var mesInicio = parseInt(auxFechaInicio.split("-")[1])-1;
              var mesTermino = parseInt(auxFechaTermino.split("-")[1])-1;
              this.fechaInicio = new Date(auxFechaInicio.split("-")[0], mesInicio, diaInicio);
              this.fechaTermino = new Date(auxFechaTermino.split("-")[0], mesTermino, diaTermino);
            }
          }
        }
      });
    },
    volver(){
      location.href = "http://159.203.94.72/#/vistaModificar";
    },
  },
  mounted () {
    this.getFechas();
    if (!localStorage.getItem('login')) {
      this.$router.push('Login')
    }
  }
};
</script>

<style>
input,select {
  margin-left: 10px;
}
</style>
