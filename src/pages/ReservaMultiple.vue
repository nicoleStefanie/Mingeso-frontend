<template>
  <form id="simple" charset=UTF-8″>
    <md-card>
      <md-card-header>
        <h4 class="title">Crear Reserva Multiple</h4>
        <p class="category">Completar con los datos</p>
      </md-card-header>
      <md-card-content>
        <br>
        <div class="md-layout">
          <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ingrese los datos del Usuario que esta haciendo la reserva</label>
          <div class="md-layout-item md-small-size-100 md-size-80">
                <b-form-input @keyup="validarrut(rutUsuario)" v-model="rutUsuario" placeholder="Rut Usuario , ej: 191135709"></b-form-input>
                <p class="error" v-if="vatError">{{vatErrorMsg}}</p>
          </div>
          <br><br><br>
          <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ingrese la información del cliente y de la reserva.</label>
          <div class="md-layout-item md-small-size-100 md-size-80">
                <b-form-input @keyup="validarNombre" v-model="nombre" placeholder="Nombre y Apellido del Cliente"></b-form-input>
                <p class="error" v-if="vatError1">{{vatErrorMsg1}}</p>
          </div>
          <br><br><br>
          <div class="md-layout-item md-small-size-100 md-size-40">
                <b-form-input @keyup="validarRut(rut)" v-model="rut" placeholder="Rut Cliente, ej: 191135709"></b-form-input>
                <p class="error" v-if="vatError2">{{vatErrorMsg2}}</p>
          </div>
          <br><br><br>
          <div class="md-layout-item md-small-size-100 md-size-40">
              <datepicker v-model="fechaNacimiento" type="date" placeholder=" Fecha de Nacimiento"></datepicker>
                <p v-if="fechaNacimiento">{{ dateFormat(fechaNacimiento) }}</p>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-30">
                <b-form-input @keyup="validarTelefono(telefono)" v-model="telefono" placeholder="Teléfono , ej: 983897060"></b-form-input>
                  <p class="error" v-if="vatError3">{{vatErrorMsg3}}</p>
          </div>
          <br><br><br>
          <div class="md-layout-item md-small-size-100 md-size-50">
                <b-form-input @keyup="validarEmail" v-model="correo" placeholder="Correo , ej: example@example.com"></b-form-input>
                  <p class="error" v-if="vatError4">{{vatErrorMsg4}}</p>
          </div>
          <br><br><br>
          <div class="md-layout-item md-small-size-100 md-size-40">
                <b-form-input  @keyup="validarDescuento" v-model="descuento" placeholder="Descuento"></b-form-input>
                <p class="error" v-if="vatError6">{{vatErrorMsg6}}</p>
          </div>
          <br><br><br>
            <div class="md-layout-item md-small-size-100 md-size-30">
                  <b-form-input  @keyup="validarIdHab" v-model="id" placeholder="IDs Habitación, ej: 2 3 1"></b-form-input>
            </div>-
          <br><br><br>
          <div class="md-layout-item md-small-size-100 md-size-33">
              <datepicker format="yyyy-MM-dd" :disabledDates="fechasInicio" v-model="fechaInicio" type="date"  placeholder=" Fecha inicio"></datepicker>
                <p v-if="fechaInicio">{{ fechaInicio }}</p>
          </div>
          <br><br><br>
          <div class="md-layout-item md-small-size-100 md-size-33">
              <datepicker :disabledDates="fechasTermino" v-model="fechaTermino" type="date"  placeholder=" Fecha Termino"></datepicker>
          </div>
            <!--<div v-if= "fechaInicio && fechaTermino">
              <b-table
                selectable
                :select-mode="selectMode"
                selectedVariant="success"
                :items="items"
                :fields = "fields"
                @row-selected="rowSelected3"
              ></b-table>
              {{items}}
            </div>-->
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
        vatError:'',
        vatErrorMsg: '',
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
        fechasInicio: {
          ranges: [
            {
              from: new Date(2019, 0, 1),
              to: hoy
            }
          ],
        },
        fechasTermino: {
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
        fechaInit:'',
        fechaTerm:'',
        id:'',
        estado:'',
        descuento:'',
      }
  },
  methods:{
    rowSelected3(items) {
        this.selected = items;
        this.habitacion = this.selected[0].idHabitacion;
    },
    seleccionada:function(inicio){
      this.seleccion = true;
      return seleccion
    },
    createReserva:function(){
      var url = localhost + '/reservas/createmulti';
      axios.post(url, {
        nombre:this.nombre,
        rut:this.rut,
        fechaNacimiento:this.fechaNacimiento,
        telefono:this.telefono,
        rutUsuario:this.rutUsuario,
        correo:this.correo,
        fechaInicio:this.fechaInicio,
        fechaTermino:this.fechaTermino,
        id:this.id,
        estado:'1',
        descuento:this.descuento,
      })
      .then(response => {
        this.nombre = "";
        this.rut = "";
        this.fechaNacimiento = "";
        this.telefono = "";
        this.rutUsuario= "";
        this.correo = "";
        this.fechaInicio = "";
        this.fechaTermino = "";
        this.id= "";
        this.estado="";
        this.descuento="";
        alert(response.data[0].message);
        console.log(response.data.message);
        if(response.data[0].message == 'OK'){
          location.href = "http://159.203.94.72/#/rack";
        }
      })
      .catch(e => {
        this.errors.push(e)
      });

    },
    dateFormat: function(date) {
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
      if(this.nombre && this.fechaInicio && this.fechaTermino && this.rut && this.correo && this.telefono
      && this.rutUsuario && this.fechaNacimiento && this.descuento){
        this.createReserva();
      }
      else{
        alert('Se requiere completar todos los campos.')
      }
    },
    validarNombre:function(nombre){
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
    validarrut:function(rutUsuario){
      if(/^\d*$/.test(this.rutUsuario)){
        if(Object.keys(this.rutUsuario).length < 10){
          this.vatError = false;
          this.vatErrorMsg = null;
        }
        else{
          this.vatError = true;
          this.vatErrorMsg = "Largo del rut inválido."
        }
      }
      else{
        this.vatError = true;
        this.vatErrorMsg = "Ingrese un rut válido."
      }
    },
    validarTelefono:function(telefono){
      if(/^\d*$/.test(this.telefono)){
        if(Object.keys(this.telefono).length < 10){
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
    validarDescuento:function(descuento){
      if(/^\d*$/.test(this.descuento)){
        if(Object.keys(this.descuento).length < 3){
          this.vatError6 = false;
          this.vatErrorMsg6 = null;
        }
        else{
          this.vatError6 = true;
          this.vatErrorMsg6 = "Largo del descuento inválido."
        }
      }
      else{
        this.vatError6 = true;
        this.vatErrorMsg6 = "Ingrese un descuento válido."
      }
    },
    validarIdHab:function(IdHab){
      if(/^\d*$/.test(this.IdHab)){
        if(Object.keys(this.IdHab).length < 100){
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
  },
  mounted () {
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
