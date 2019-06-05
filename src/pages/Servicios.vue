<template>
  <div class="container">
        <md-card>
          <md-card-header data-background-color="green" style="position: relative;">
            <h3 class="title">Servicios</h3>
          </md-card-header>
            <md-card-content>
              <div  v-if="selected !== null">
                <md-button type="button" :href="'#/agregarServicio'" >Agregar Servicio</md-button>
                <md-button type="button" :href="'#/modificarServicio/'+ this.servicioI" >Editar</md-button>
                <md-button class="md-raised md-success" @click="deleteServicio">Eliminar Servicio</md-button>
              </div>
              <div v-else>
                <md-button type="button" :href="'#/agregarServicio'" >Agregar Servicio</md-button>
                <md-button type="button" :href="'#/modificarServicio/'+ this.servicioI" disabled>Editar</md-button>
                <md-button class="md-raised md-success" @click="deleteServicio" disabled>Eliminar Servicio</md-button>
              </div>
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
                <md-button type="button" :href="'#/modificarServicio/'+ this.servicioI" >Editar</md-button>
                <md-button class="md-raised md-success" @click="deleteServicio">Eliminar Servicio</md-button>
              </div>
              </md-card-actions>
            </md-card-content>
            <md-card-actions>
            <div>
              <md-button type="button" :href="'#/agregarServicio'" >Agregar Servicio</md-button>
            </div>
            </md-card-actions>
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
            fields: ["nombreServicio",
                     "descripcionServicio",
                     "precio",
                     "categoriaServicio"],
            items: [],
            selectMode: 'single',
            selected: null,
            selectMode: 'single',
            selected: null,
            servicioI: null,
        }
    },
    methods: {
      refresh(){
        location.reload(true);
      },
      getServicios(){
          const url = localhost + '/servicios';
          axios.get(url).then((data) => {
            this.items = data.data;
          });
        },

      rowSelected(items) {
        this.selected = items,
        this.servicioI = this.selected[0].idServicio
      },
      deleteServicio(){
        const url = localhost + '/servicios/delete/'+ this.servicioI;
        axios.post(url, {})
        .then(response => {
          alert(response.data[0].message);
          this.refresh();
        })
        .catch(e => {
          this.errors.push(e)
        });
        },
      },
    mounted() {
      this.getServicios();
    }
  }
</script>
