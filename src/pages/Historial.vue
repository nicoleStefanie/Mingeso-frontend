<template>
  <div class="container">
        <md-card>
          <md-card-header data-background-color="green" style="position: relative;">
            <h3 class="title">Historial</h3>
          </md-card-header>
            <md-card-content>
              <vs-table
                    search
                    max-items="10"
                    pagination
                    :data="items"
                    class="text-center">
                    <template slot="thead">
                      <vs-th style="max-width: 25%;">
                        Empleado
                      </vs-th>
                      <vs-th style="max-width: 25%;">
                        correo
                      </vs-th>
                      <vs-th style="max-width: 25%;">
                        Descripción
                      </vs-th>
                      <vs-th style="max-width: 25%;">
                        Fecha
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
