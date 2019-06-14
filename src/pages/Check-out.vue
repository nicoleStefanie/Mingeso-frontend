<template>
  <div class="container">
      <md-card>
        <md-card-header data-background-color="green" style="position: relative;">
          <h3 class="title">Check-out</h3>
        </md-card-header>
        <md-card-content v-show="toggle1">
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-40">
              <md-field>
                <label>¿Cuántas habitaciones realizan check-out?</label>
                <md-input v-model="cantHabitacionesString" type="number" min="1"></md-input>
              </md-field>
              <md-button class="md-raised md-success text-center" @click="toggle">Continuar</md-button>
            </div>
          </div>
        </md-card-content>

        <md-card-content v-show="!toggle1">
          <div class="md-layout" v-for="habitacion in cantHabitaciones">
            <div class="md-layout-item md-small-size-100 md-size-40">
              <md-field>
                <label>¿Cuántas habitaciones realizan check-out?</label>
                <md-input v-model="cantHabitacionesString" type="number" min="1"></md-input>
              </md-field>
              <md-button class="md-raised md-success text-center" @click="toggle">Continuar</md-button>
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
          registros: [],
          toggle1: true,
          cantHabitaciones: 0,
          cantHabitacionesString: '1',
      }
    },
    methods: {
      toggle(){
        this.toggle1 = !this.toggle1;
        this.cantHabitaciones = parseInt(this.cantHabitacionesString);
      }

    },
    mounted() {

    }
  }
</script>
