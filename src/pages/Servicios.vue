<template>
  <div class="container">
        <md-card>
          <md-card-header data-background-color="green" style="position: relative;">
            <h3 class="title">Servicios</h3>
          </md-card-header>
            <md-card-content>
              <md-button class="md-raised md-success" type="button" :href="'#/agregarServicio'" >Agregar Servicio</md-button>
              <vs-table
                    :data="items">
                    <template slot="thead">
                      <vs-th style="max-width: 20%;">
                        Servicio
                      </vs-th>
                      <vs-th style="max-width: 50%;">
                        Descripción
                      </vs-th>
                      <vs-th style="max-width: 15%;">
                        Categoría
                      </vs-th>
                      <vs-th style="max-width: 15%;">
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
                          {{tr.precio}}
                        </vs-td>

                        <template class="expand-user" slot="expand">
                          <div class="con-expand-users">
                              <div>
                                <md-button class="md-raised md-success" type="button" :href="'#/modificarServicio/'+ tr.idServicio" >Editar</md-button>
                                <md-button class="md-raised md-danger" @click="deleteServicio(tr.idServicio)">Eliminar Servicio</md-button>
                              </div>
                          </div>
                        </template>
                      </vs-tr>
                    </template>
                  </vs-table>
              <md-card-actions>
              </md-card-actions>
            </md-card-content>
            <md-card-actions>
            <div>
              <md-button class="md-raised md-success" type="button" :href="'#/agregarServicio'" >Agregar Servicio</md-button>
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
      deleteServicio(id){
        const url = localhost + '/servicios/delete/'+ id;
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
