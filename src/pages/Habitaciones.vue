<template>
  <div class="container">
        <md-card>
          <md-card-header data-background-color="green" style="position: relative;">
            <h3 class="title">Habitaciones</h3>
          </md-card-header>
            <md-card-content>
            <div>
              <b-table
                selectable
                :select-mode="selectMode"
                selectedVariant="success"
                :items="items"
                :fields = "fields"
                @row-selected="rowSelected"
              ></b-table>
            </div>
              <md-card-actions>
              <div  v-if="selected !== null">
                <md-button type="button" :href="'#/modificarHabitacion/'+ this.habitacion" >Editar</md-button>
                <md-button class="md-raised md-success" @click="deleteHabitacion">Eliminar Habitación</md-button>
                <md-button  v-if= "arreglo !== 'Inhabilitada'" class="md-raised md-success" @click="deshabilitar" >Deshabilitar Habitación</md-button>
                <md-button  v-else class="md-raised md-success" :href="'#/habilitarHabitacion/'+ this.habitacion">Habilitar Habitación</md-button>
              </div>
              </md-card-actions>
            </md-card-content>
            <md-card-actions>
            <div>
              <md-button type="button" :href="'#/agregarHabitacion'" >Agregar Habitacion</md-button>
            </div>
            </md-card-actions>
        </md-card>
    </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
const localhost = 'http://159.203.94.72:8060/backend/';
export default {
    components: {
    },
    data(){
      return{
        fields: ["nroHabitacion",
        "capacidadNinos",
        "capacidadAdultos",
        "precioNoche",
        "tipoHabitacion"],
        items:[],
        errors:[],
        itemsCompleto: [],
        selectMode: 'single',
        selected: null,
        habitacion: null,
        arreglo : null,
      }
    },
    methods: {
      getHabitaciones(){
          const url = localhost + '/habitaciones';
          axios.get(url).then((data) => {
            this.items = data.data;
          });
        },

      rowSelected(items) {
        this.selected = items;
        this.habitacion = this.selected[0].idHabitacion;
        this.arreglo = this.selected[0].tipoHabitacion;

      },
      deshabilitar(){
        const url = localhost + '/habitaciones/deshabilitar/' + this.habitacion;
        axios.post(url, {
            tipo : "Inhabilitada",
          })
          .then(response => {
            alert(response.data[0].message);
          })
          .catch(e => {
            this.errors.push(e)
          })
      },
      deleteHabitacion(){
        const url = localhost + '/habitaciones/delete/'+ this.habitacion;
        axios.post(url, {

          })
          .then(response => {
            alert(response.data[0].message);
          })
          .catch(e => {
            this.errors.push(e)
          })
        },
      },
    mounted() {
    this.getHabitaciones();
    }
  }
</script>
