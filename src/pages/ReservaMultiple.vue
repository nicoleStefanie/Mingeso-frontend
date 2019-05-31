<template>
  <form id="simple" charset=UTF-8″>
    <md-card>
      <md-card-header>
        <h4 class="title">Crear Reserva Múltiple</h4>
        <p class="category">Completar con los datos</p>
      </md-card-header>
      <md-card-content>
        <br>
        <div class="md-layout">
          <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ingrese los datos del Usuario que esta haciendo la reserva</label>
          <div class="md-layout-item md-small-size-100 md-size-80">
                <b-form-input @keyup="validarRut(rutUsuario)" v-model="rutUsuario" placeholder="Rut Usuario"></b-form-input>
                <p class="error" v-if="vatError2">{{vatErrorMsg2}}</p>
          </div>
          <br><br><br>
          <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ingrese la información de la reserva.</label>
          <div class="md-layout-item md-small-size-100 md-size-80">
                <b-form-input @keyup="validarNombre" v-model="nombreCliente" placeholder="Nombre y Apellido del Cliente"></b-form-input>
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
          <div class="md-layout-item md-small-size-100 md-size-40">
                <b-form-input  @keyup="validarCodigoReserva" v-model="codigoReserva" placeholder="Código de la reserva"></b-form-input>
                <p class="error" v-if="vatError5">{{vatErrorMsg5}}</p>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-40">
                <b-form-input  @keyup="validarDescuento" v-model="descuento" placeholder="Descuento"></b-form-input>
                <p class="error" v-if="vatError7">{{vatErrorMsg7}}</p>
          </div>
          <br><br><br>
          <div class="md-layout-item md-small-size-100 md-size-30">
              <datepicker v-model="inicio" type="date" placeholder=" Fecha inicio"></datepicker>
                <p v-if="inicio">{{ dateFormat(inicio) }}</p>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-30">
              <datepicker v-model="termino" type="date" placeholder=" Fecha Término"></datepicker>
                <p v-if="termino">{{ dateFormat(termino) }}</p>
          </div>
          <br><br><br>
            <div v-if= "inicio && termino">
              <b-table
                selectable
                :select-mode="selectMode"
                selectedVariant="success"
                :items="items"
                :fields = "fields"
                @row-selected="rowSelected2"
              ></b-table>
            </div>
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
  name: 'agregarMultiple',
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
        items:[],
        selected: null,
        habitacion: null,
        seleccion:'',
        fields: ["nroHabitacion",
        "capacidadNinos",
        "capacidadAdultos",
        "precioNoche",
        "tipoHabitacion"],
        selectMode: 'single',
        fechasInicio: {
          ranges: [
            { 
              from: new Date(2019, 0, 1),
              to: hoy
            }
          ],
        },
        fechaTermino: {
            ranges: [
              { 
                from: new Date(2019, 0, 1),
                to: hoy
              }
            ],
        },
        items:[],
        selected: null,
        habitacion: null,
        seleccion:'',
        fields: ["nroHabitacion",
        "capacidadNinos",
        "capacidadAdultos",
        "precioNoche",
        "tipoHabitacion"],
        selectMode: 'single',
        errors:[],
        nombre:'',
        rut:'',
        fechaNacimiento:'',
        telefono:'',
        rutUsuario:'',
        correo:'',
        fechaInicio:'',
        fechaTermino:'',
        codigoReserva:'',
        IdHab:'',
        estado:'',
        descuento:'',
      }
  },  
  mounted: function () {
    this.getHabitaciones2();
  },
  methods:{
    getHabitaciones2:function(){
        const url = localhost + '/reservahabitacion/mostrar' + this.fechaInicio + '/' + this.fechaTermino;
        axios.get(url).then((data) => {
          this.items = data.data;
        });
    },
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
    rowSelected2(items) {
        this.selected = items;
        this.habitacion = this.selected[0].idHabitacion;
    },
    seleccionada:function(inicio){
      this.seleccion = true;
      return seleccion
    },
    validar: function(){
      if(this.nombre && this.fechaInicio && this.fechaTermino && this.rut && this.correo && this.telefono
      && this.rutUsuario && this.fechaNacimiento && this.codigoReserva && this.descuento){
        this.createReserva();
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