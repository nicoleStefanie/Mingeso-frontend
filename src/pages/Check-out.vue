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
            <div class="text-center" v-show="this.registrosCheckOut.length > 0">
              <vs-table
                multiple
                v-model="registrosSeleccionados"
                :data="registrosCheckOut"
                class="text-center">
              <template slot="header">
                <h3 style="margin-left: 20%;">Registros incorporados</h3>
              </template>
              <template slot="thead">
                <vs-th style="max-width: 25%;">
                  Representante
                </vs-th>
                <vs-th style="max-width: 25%;">
                  Número de habitación
                </vs-th>
                <vs-th style="max-width: 25%;">
                  Fecha de Inicio
                </vs-th>
                <vs-th style="max-width: 25%;">
                  Fecha de Término
                </vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
                  <vs-td :data="data[indextr].representante">
                    {{data[indextr].representante}}
                  </vs-td>

                  <vs-td :data="data[indextr].nroHabitacion">
                    {{data[indextr].nroHabitacion}}
                  </vs-td>

                  <vs-td :data="data[indextr].fechaI">
                    {{data[indextr].fechaI}}
                  </vs-td>

                  <vs-td :data="data[indextr].fechaT">
                    {{data[indextr].fechaT}}
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
            <div class="md-layout-item md-size-100 text-right">
              <md-button class="md-raised md-success" @click="remover">Remover</md-button>
            </div>
            </div>
        </md-card-content>


        <md-card-content v-show="!step1">
          <div class="md-layout">
            <vs-table
              :data="registrosCheckOut"
              class="text-center">
              <template slot="thead">
                <vs-th style="max-width: 15%;">
                  Representante
                </vs-th>
                <vs-th style="max-width: 15%;">
                  Número de habitación
                </vs-th>
                <vs-th style="max-width: 15%;">
                  Fecha de Inicio
                </vs-th>
                <vs-th style="max-width: 15%;">
                  Fecha de término
                </vs-th>
                <vs-th style="max-width: 10%;">
                  Total de días
                </vs-th>
                <vs-th style="max-width: 10%;">
                  Precio por día
                </vs-th>
                <vs-th style="max-width: 10%;">
                  Precio total
                </vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
                  <vs-td :data="tr.representante">
                    {{tr.representante}}
                  </vs-td>

                  <vs-td :data="tr.nroHabitacion">
                    {{tr.nroHabitacion}}
                  </vs-td>

                  <vs-td :data="tr.fechaI">
                    {{tr.fechaI}}
                  </vs-td>

                  <vs-td :data="tr.fechaT">
                    {{tr.fechaTermino}}
                  </vs-td>

                  <vs-td :data="tr.fechaT">
                    {{tr.fechaTermino}}
                  </vs-td>

                  <vs-td :data="tr.fechaTermino">
                    {{tr.fechaTermino}}
                  </vs-td>

                  <template class="expand-user" slot="expand">
                    <div class="con-expand-users">
                      <vs-table
                        :data="tr.servicios"
                        class="text-center">
                        <template slot="header">
                          <h3>Servicios consumidos</h3>
                        </template>
                        <template slot="thead">
                          <vs-th style="max-width: 20%;">
                            Servicio
                          </vs-th>
                          <vs-th style="max-width: 60%;">
                            Descripción
                          </vs-th>
                          <vs-th style="max-width: 10%;">
                            Categoría
                          </vs-th>
                          <vs-th style="max-width: 10%;">
                            Precio
                          </vs-th>
                        </template>

                        <template slot-scope="{data}">
                          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
                            <vs-td :data="tr.servicios.nombreServicio">
                              {{tr.servicios.nombreServicio}}
                            </vs-td>

                            <vs-td :data="tr.servicios.descripcionServicio">
                              {{tr.servicios.descripcionServicio}}
                            </vs-td>

                            <vs-td :data="tr.servicios.categoriaServicio">
                              {{tr.servicios.categoriaServicio}}
                            </vs-td>

                            <vs-td :data="tr.servicios.precio">
                              ${{tr.servicios.precio}} CLP
                            </vs-td>
                          </vs-tr>
                        </template>
                      </vs-table>
                    </div>
                  </template>
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
          nombre: '',
          fechaI: '',
          fechaT: '',
          step1: true,
          registro: [],
          registros: [],
          servicios: [],
          habitaciones: [],
          nroHabitacion: '',
          servicioRegistro: [],
          registrosCheckOut: [],
          registrosSeleccionados: [],
          dataRegistrosCheckOut: ["representante","nroHabitacion","fechaI","fechaT"],
          registrosFinal: ["representante","nroHabitacion","fechaI","fechaT","totalD","precioD","totalPrecio","servicios"],
      }
    },
    methods: {
      remover(){
        for(var i=0;i<this.registrosSeleccionados.length; i++){
          for(var j=0;j<this.registrosCheckOut.length;j++){
            if(this.registrosCheckOut[j].idRegistro == this.registrosSeleccionados[i].idRegistro){
              this.registrosCheckOut.splice(j,1);
              j--;
            }
          }
        }
      },
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
          this.dataRegistrosCheckOut.representante = this.registro.representante;
          this.dataRegistrosCheckOut.nroHabitacion = this.nroHabitacion;
          this.dataRegistrosCheckOut.fechaI = this.registro.fechaInicio;
          this.dataRegistrosCheckOut.fechaT = this.registro.fechaTermino;
          this.registrosCheckOut.push(this.dataRegistrosCheckOut);
          this.nroHabitacion = '';
          this.registro = '';
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
