<template>
  <form id="simple" charset=UTF-8″>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Crear Reserva Simple</h4>
        <p class="category">Completar con los datos</p>
      </md-card-header>
      <md-card-content>
        <br>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-80">
                <b-form-input @keyup="validarNombre" v-model="nombreCliente" placeholder="Nombre y Apellido"></b-form-input>
                <p class="error" v-if="vatError1">{{vatErrorMsg1}}</p>
          </div>
          <br><br><br>
          <div class="md-layout-item md-small-size-100 md-size-40">
                <b-form-input @keyup="validarRut" v-model="rut" placeholder="Rut , ej: 191135709"></b-form-input>
                <p class="error" v-if="vatError2">{{vatErrorMsg2}}</p>
          </div>
          <br><br><br>
          <div class="md-layout-item md-small-size-100 md-size-40">
              <datepicker v-model="fechaNacimiento" type="date" placeholder=" Fecha de Nacimiento"></datepicker>
                <p v-if="nacimiento">{{ dateFormat(fechaNacimiento) }}</p>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-30">
                <b-form-input @keyup="validarTelefono" v-model="telefonoCliente" placeholder="Teléfono , ej: 983897060"></b-form-input>
                  <p class="error" v-if="vatError3">{{vatErrorMsg3}}</p>
          </div>
          <br><br><br>
          <div class="md-layout-item md-small-size-100 md-size-50">
                <b-form-input @keyup="validarEmail" v-model="correoCliente" placeholder="Correo , ej: example@example.com"></b-form-input>
                  <p class="error" v-if="vatError4">{{vatErrorMsg4}}</p>
          </div>
          <br><br><br>
          <div class="md-layout-item md-small-size-100 md-size-30">
              <datepicker :disabledDates="fechasInicio" v-model="inicio" type="date" v-on:selected="seleccionada(inicio)" placeholder=" Fecha inicio"></datepicker>
                <p v-if="inicio">{{ dateFormat(inicio) }}</p>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-30">
              <datepicker :disabledDates="fechaTermino" v-model="termino" type="date" placeholder=" Fecha Término"></datepicker>
                <p v-if="termino">{{ dateFormat(termino) }}</p>
          </div>
          <br><br><br>
          <div class="md-layout-item md-small-size-100 md-size-30">
                <b-form-input  @keyup="validarCodigoReserva" v-model="codigoReserva" placeholder="Código de la reserva"></b-form-input>
                <p class="error" v-if="vatError5">{{vatErrorMsg5}}</p>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-30">
                <b-form-input  @keyup="validarIdHab" v-model="idHab" placeholder="ID Habitación"></b-form-input>
                <p class="error" v-if="vatError6">{{vatErrorMsg6}}</p>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-30">
                <b-form-input  @keyup="validarEstado" v-model="estado" placeholder="Estado de habitación"></b-form-input>
                <p class="error" v-if="vatError7">{{vatErrorMsg7}}</p>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-30">
                <b-form-input  @keyup="validarDescuento" v-model="descuento" placeholder="Descuento"></b-form-input>
                <p class="error" v-if="vatError8">{{vatErrorMsg8}}</p>         
          </div>
          <br><br><br>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" :href="'#/reservas'">Cancelar</md-button>
            &nbsp;&nbsp;
            <md-button class="md-raised md-success" @click="validar()">Crear Reserva</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>

