<template>
  <div class="container">
        <md-card>
          <md-card-header data-background-color="green" style="position: relative;">
            <h3 class="title">Reservas</h3>
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
                <md-button type="button" :href="'#/modificartodo/'+ this.codigoreserva" >Editar todos los datos</md-button>
                <md-button type="button" :href="'#/modificarfechas/'+ this.codigoreserva +'/'+ this.idHabitacion ">Editar fecha de reserva</md-button>
                <md-button type="button" @click="eliminaReserva">Eliminar reserva</md-button>
              </div>
              </md-card-actions>
            </md-card-content>
            <md-card-actions>
            <div>
            </div>
            </md-card-actions>
        </md-card>
    </div>
</template>

<script>
import axios from 'axios';
const localhost = 'http://159.203.94.72:8060/backend/';
import { access } from 'fs';
export default {
    components: {
    },
    data(){
      return{
        fields: [ "codigoReserva",
            "rut",
            "estado",
            "idCliente",
            "nombreCliente",
            "fechaInicio",
            "fechaTermino",
            "nroHabitacion"],
        items:[],
        errors:[],
        itemsCompleto: [],
        selectMode: 'single',
        selected: null,
        codigoreserva: null,
        idHabitacion:[],
        arreglo : null,
        estado:'',
      }
    },
    methods: {
      getReservas(){
          const url = localhost + '/reservas/mostrarReservas/';
          axios.get(url).then((data) => {
            this.items = data.data;
          });
        },
      rowSelected(items) {
        this.selected = items;
        this.codigoreserva = this.selected[0].codigoReserva;
        this.idHabitacion = this.selected[0].idHab;
      },
      eliminaReserva() {
        var url = localhost + '/reservahabitacion/update/';
        var idString = "" + this.codigoreserva;
        url = url + idString;
        axios.post(url, {estado: "0"})

        .then(response => {

          this.estado = "";
          alert(response.data[0].message);
          console.log(response.data.message);
        })
        .catch(e => {
          this.errors.push(e)
        });
      },
    },
    mounted() {
    this.getReservas();
    }
  }
</script>
