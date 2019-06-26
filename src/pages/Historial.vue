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
                      <vs-th style="width: 15%;">
                        Empleado
                      </vs-th>
                      <vs-th style="width: 15%;">
                        correo
                      </vs-th>
                      <vs-th style="width: 55%;">
                        Descripción
                      </vs-th>
                      <vs-th style="width: 15%;">
                        Fecha
                      </vs-th>
                    </template>

                    <template slot-scope="{data}">
                      <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
                        <vs-td :data="tr.Empleado">
                          {{tr.Empleado}}
                        </vs-td>

                        <vs-td :data="tr.Correo">
                          {{tr.Correo}}
                        </vs-td>

                        <vs-td :data="tr.Descripcion">
                          {{tr.Descripcion}}
                        </vs-td>

                        <vs-td :data="tr.Fecha">
                          {{tr.Fecha}}
                        </vs-td>
                      </vs-tr>
                    </template>
                  </vs-table>
              <md-card-actions>
              </md-card-actions>
            </md-card-content>
            <md-card-actions>
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
      getHistorial(){
          const url = localhost + '/historial/history';
          axios.get(url).then((data) => {
            this.items = data.data;
          });
        },
    },
    mounted() {
      this.getHistorial();
      if (!localStorage.getItem('login')) {
        this.$router.push('Login')
      }
      if (localStorage.getItem('role') != 'Administrador') {
        this.isAdmin = false
        this.$router.push('Rack')
      }
      else {
        this.isAdmin = true
      }
    }
  }
</script>
