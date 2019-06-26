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
                  <md-button class="md-raised md-warning" @click="toggle">Continuar</md-button>
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
                  <vs-td :data="data[indextr].registro.representante">
                    {{data[indextr].registro.representante}}
                  </vs-td>

                  <vs-td :data="data[indextr].nroHabitacion">
                    {{data[indextr].nroHabitacion}}
                  </vs-td>

                  <vs-td :data="data[indextr].registro.fechaInicio">
                    {{data[indextr].registro.fechaInicio}}
                  </vs-td>

                  <vs-td :data="data[indextr].registro.fechaTermino">
                    {{data[indextr].registro.fechaTermino}}
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
            <vs-table
              :data="registrosCheckOut"
              class="text-center">
              <template slot="thead">
                <vs-th style="max-width: 25%;">
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
                <vs-th style="max-width: 15%;">
                  Total por la habitación
                </vs-th>
                <vs-th style="max-width: 15%;">
                  Total con servicios
                </vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
                  <vs-td :data="tr.registro.representante">
                    {{tr.registro.representante}}
                  </vs-td>

                  <vs-td :data="tr.nroHabitacion">
                    {{tr.nroHabitacion}}
                  </vs-td>

                  <vs-td :data="tr.registro.fechaInicio">
                    {{tr.registro.fechaInicio}}
                  </vs-td>

                  <vs-td :data="tr.registro.fechaTermino">
                    {{tr.registro.fechaTermino}}
                  </vs-td>

                  <vs-td :data="tr.registro.precio">
                    ${{tr.registro.precio}} {{currency}}
                  </vs-td>

                  <vs-td :data="tr.total">
                    ${{tr.total}} {{currency}}
                  </vs-td>

                  <template class="expand-user" slot="expand">
                    <div class="con-expand-users">
                      <vs-table
                        :data="tr.servicios"
                        class="text-center">
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
                            <vs-td :data="tr.nombreServicio">
                              {{tr.nombreServicio}}
                            </vs-td>

                            <vs-td :data="tr.descripcionServicio">
                              {{tr.descripcionServicio}}
                            </vs-td>

                            <vs-td :data="tr.categoriaServicio">
                              {{tr.categoriaServicio}}
                            </vs-td>

                            <vs-td :data="tr.precio">
                              ${{tr.precio}} {{currency}}
                            </vs-td>
                          </vs-tr>
                        </template>
                      </vs-table>
                    </div>
                  </template>
                </vs-tr>
              </template>
            </vs-table>
            <div class="md-layout-item md-size-100 text-right">
              <md-button class="md-raised md-success" @click="step1 = !step1">Volver</md-button>
              <md-button class="md-raised md-success" @click="finalizar">Finalizar</md-button>
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
          nroHabitacion: '',
          servicioRegistro: [],
          registrosCheckOut: [],
          registrosSeleccionados: [],
          registroServicio: [],
          serviciosAsociados: [],
          total: 0,
          currency: 'CLP',
        }
    },
    methods: {
      remover(){
        if(this.registrosSeleccionados.length > 0){
          var nuevosRegistrosCheckOut = new Array();
          for(var i=0;i<this.registrosCheckOut.length;i++){
            if(this.registrosSeleccionados.includes(this.registrosCheckOut[i])){}
            else{
                nuevosRegistrosCheckOut.push(this.registrosCheckOut[i]);
            }
          }
          this.registrosCheckOut = nuevosRegistrosCheckOut;
        } else {
          this.$vs.notify({title:'Debe seleccionar al menos un registro.',color:'danger',position:'bottom-center'});
        }
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
          if(this.registrosCheckOut[i].registro.idRegistro == this.registro.idRegistro){
              isRegistro = false;
              break;
          }
        }
        if(isRegistro == false){
          this.$vs.notify({title:'El registro de la habitación que desea incorporar ya se encuentra ingresado.',text:'Porfavor, ingrese otra habitación',color:'danger',position:'bottom-center'});
        } else {
          var url = localhost + '/registroServicio/registro/' + this.registro.idRegistro;
          this.total = this.registro.precio;
          axios.get(url).then((data) => {
            this.registroServicio = data.data;
            for(var i=0;i<this.registroServicio.length;i++){
              this.serviciosAsociados.push(this.registroServicio[i].servicio);
              this.total = this.total + this.registroServicio[i].servicio.precio;
            }
            this.registrosCheckOut.push({
              registro: this.registro,
              nroHabitacion: this.nroHabitacion,
              servicios: this.serviciosAsociados,
              total: this.total,
            });
            this.nroHabitacion = '';
            this.registro = '';
            this.fechaI = '';
            this.fechaT = '';
            this.nombre = '';
            this.serviciosAsociados = [];
            this.total = 0;
            this.$vs.notify({title:'Se incorporó el registro al check-out correctamente.',color:'success',position:'bottom-center'});
          });
        }
      },
      toggle(){
        if(this.registrosCheckOut.length > 0){
          this.step1 = !this.step1;
        } else {
          this.$vs.notify({title:'Debe incorporar al menos un registro.',color:'danger',position:'bottom-center'});
        }
      },
      finalizar(){
        var postComprobante = new Array();
        var url = localhost + '/comprobante/create';
        var ok = true;
        console.log(this.registrosCheckOut.length);
        for(var i=0;i<this.registrosCheckOut.length;i++){
          postComprobante.push({idRegistro: this.registrosCheckOut[i].registro.idRegistro,
          fechaInicio: this.registrosCheckOut[i].registro.fechaInicio,
          fechaTermino: this.registrosCheckOut[i].registro.fechaTermino})
        }
        axios.post(url, postComprobante, { headers: {'Access-Control-Allow-Headers':'Content-Type', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Origin': '*'} } )
        .then(console.log)
        .catch(e => {
          ok = false;
        });
        if(ok){
          this.$vs.notify({title:'Entregue el comprobante al cliente.',color:'success',position:'bottom-center'});
          this.$router.push('Rack')
        } else {this.$vs.notify({title:'No se pudo emitir el comprobante',color:'danger',position:'bottom-center'});}
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
