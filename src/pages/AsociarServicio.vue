<template>
  <div class="container">
      <md-card>
        <md-card-header data-background-color="green" style="position: relative;">
          <h3 class="title">Asociar Servicio</h3>
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
            </div>
            <md-card-actions>
              <md-button class="md-raised md-success" type="button" @click="validar">Continuar</md-button>
            </md-card-actions>
        </md-card-content>

        </md-card-content>
        <md-card-content v-show="!step1">
          <form>
          <br>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 text-center">
                <vs-table
                  search
                  multiple
                  max-items="10"
                  pagination
                  v-model="serviciosSeleccionados"
                  :data="servicios"
                  class="text-center">
                <template slot="header">
                  <h3>Seleccione los servicios que desea incorporar al registro</h3>
                </template>
                <template slot="thead">
                  <vs-th style="max-width: 25%;">
                    Servicio
                  </vs-th>
                  <vs-th style="max-width: 25%;">
                    Descripción
                  </vs-th>
                  <vs-th style="max-width: 25%;">
                    Categoría
                  </vs-th>
                  <vs-th style="max-width: 25%;">
                    Precio
                  </vs-th>
                </template>

                <template slot-scope="{data}">
                  <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
                    <vs-td :data="data[indextr].nombreServicio">
                      {{data[indextr].nombreServicio}}
                    </vs-td>

                    <vs-td :data="data[indextr].descripcionServicio">
                      {{data[indextr].descripcionServicio}}
                    </vs-td>

                    <vs-td :data="data[indextr].categoriaServicio">
                      {{data[indextr].categoriaServicio}}
                    </vs-td>

                    <vs-td :data="data[indextr].precio">
                      ${{data[indextr].precio}} CLP
                    </vs-td>
                  </vs-tr>
                </template>
              </vs-table>
              <md-card-actions>
                <md-button class="md-raised md-success" @click="volver">Volver</md-button>
                <md-button class="md-raised md-success" type="button" @click="validar2">Asociar Servicios</md-button>
              </md-card-actions>
            </div>
          </div>
        </form>
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
          step2: false,
          nroHabitacion: '',
          nombre: '',
          fechaI: '',
          fechaT: '',
          registros: [],
          registro: [],
          habitacion: [],
          servicios: [],
          serviciosSeleccionados: [],
      }
    },
    methods: {
      validar2(){
        if(this.serviciosSeleccionados.length > 0){
          console.log(this.serviciosSeleccionados[0].idServicio);
          this.incorporar();
        } else {
          this.$vs.notify({title:'Debe seleccionar al menos un servicio.',color:'danger',position:'bottom-center'});
        }
      },
      validar(){
        if(this.nroHabitacion && this.registro){
          this.step1 = !this.step1;
          const url = localhost + '/servicios';
          axios.get(url).then((data) => {
            this.servicios = data.data;
          });
        } else {
            this.$vs.notify({title:'Debe seleccionar una habitación.',color:'danger',position:'bottom-center'});
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
        var url = localhost + '/registroServicio/create';
        for(var i=0;i<this.serviciosSeleccionados.length;i++){
          axios.post(url, {
            idServicio: this.serviciosSeleccionados[i].idServicio,
            idRegistro: this.registro.idRegistro
          }).then(response => {
            if(response.data[0].message == 'RegistroServicio agregado con exito'){
              location.href = "http://159.203.94.72/#/rack";
              this.$vs.notify({title:'Se incorporó el, o los servicios correctamente.',color:'success',position:'bottom-center'});
            }
          }).catch(e => {
            this.$vs.notify({title:'No se pudo incorporar el, o los servicios solicitados.',color:'danger',position:'bottom-center'});
          });
        }
      },
      volver(){
        location.reload();
      },
    },
    mounted () {
      if (!localStorage.getItem('login')) {
        this.$router.push('Login')
      }
    }
  }
</script>
