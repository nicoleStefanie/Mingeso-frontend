<template>
  <form id="simple">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Modificando Reserva Simple ID {{this.$route.params.id}} </h4>
        <p class="category">Completar con los datos</p>
      </md-card-header>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Nombre</label>
              <md-input v-model="nombre" type="text"></md-input>
            </md-field>
              <p v-if="nombre">{{ nombre }}</p>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Apellido</label>
              <md-input v-model="apellido" type="text"></md-input>
            </md-field>
              <p v-if="apellido">{{ apellido }}</p>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Rut</label>
              <md-input v-model="rut" type="text"></md-input>
            </md-field>
              <p v-if="rut">{{ rut }}</p>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Teléfono</label>
              <md-input v-model="telefono" type="text"></md-input>
            </md-field>
              <p v-if="telefono">{{ telefono }}</p>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Correo</label>
              <md-input v-model="correo" type="email" required></md-input>
            </md-field>
              <p v-if="correo">{{ correo }}</p>
          </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
                <md-select v-model="habitacion" placeholder="Habitación*" md-dense>
                  <md-option value=""><br></md-option>
                  <md-option value="simple"><br>&nbsp;Simple</md-option>
                  <md-option value="doble"><br>&nbsp;Doble</md-option>
                  <md-option value="triple"><br>&nbsp;Triple</md-option>
                  <md-option value="cuadruple"><br>&nbsp;Cuádruple</md-option>
                  <md-option value="matrimonial"><br>&nbsp;Matrimonia</md-option>
                </md-select>
            </md-field>
            <p v-if="habitacion">{{ habitacion }}</p>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
              <label>Fecha Inicio*</label>
              <datepicker :disabledDates="disabled" v-model="inicio" type="date"></datepicker>
                <p v-if="inicio">{{ inicio }}</p>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
              <label>Fecha Término*</label>
              <datepicker :disabledDates="disabledDates" v-model="termino" type="date"></datepicker>
                <p v-if="termino">{{ termino }}</p>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" :href="'#/vistaModificar'">Cancelar</md-button>
            &nbsp; &nbsp; 
            <md-button class="md-raised md-success md-size-100 text-left" @click.native="validar()">Modificar Reserva</md-button>
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
        rut: null,
        correo: null,
        telefono: null,
        habitacion: null,
        inicio: null,
        termino: null,
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
    validar: function(){
      if(this.nombre != null && this.apellido != null && this.habitacion != null && this.termino != null 
      && this.inicio != null && this.rut != null && this.correo != null && this.telefono != null){
        alert('Todos los campos estan llenos');
      }
      if(this.nombre != null || this.apellido != null || this.habitacion != null || this.termino != null 
      && this.inicio != null || this.rut != null || this.correo != null || this.telefono != null){
        alert('Falta algun campo por completar.')
      }
      else{
        alert('Se requiere completar todos los campos.')
      }
    } 
  },
  
};
</script>

<style>

</style>