<template>
  <form id="simple">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Crear Reserva Simple</h4>
        <p class="category">Completar con los datos</p>
      </md-card-header>
      <md-card-content>
        <br>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-80">
                <b-form-input @keyup="validarNombre" v-model="nombre" placeholder="Nombre Completo"></b-form-input>
                  <!--<div class="mt-2">{{ nombre }}</div>-->
                <p class="error" v-if="vatError1">{{vatErrorMsg1}}</p>
          </div>
          <br><br><br>
          <div class="md-layout-item md-small-size-100 md-size-40">
                <b-form-input v-model="rut" placeholder="Rut"></b-form-input>
                  <div class="mt-2">{{ rut }}</div>
          </div>
          <br><br><br>
          <div class="md-layout-item md-small-size-100 md-size-40">
                <b-form-input @keyup="validarTelefono" v-model="telefono" placeholder="Teléfono"></b-form-input>
                  <!--<div class="mt-2">{{ telefono }}</div>-->
                  <p class="error" v-if="vatError3">{{vatErrorMsg3}}</p>
          </div>
          <br><br><br>
          <div class="md-layout-item md-small-size-100 md-size-50">
                <b-form-input @keyup="validarEmail" v-model="correo" placeholder="Correo"></b-form-input>
                  <div class="mt-2">{{ correo }}</div>
                  <p class="error" v-if="vatError4">{{vatErrorMsg4}}</p>
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
            <md-button class="md-raised md-success" @click="validar()">Crear Reserva</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>

<script>
/* eslint-disable */
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
        errors:[],
        nombre: '',
        rut: '',
        correo: '',
        telefono: '',
        habitacion: '',
        inicio: '',
        termino: '',
        vatError1:'',
        vatErrorMsg1: '',
        vatError3:'',
        vatErrorMsg3:'',
        vatError4:'',
        vatErrorMsg4:'',
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
      if(this.nombre && this.habitacion && this.inicio && this.termino && this.rut && this.correo && this.telefono) return true;      
      if(this.nombre || this.habitacion || this.inicio || this.termino || this.rut || this.correo || this.telefono){
        alert('Falta algun campo por completar.')
      }
      else{
        alert('Se requiere completar todos los campos.')
      }
    },
    validarNombre:function(nombre){
      if(/^[A-Za-z\s]+$/.test(this.nombre)) {
        this.vatError1 = false;
        this.vatErrorMsg1 = null; 
        return true }        
      else{
        this.vatError1 = true;
        this.vatErrorMsg1 = "Ingrese un nombre válido.";
      }
    },
    validarTelefono:function(telefono){
      if(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(this.telefono)){
        this.vatError3 = false; 
        this.vatErrorMsg3 = null;
        return true }
        else{
          this.vatError3 = true;
          this.vatErrorMsg3 = "Ingrese un teléfono válido."
        }
    },
    validarEmail:function(email) {
      var a = /\S+@\S+/;
      if(a.test(this.email)){
        this.vatError4 = false;
        this.vatErrorMsg4 = null; }
        else{
          this.vatError4 = true;
          this.vatErrorMsg4 = "Ingrese un correo válido."
        }
    },
  },
};
</script>

<style>
input,select {
  margin-left: 10px;
}
</style>