<template>
  <form id="simple">
    <md-card>
      <md-card-header data-background-color="green">
        <h4 class="title">Modificar los datos del cliente</h4>
        <p class="category">Completar con los datos</p>
      </md-card-header>
      <md-card-content>
        <br>
        <div class="md-layout">

          <div class="md-layout-item md-small-size-100 md-size-40">
            <md-field>
              <label>Nombre completo</label>
              <md-input @keyup="validarNombre" v-model="nombre" type="text"></md-input>
              <br>
              <p class="error" v-if="vatError1">{{vatErrorMsg1}}</p>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-40">
              <md-field>
                  <label>Rut</label>
                  <md-input @keyup="validarRut" v-model="rut" type="text"></md-input>
                  <p class="error" v-if="vatError2">{{vatErrorMsg2}}</p>
              </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-40">
              <md-field>
                  <label>Fecha de nacimiento</label>
                  <datepicker v-model="fechaNacimiento" type="date"></datepicker>
              </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-40">
              <md-field>
                  <label>Teléfono</label>
                  <md-input @keyup="validarTelefono" v-model="telefono" type="text"></md-input>
                  <p class="error" v-if="vatError3">{{vatErrorMsg3}}</p>
              </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-40">
            <md-field>
              <label>Correo</label>
              <md-input @keyup="validarEmail" v-model="correo" type="text"></md-input>
              <p class="error" v-if="vatError4">{{vatErrorMsg4}}</p>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-40">
              <md-field>
                  <label>Estado de la reserva</label>
                  <md-input v-model="estado" type="text"></md-input>
              </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-40">
              <md-field>
                  <label>Descuento de la reserva</label>
                  <md-input v-model="descuento" type="text"></md-input>
              </md-field>
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
        reserva: [],
      }
  },
  methods:{
    putReserva() {
      var url = localhost + '/reservas/update/'+ this.$route.params.codigoReserva;
      if(this.estado == "Vigente" || this.estado == "Cancelada"){
        if(this.estado == "Vigente"){this.estado = 1;}
        else{this.estado = 0;}
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
          if(response.data[0].message == 'OK'){
            this.rut = '';
            this.nombre = '';
            this.correo = '';
            this.telefono = '';
            this.fechaNacimiento = '';
            this.estado = '';
            this.descuento = '';
            this.$vs.notify({title:'Se modificó la reserva correctamente.',color:'success',position:'bottom-center'});
            this.$router.push('Rack');
          } else {
            this.$vs.notify({title:'No se pudo modificar la reserva.',color:'danger',position:'bottom-center'});
          }
        })
        .catch(e => {
          this.errors.push(e)
        });
      } else {
        this.$vs.notify({title:'El estado de la reserva debe ser Vigente o Cancelada.',color:'danger',position:'bottom-center'});
      }
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
    getReserva(){
      var idString = '' + this.$route.params.codigoReserva;
      const url = localhost + '/reservas/codigoReserva/' + idString;
      axios.get(url).then((data) => {
        this.reserva = data.data;
        this.rut = this.reserva.cliente.rut;
        this.nombre = this.reserva.cliente.nombreCliente;
        this.correo = this.reserva.cliente.correoCliente;
        this.telefono = this.reserva.cliente.telefonoCliente;
        this.fechaNacimiento = this.reserva.cliente.fechaNacimiento.split("T")[0];
        if(this.reserva.estado == 0){this.estado = "Cancelada";}
        else{this.estado = "Vigente";}
        this.descuento = this.reserva.descuento;
      });
    },
  },
  mounted () {
    this.getReserva();
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
