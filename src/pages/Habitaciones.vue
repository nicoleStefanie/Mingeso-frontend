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
                <md-button class="md-raised md-success" @click="deleteHabitacion">Deshabilitar Habitación</md-button>
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
import axios from 'axios';
const localhost = 'http://localhost:8060';
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
        itemsCompleto: [],
        selectMode: 'single',
        selected: null,
        habitacion: null
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
        this.selected = items,
        this.habitacion = this.selected[0].idHabitacion
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