<script>
/* eslint-disable */
import Datepicker from 'vuejs-datepicker';
import { access } from 'fs';
import axios from 'axios';
const localhost = 'http://159.203.94.72:8060/backend';
var hoy = new Date()
export default {
  name: 'agregarSimple',
  components: {
    Datepicker
  },
    data(){ 
      return {
        disabled: {},
        vatError1:'',
        vatErrorMsg1: '',
        vatError2:'',
        vatErrorMsg2:'',
        vatError3:'',
        vatErrorMsg3:'',
        vatError4:'',
        vatErrorMsg4:'',
        vatError5:'',
        vatErrorMsg5:'',
        vatError6:'',
        vatErrorMsg6:'',        
        vatError7:'',
        vatErrorMsg7:'',
        vatError8:'',
        vatErrorMsg8:'',
        fechasInicio: {
          dates: [// Arreglo de fechas , parte desde el 0 = Enero
            new Date(2019, 5, 16),
            new Date(2019, 5, 17),
            new Date(2019, 5, 18)
          ], 
          ranges: [// Rango de fechas desabilitadas hasta el dia presente
            { 
              from: new Date(2019, 0, 1),
              to: hoy
            }
          ],
        },
        fechaTermino: {
            ranges: [// Rango de fechas desabilitadas hasta el dia presente
              { 
                from: new Date(2019, 0, 1),
                to: hoy
              }
            ],
        },
        nombreCliente:'',
        rut:'',
        fechaNacimiento:'',
        telefonoCliente:'',
        correoCliente:'',
        fechaInicio:'',
        fechaTermino:'',
        codigoReserva:'',
        idHabitacion:'',
        estado:'',
        descuento:'',
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
    seleccionada:function(inicio){
      this.seleccion = true;
      return seleccion
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
    validarNombre:function(nombreCliente){
      if(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g.test(this.nombre)) {
        this.vatError1 = true;
        this.vatErrorMsg1 = null; 
        return true }        
      else{
        this.vatError1 = true;
        this.vatErrorMsg1 = "Ingrese un nombre válido.";
      }
    },
    validarRut:function(rut){
      if(/^\d*$/.test(this.rut)){
        if(Object.keys(this.rut).length < 10){
          this.vatError2 = false;
          this.vatErrorMsg2 = null; 
        }
        else{
          this.vatError2 = true;
          this.vatErrorMsg2 = "Largo del rut inválido."
        }
      }
      else{
        this.vatError2 = true;
        this.vatErrorMsg2 = "Ingrese un rut válido."
      }
    },
    validarTelefono:function(telefonoCliente){
      if(/^\d*$/.test(this.telefonoCliente)){
        if(Object.keys(this.telefonoCliente).length < 9){
          this.vatError3 = false;
          this.vatErrorMsg3 = null; 
        }
        else{
          this.vatError3 = true;
          this.vatErrorMsg3 = "Largo del teléfono inválido."
        }
      }
      else{
        this.vatError3 = true;
        this.vatErrorMsg3 = "Ingrese un teléfono válido."
      }
    },
    validarEmail:function(correoCliente) {
      var a = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
      if(a.test(this.correo)){
        this.vatError4 = false;
        this.vatErrorMsg4 = null; }
      else{
          this.vatError4 = true;
          this.vatErrorMsg4 = "Ingrese un correo válido."
        }
    },
    validarCodigoReserva:function(codigoReserva){
      if(/^\d*$/.test(this.codigoReserva)){
        if(Object.keys(this.codigoReserva).length < 10){
          this.vatError5 = false;
          this.vatErrorMsg5 = null; 
        }
        else{
          this.vatError5 = true;
          this.vatErrorMsg5 = "Largo del Código inválido."
        }
      }
      else{
        this.vatError5 = true;
        this.vatErrorMsg5 = "Ingrese un Código válido."
      }
    },
    validarIdHab:function(idHab){
      if(/^\d*$/.test(this.idHab)){
        if(Object.keys(this.idHab).length < 100){
          this.vatError6 = false;
          this.vatErrorMsg6 = null; 
        }
        else{
          this.vatError6 = true;
          this.vatErrorMsg6 = "Largo del ID habitación inválido."
        }
      }
      else{
        this.vatError6 = true;
        this.vatErrorMsg6 = "Ingrese un ID habitación válido."
      }
    },
    validarEstado:function(estado){
      if(/^\d*$/.test(this.estado)){
        if(Object.keys(this.estado).length < 2){
          this.vatError7 = false;
          this.vatErrorMsg7 = null; 
        }
        else{
          this.vatError7 = true;
          this.vatErrorMsg7 = "Largo del Código inválido."
        }
      }
      else{
        this.vatError7 = true;
        this.vatErrorMsg7 = "Ingrese un Código válido."
      }
    },
    validarDescuento:function(descuento){
      if(/^\d*$/.test(this.descuento)){
        if(Object.keys(this.descuento).length < 3){
          this.vatError8 = false;
          this.vatErrorMsg8 = null; 
        }
        else{
          this.vatError8 = true;
          this.vatErrorMsg8 = "Largo del Código inválido."
        }
      }
      else{
        this.vatError8 = true;
        this.vatErrorMsg8 = "Ingrese un Código válido."
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