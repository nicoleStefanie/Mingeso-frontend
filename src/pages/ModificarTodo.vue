<template>
  <form id="simple">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Modificar los datos del cliente</h4>
        <p class="category">Completar con los datos</p>
      </md-card-header>
      <md-card-content>
        <br>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-80">
                <b-form-input @keyup="validarNombre" v-model="nombre" placeholder="Nombre Completo"></b-form-input>
                <p class="error" v-if="vatError1">{{vatErrorMsg1}}</p>
          </div>
          <br><br><br>
          <div class="md-layout-item md-small-size-100 md-size-40">
                <b-form-input @keyup="validarRut" v-model="rut" placeholder="Rut"></b-form-input>
                  <p class="error" v-if="vatError2">{{vatErrorMsg2}}</p>
          </div>
          <br><br><br>
          <div class="md-layout-item md-small-size-100 md-size-33">
              <datepicker  v-model="fechaNacimiento" type="date"  placeholder=" Fecha Nacimiento"></datepicker>
                <p v-if="fechaNacimiento">{{ dateFormat(fechaNacimiento) }}</p>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-30">
                <b-form-input @keyup="validarTelefono" v-model="telefono" placeholder="Teléfono"></b-form-input>
                  <p class="error" v-if="vatError3">{{vatErrorMsg3}}</p>
          </div>
          <br><br><br>
          <div class="md-layout-item md-small-size-100 md-size-50">
                <b-form-input @keyup="validarEmail" v-model="correo" placeholder="Correo"></b-form-input>
                  <p class="error" v-if="vatError4">{{vatErrorMsg4}}</p>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-80">
                <b-form-input v-model="estado" placeholder="Estado de la reserva"></b-form-input>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-80">
                <b-form-input v-model="descuento" placeholder="Descuento de la reserva"></b-form-input>
          </div>
          <div class="md-layout-item md-size-100 text-right">
              <md-button class="md-raised md-success"  @click="validar" >Modificar datos</md-button>
          </div>

        </div>
      </md-card-content>
    </md-card>
  </form>
</template>

<script>
/* eslint-disable */
import Datepicker from 'vuejs-datepicker'
import axios from 'axios';
const localhost = 'http://159.203.94.72:8060/backend';
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
        rut: '',
        fechaNacimiento:'',
        correo: '',
        telefono: '',
        estado:'',
        descuento: '',
        inicio: '',
        termino: '',
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
        y:[],
        errors : [],
      }
  },
  methods:{
    putReserva() {
      var url = localhost + '/reservas/update/'+ this.$route.params.codigoReserva;
      axios.post(url, {

        rut : this.rut,
        nombre : this.nombre,
        correo: this.correo,
        telefono: this.telefono,
        fechaNacimiento: this.fechaNacimiento,
        estado: this.estado,
        descuento: this.descuento
      })
      .then(response => {

        this.rut = '';
        this.nombre = '';
        this.correo = '';
        this.telefono = '';
        this.fechaNacimiento = '';
        this.estado = '';
        this.descuento = '';
        alert(response.data[0].message);
        console.log(response.data.message);
      })
      .catch(e => {
        this.errors.push(e)
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
    seleccionada:function(inicio){
      this.seleccion = true;
      return seleccion
    },
    validar(){
      if(this.nombre || this.fechaNacimiento|| this.rut || this.correo || this.telefono || this.estado || this.descuento){
        this.putReserva();
        console.log("hola")
      }
      else{
        alert('Se requiere completar todos los campos.')
      }
    },
    validarNombre:function(nombre){
      if(/^[A-Za-z\s]+$/.test(this.nombre)) {
        this.vatError1 = true;
        this.vatErrorMsg1 = null;
        return true }
      else{
        this.vatError1 = true;
        this.vatErrorMsg1 = "Ingrese un nombre válido.";
      }
    },
    validarEdad:function(fechaNacimiento) { // birthday is a date
      var ageDifMs = Date.now() - birthday.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      if ( (Math.abs(ageDate.getUTCFullYear() - 1970)) > 18){
        this.vatError1 = true;
        this.vatErrorMsg1 = null;
      }
      else{
        this.vatError1 = true;
        this.vatErrorMsg1 = "No valido.";
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
    validarEmail:function(correo) {
      var a = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
      if(a.test(this.correo)){
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
