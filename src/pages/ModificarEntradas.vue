<template>
  <form id="simple">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Editar Reserva con varias entrada</h4>
        <p class="category">Completar con los datos</p>
      </md-card-header>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Nombre</label>
              <md-input v-model="nombre" type="text"></md-input>
            </md-field>
              <p v-if="nombre">{{ nombre }}</p><!--tengo el valor de la fecha-->
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Apellido</label>
              <md-input v-model="apellido" type="text"></md-input>
            </md-field>
              <p v-if="apellido">{{ apellido }}</p><!--tengo el valor de la fecha-->
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
              <label>Check In</label>
              <datepicker :disabledDates="disabled" v-model="checkin" type="date"></datepicker>
                <p v-if="checkin">{{ checkin }}</p><!--tengo el valor de la fecha-->
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
              <label>Chek Out</label>
              <datepicker :disabledDates="disabledDates" v-model="checkout" type="date"></datepicker>
                <p v-if="checkout">{{ checkout }}</p><!--tengo el valor de la fecha-->
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Habitación</label>
                <md-select v-model="habitacion" placeholder="Habitación">
                  <md-option value="simple"> <br>&nbsp;Simple &nbsp;$ precio</md-option>
                  <md-option value="doble"> <br>&nbsp;Doble&nbsp;$ precio</md-option>
                  <md-option value="triple"> <br>&nbsp;Triple&nbsp; $ precio</md-option>
                  <md-option value="cuadruple"> <br>&nbsp;Cuádruple&nbsp; $precio</md-option>
                  <md-option value="matrimonial"> <br>&nbsp;Matrimonial&nbsp; $precio</md-option>
                </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-30">
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success">Crear Reserva</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>

<script>
/* eslint-disable */
import Datepicker from 'vuejs-datepicker'
var hoy = new Date()
export default {
  name: 'simple',
  components: {
    Datepicker
  },
    data(){
      return {
        disabled: {},
        nombre: null,
        apellido: null,
        descuento: null,
        habitacion: null,
        disabled: {
          ranges: [{
                from: new Date(2016, 11, 25),
                to: hoy,
                //Agregar las fechas que estan reservadas
              }]
        },
        disabledDates: {
          customPredictor: function(date) {
            // Arreglar esto, para poner que no esten disponibles las fechas que estan ocupadas
            if(date.getDate() % 5 == 0){
              return true
            }
            //Agregar que la fecha del checkin no este disponible para el checkout
          }
        }
      }
  },
  methods:{
    dateFormat: function() {
      let date = new Date(this.date);
      return date.getFullYear() + '-' +
      	(date.getMonth() +1) + '-' +
        date.getDate();
    },
  },
  mounted () {
    if (!localStorage.getItem('login')) {
      this.$router.push('Login')
    }
  }
};
</script>

<style>

</style>
