<template>
  <div class="container">
      <md-card>
        <md-card-header data-background-color="green" style="position: relative;">
          <h3 class="title">Asociar Servicio</h3>
        </md-card-header>
        <md-card-content v-show="step1">
          <br>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-40">
              <p>¿A qué habitación desea asociar un servicio?</p>
              <md-field>
                <label>Ingrese el número de la habitación deseada (ej: 1,2,3, etc.)</label>

                <md-input v-model="nroHabitacion" type="number" min="1"></md-input>
                <md-button class="md-raised md-success" @click="toggle1" style="margin-left:20px;">
                  <md-icon>arrow_forward_ios</md-icon></md-button>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-40" v-show="step2">

              <p>Seleccione un registro</p>
              <md-field>
                <select v-model="registro">
                  <option v-for="reg in registros" :value="reg.value" @onchange="toggle2">{{reg.representante}} con fecha de término: {{reg.fechaTermino}}</option>
                </select>
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-card-content v-show="!step1">
          <br>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-40">
              <p>¿A qué habitación desea asociar un servicio?</p>
              <md-field>
                <label>Ingrese el número de la habitación deseada (ej: 1,2,3, etc.)</label>
                <md-input v-model="nroHabitacion" type="number" min="1" @change="toggle1"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-40" v-show="step2">
              <p>¿A qué habitación desea asociar un servicio?</p>
              <md-field>
                <label>Ingrese el número de la habitación deseada (ej: 1,2,3, etc.)</label>
                <md-input v-model="nroHabitacion" type="number" min="1" @change="toggle1"></md-input>
              </md-field>
            </div>
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
          step2: false,
          nroHabitacion: 1,
          habitacion: [],
          registros: null,
          registro: '',
      }
    },
    methods: {
      toggle1(){
        const urltemp = localhost + '/habitaciones/nroHabitacion/' + this.nroHabitacion;
        axios.get(urltemp).then((data) => {
          this.habitacion = data.data;
          if(!this.habitacion){
            if(this.step2 == true){this.step2 = false;}
             this.$vs.notify({title:'No se encuentra la habitación ingresada.',text:'Porfavor, ingrese una habitación válida.',color:'danger',position:'top-center'});
          }
          else{
            this.getRegistros();
          }
        });
      },
      getRegistros(){
        const url = localhost + '/registro/nroHabitacion/' + this.nroHabitacion;
        axios.get(url).then((data) => {
          this.registros = data.data;
          if(this.registros.length == 0){
            if(this.step2 == true){this.step2 = false;}
            this.$vs.notify({title:'No se encuentran registros asociados a la habitación ingresada.',text:'Porfavor, ingrese otra habitación.',color:'danger',position:'top-center'});
          }
          else{
            if(this.step2 == false){this.step2 = true;}
            var i, aux;
            for(i=0;i<this.registros.length;i++){
              aux = this.registros[i].fechaTermino.split("T");
              this.registros[i].fechaTermino = aux[0];
            }
            this.organizarRegistros();
          }
        });
      },
      organizarRegistros(){

      },
      toggle2(){
        console.log(this.registro);
        this.step1 = !this.step1;
      }
    },
    mounted() {

    }
  }
</script>
