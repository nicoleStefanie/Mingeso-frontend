<template>
  <form id="simple">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Crear Reserva con Entradas</h4>
        <p class="category">Completar con los datos</p>
      </md-card-header>
      <md-card-content>
        <br>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-80">
                <b-form-input v-model="nombre" placeholder="Nombre Completo"></b-form-input>
                  <div class="mt-2">{{ nombre }}</div>
          </div>
          <br><br><br>
          <div class="md-layout-item md-small-size-100 md-size-40">
                <b-form-input v-model="rut" placeholder="Rut"></b-form-input>
                  <div class="mt-2">{{ rut }}</div>
          </div>
          <br><br><br>
          <div class="md-layout-item md-small-size-100 md-size-40">
                <b-form-input v-model="telefono" placeholder="Teléfono"></b-form-input>
                  <div class="mt-2">{{ telefono }}</div>
          </div>
          <br><br><br>
          <div class="md-layout-item md-small-size-100 md-size-50">
                <b-form-input v-model="correo" placeholder="Correo"></b-form-input>
                  <div class="mt-2">{{ correo }}</div>
          </div>
          <br><br><br>
            <div class="md-layout-item md-small-size-100 md-size-30">
                 <b-form-select v-model="habitacion" :options="options">
                    <option :value="null" disabled>Seleccione Habitación</option>              
                    <option>Simple</option>
                    <option>Doble</option>
                    <option>Triple</option>
                    <option>Cuádruple</option>
                    <option>Matrimonial</option>
                    <option></option>              
              </b-form-select>
                <div class="mt-2">{{ habitacion }}</div>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
              <datepicker :disabledDates="disabled" v-model="inicio" type="date" placeholder=" Fecha inicio"></datepicker>
                <p v-if="inicio">{{ inicio }}</p>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
              <datepicker :disabledDates="disabledDates" v-model="termino" type="date" placeholder=" Fecha Término"></datepicker>
                <p v-if="termino">{{ termino }}</p>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" :href="'#/reservas'">Cancelar</md-button>
            &nbsp; &nbsp; 
            <md-button class="md-raised md-success" @click="verificar()">Crear Reserva</md-button>
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
    verificar: function(){
      if(this.nombre && this.habitacion && this.inicio && this.termino && this.rut && this.correo && this.telefono) return true;      
      if(this.nombre || this.habitacion || this.inicio || this.termino || this.rut || this.correo || this.telefono){
        alert('Falta algun campo por completar.')
      }
      else{
        alert('Se requiere completar todos los campos.')
      }
    }, 
  }
};
</script>

<style>

</style>