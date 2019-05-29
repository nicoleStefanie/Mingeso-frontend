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
                <p class="error" v-if="vatError1">{{vatErrorMsg1}}</p>
          </div>
          <br><br><br>
          <div class="md-layout-item md-small-size-100 md-size-40">
                <b-form-input @keyup="validarRut" v-model="rut" placeholder="Rut"></b-form-input>
                  <p class="error" v-if="vatError2">{{vatErrorMsg2}}</p>
          </div>
          <br><br><br>
          <div class="md-layout-item md-small-size-100 md-size-40">
                <b-form-input type="date" @keyup="validarEdad" v-model="nacimiento" placeholder="Fecha de Nacimiento"></b-form-input>
                  <p class="error" v-if="vatError5">{{vatErrorMsg5}}</p>
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
          <br><br><br>
            <!--<div class="md-layout-item md-small-size-100 md-size-30">
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
          </div>-->
          <div class="md-layout-item md-small-size-100 md-size-33">
              <datepicker :disabledDates="fechasInicio" v-model="inicio" type="date" v-on:selected="seleccionada(inicio)" placeholder=" Fecha inicio"></datepicker>
                <p v-if="inicio">{{ dateFormat(inicio) }}</p>
               <div class="md-layout md-small-size-100 md-size-20" v-if="seleccion">
                  <b-form-select v-model="habitacion">
                      <option :value="null" disabled>Habitaciones Disponibles</option> 
                      <template v-for="r in reservas">
                          <template v-if="(r.fechainicio != (dateFormat(inicio))) && (r.id != r.habitacion)">
                            <option :key="r">{{ r.habitacion}}</option>
                          </template>
                      </template>
                  </b-form-select>
                <div class="mt-2">{{ habitacion }}</div>
              </div>
          </div>
          <br><br><br>
          <div class="md-layout-item md-small-size-100 md-size-33">
              <datepicker :disabledDates="fechaTermino" v-model="termino" type="date" placeholder=" Fecha Término"></datepicker>
                <p v-if="termino">{{ dateFormat(termino) }}</p>
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
        nombre: '',
        seleccion:'',
        rut: '',
        nacimiento:'',
        correo: '',
        telefono: '',
        habitacion: '',
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
        reservas:[
          {
            "habitacion":"2",
            "fechainicio":"2019-06-02",
            "fechatermino":"2019-06-07"
          },
          {
            "habitacion":"5",
            "fechainicio": "2019-06-03",
            "fechatermino": "2019-06-14"
          },
          {
            "habitacion":"8",
            "fechainicio":"2019-06-22",
            "fechatermino":"2019-06-20"
          }
        ],
        habitaciones:[
          {
            "id": "1",
          },
          {
            "id": "2",
          },
          {
            "id": "3",
          },
          {
            "id": "4",
          },
          {
            "id": "5",
          },
          {
            "id": "6",
          },
          {
            "id": "7",
          },
          {
            "id": "8",
          },
          {
            "id": "9",
          },
          {
            "id": "10",
          },
        ],
        habitacionesMax: 10,
        y:[],
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
            dates: [
              new Date(2019, 5, 16),
              new Date(2019, 5, 17),
              new Date(2019, 5, 18),
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
    validarEdad:function(nacimiento) { // birthday is a date
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
        if(Object.keys(this.rut).length < 9){
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