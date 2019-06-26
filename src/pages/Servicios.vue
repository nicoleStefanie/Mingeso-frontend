<template>
  <div class="container">
        <md-card>
          <md-card-header data-background-color="green" style="position: relative;">
            <h3 class="title">Servicios</h3>
          </md-card-header>
            <md-card-content>
              <div v-if="isAdmin">
                <md-button class="md-raised md-success" type="button" :href="'#/agregarServicio'" >Agregar Servicio</md-button>
              </div>
              <vs-table
                    search
                    max-items="10"
                    pagination
                    :data="items"
                    class="text-center">
                    <template slot="thead">
                      <vs-th style="width: 20%;">
                        Servicio
                      </vs-th>
                      <vs-th style="width: 50%;position: relative;">
                        Descripción
                      </vs-th>
                      <vs-th style="width: 15%;">
                        Categoría
                      </vs-th>
                      <vs-th style="width: 15%;">
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
                          ${{tr.precio}} CLP
                        </vs-td>

                        <template class="expand-user" slot="expand">
                          <div class="con-expand-users" v-if="isAdmin">
                              <div>
                                <md-button class="md-raised md-success" type="button" :href="'#/modificarServicio/'+ tr.idServicio" >Editar Servicio</md-button>
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
            <div v-if="isAdmin">
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
            items: [],
            isAdmin: false
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
      deleteServicio(id){
        const url = localhost + '/servicios/delete/'+ id;
        axios.post(url, {})
        .then(response => {
          if(response.data[0].message == 'El servicio ha sido borrado'){
            this.$vs.notify({title:'Se eliminó el servicio correctamente.',color:'success',position:'bottom-center'});
            this.refresh();
          } else {
            this.$vs.notify({title:'No se pudo eliminar el servicio.',color:'danger',position:'bottom-center'});
          }
        })
        .catch(e => {
          this.errors.push(e)
        });
        },
      },
    mounted() {
      this.getServicios()
      if (!localStorage.getItem('login')) {
        this.$router.push('Login')
      }
      if (localStorage.getItem('role') != 'Administrador') {
        this.isAdmin = false
      }
      else {
        this.isAdmin = true
      }
    }
  }
</script>
