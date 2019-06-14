<template>
  <div class="container">
        <md-card>
          <md-card-header data-background-color="green" style="position: relative;">
            <h3 class="title">Usuarios</h3>
          </md-card-header>
            <md-card-content>
              <div v-if="isAdmin">
                <md-button class="md-raised md-success" type="button" :href="'#/agregarEmpleado'" >Agregar Usuario</md-button>
              </div>
              <vs-table
                    :data="items">
                    <template slot="thead">
                      <vs-th style="max-width: 25%;">
                        Nombre
                      </vs-th>
                      <vs-th style="max-width: 25%;">
                        Rol
                      </vs-th>
                      <vs-th style="max-width: 25%;">
                        Correo
                      </vs-th>
                      <vs-th style="max-width: 25%;">
                        Rut
                      </vs-th>
                    </template>

                    <template slot-scope="{data}">
                      <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
                        <vs-td :data="tr.nombreUsuario">
                          {{tr.nombreUsuario}}
                        </vs-td>

                        <vs-td :data="tr.rolUsuario">
                          {{tr.rolUsuario}}
                        </vs-td>

                        <vs-td :data="tr.correoUsuario">
                          {{tr.correoUsuario}}
                        </vs-td>

                        <vs-td :data="tr.rutUsuario">
                          {{tr.rutUsuario}}
                        </vs-td>

                        <template class="expand-user" slot="expand">
                          <div class="con-expand-users" v-if="isAdmin">
                              <div>
                                <md-button class="md-raised md-success" type="button" :href="'#/modificarEmpleado/'+ tr.idUser" >Editar Usuario</md-button>
                                <md-button class="md-raised md-danger" @click="deleteUsuario(tr.idUser)">Eliminar Usuario</md-button>
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
              <md-button class="md-raised md-success" type="button" :href="'#/agregarEmpleado'" >Agregar Usuario</md-button>
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
            isAdmin: false,
        }
    },
    methods: {
      refresh(){
        location.reload(true);
      },
      getUsuarios(){
          const url = localhost + '/usuarios';
          axios.get(url).then((data) => {
            this.items = data.data;
          });
        },
      deleteUsuario(id){
        const url = localhost + '/usuarios/delete/'+ id;
        axios.post(url, {})
        .then(response => {
          if(response.data[0].message == 'OK, user erased!.'){
            this.$vs.notify({title:'El usuario ha sido eliminado correctamente.',color:'success',position:'top-center'});
            this.refresh();
          } else {
            this.$vs.notify({title:'No se ha podido eliminar el usuario.',color:'danger',position:'top-center'});
          }
        });
      },
    },
    mounted() {
      this.getUsuarios();
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
