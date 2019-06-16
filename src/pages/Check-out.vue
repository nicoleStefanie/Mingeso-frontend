<template>
  <div class="container">
      <md-card>
        <md-card-header data-background-color="green" style="position: relative;">
          <h3 class="title">Check-out</h3>
          <p>Se creará un comprobante de pago con el cobro de las habitaciones y lo servicios consumidos</p>
        </md-card-header>

        <md-card-content v-show="step1">
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100 md-size-40">
                <md-field>
                  <label>Número de la habitación</label>
                  <md-input v-model="nroHabitacion" type = "number" min="1" @change="getRegistro"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-40">
                  <md-field>
                      <label>Nombre del representante</label>
                      <md-input v-model="nombre" type="text" disabled></md-input>
                  </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-40">
                  <md-field>
                      <label>Fecha de inicio</label>
                      <md-input v-model="fechaI" type="text" disabled></md-input>
                  </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-40">
                  <md-field>
                      <label>Fecha de término</label>
                      <md-input v-model="fechaT" type="text" disabled></md-input>
                  </md-field>
              </div>
              <div class="md-layout-item md-size-100 text-right">
                <p v-show="this.registrosCheckOut.length > 1">Ha incorporado: {{this.registrosCheckOut.length}} registros.</p>
                <p v-show="this.registrosCheckOut.length == 1">Ha incorporado: {{this.registrosCheckOut.length}} registro.</p>
                  <md-button class="md-raised md-success" @click="validar">Incorporar</md-button>
                  <md-button class="md-raised md-warning" @click="toggle">Finalizar</md-button>
              </div>
            </div>
        </md-card-content>


        <md-card-content v-show="!step1">
          <div class="md-layout">
            <vs-table stripe :data="registrosCheckOut">
              <template slot="header">
                <h3>Registros</h3>
              </template>
              <template slot="thead">
                <vs-th>Representante</vs-th>
                <vs-th>Habitación</vs-th>
                <vs-th>Días en uso</vs-th>
                <vs-th>Precio</vs-th>
              </template>
              <template slot-scope="{data}">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
                  <vs-td :data="data[indextr].representante">
                    {{data[indextr].representante}}
                  </vs-td>

                  <vs-td :data="data[indextr].idHab">
                    {{data[indextr].idHab}}
                  </vs-td>

                  <vs-td :data="data[indextr].id">
                    {{data[indextr].website}}
                  </vs-td>

                  <vs-td :data="data[indextr].id">
                    {{data[indextr].id}}
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>

        </md-card-content>
      </md-card>
    </div>
  </template>

<script>
/* eslint-disable */
import axios from 'axios';
const localhost = 'http://159.203.94.72:8060/backend';
export default {
    components: {
    },
    data(){
      return{
          step1: true,
          nroHabitacion: '',
          nombre: '',
          registros: [],
          registro: [],
          fechaI: '',
          fechaT: '',
          registrosCheckOut: [],
          servicios: [],
          habitaciones: [],
          servicioRegistro: [],
      }
    },
    methods: {
      toggle(){
        if(this.registrosCheckOut.length > 0){
          this.step1 = !this.step1;
          var url = localhost + '/servicios';
          axios.get(url).then((data) => {
            this.servicios = data.data;
            this.getHabitaciones();
          });
        } else {
          this.$vs.notify({title:'Debe incorporar al menos un registro.',color:'danger',position:'bottom-center'});
        }
      },
      getHabitaciones(){
        var url = localhost + '/habitaciones';
        axios.get(url).then((data) => {
          this.habitaciones = data.data;
          this.getServicioRegistro();
        });
      },
      getServicioRegistro(){
        var url = localhost + '/servicios';
        axios.get(url).then((data) => {
          this.servicios = data.data;
          this.getHabitaciones();
        });
      },
      organizarDatos(){

      },
      validar(){
        if(this.nroHabitacion && this.registro){
         this.incorporar();
        } else {
            this.$vs.notify({title:'Debe agregar un número de habitación.',color:'danger',position:'bottom-center'});
        }
      },
      getRegistro(){
        var url = localhost + '/registro/nroHabitacion/' + this.nroHabitacion;
        axios.get(url).then((data) => {
          this.registros = data.data;
          if(this.registros.length > 0){
            this.obtenerRegistro();
          } else {
            this.$vs.notify({title:'No se encontró registros para la habitación ingresada.',color:'danger',position:'bottom-center'});
            this.nroHabitacion = '';
          }
        });
      },
      obtenerRegistro(){
        var ultimoInicio = this.registros[0].fechaInicio.split("T")[0];
        var ultimoIndice = this.registros[0];
        for(var i=0;i<this.registros.length;i++){
          this.registros[i].fechaInicio = this.registros[i].fechaInicio.split("T")[0];
          this.registros[i].fechaTermino = this.registros[i].fechaTermino.split("T")[0];
          if(this.registros[i].fechaInicio >= ultimoInicio){
            ultimoInicio = this.registros[i].fechaInicio;
            ultimoIndice = this.registros[i];
          }
        }
        this.registro = ultimoIndice;
        this.fechaI = this.registro.fechaInicio;
        this.fechaT = this.registro.fechaTermino;
        this.nombre = this.registro.representante;
      },
      incorporar(){
        var isRegistro = true;
        for(var i=0; i<this.registrosCheckOut.length;i++){
          if(this.registrosCheckOut[i].idRegistro == this.registro.idRegistro){
              isRegistro = false;
              break;
          }
        }
        if(isRegistro == false){
          this.$vs.notify({title:'El registro de la habitación que desea incorporar ya se encuentra ingresado.',text:'Porfavor, ingrese otra habitación',color:'danger',position:'bottom-center'});
        } else {
          this.registrosCheckOut.push(this.registro);
          this.registro = '';
          this.nroHabitacion = '';
          this.fechaI = '';
          this.fechaT = '';
          this.nombre = '';
          this.$vs.notify({title:'Se incorporó el registro al check-out correctamente.',color:'success',position:'bottom-center'});
        }
      },





      finalizar(){
        this.$vs.notify({title:'Entregue el comprobante al cliente.',color:'success',position:'bottom-center'});
      }
    },
    mounted() {
      this.registrosCheckOut = new Array();
      if (!localStorage.getItem('login')) {
        this.$router.push('Login')
      }
    }
  }
</script>
