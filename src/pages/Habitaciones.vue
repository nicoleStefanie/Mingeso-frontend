<template>
  <div class="container">
        <md-card>
          <md-card-header data-background-color="green" style="position: relative;">
            <h3 class="title">Habitaciones</h3>
          </md-card-header>
            <md-card-content>
              <div v-if="isAdmin">
                <md-button class="md-raised md-success" type="button" :href="'#/agregarHabitacion'" >Agregar Habitacion</md-button>
              </div>
              <vs-table
                    search
                    max-items="10"
                    pagination
                    :data="items"
                    class="text-center">
                    <template slot="thead">
                      <vs-th style="width: 20%;">
                        Número de habitación
                      </vs-th>
                      <vs-th style="width: 20%;">
                        Capacidad Adultos
                      </vs-th>
                      <vs-th style="width: 20%;">
                        Capacidad Niños
                      </vs-th>
                      <vs-th style="width: 20%;">
                        Precio por Noche
                      </vs-th>
                      <vs-th style="width: 20%;">
                        Tipo de habitación
                      </vs-th>
                    </template>

                    <template slot-scope="{data}">
                      <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
                        <vs-td :data="tr.nroHabitacion">
                          {{tr.nroHabitacion}}
                        </vs-td>

                        <vs-td :data="tr.capacidadAdultos">
                          {{tr.capacidadAdultos}}
                        </vs-td>

                        <vs-td :data="tr.capacidadNinos">
                          {{tr.capacidadNinos}}
                        </vs-td>

                        <vs-td :data="tr.precioNoche">
                          {{tr.precioNoche}} CLP
                        </vs-td>

                        <vs-td :data="tr.tipoHabitacion">
                          {{tr.tipoHabitacion}}
                        </vs-td>
                        <template class="expand-user" slot="expand">
                          <div class="con-expand-users" v-if="isAdmin">
                              <div>
                                <md-button class="md-raised md-success" type="button" :href="'#/modificarHabitacion/'+ tr.idHabitacion" >Editar Habitación</md-button>
                                <md-button v-show="tr.tipoHabitacion == 'Inhabilitada'" class="md-raised md-warning" @click="habilitar(tr.idHabitacion)">Habilitar Habitación</md-button>
                                <md-button v-show="tr.tipoHabitacion != 'Inhabilitada'" class="md-raised md-warning" @click="deshabilitar(tr.idHabitacion)">Deshabilitar Habitación</md-button>
                                <md-button class="md-raised md-danger" @click="deleteHabitacion(tr.idHabitacion)">Eliminar Habitación</md-button>
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
              <md-button class="md-raised md-success" type="button" :href="'#/agregarHabitacion'" >Agregar Habitación</md-button>
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
        items:[],
        isAdmin: false,
      }
    },
    methods: {
      refresh(){
        location.reload(true);
      },
      getHabitaciones(){
          const url = localhost + '/habitaciones';
          axios.get(url).then((data) => {
            this.items = data.data;
          });
        },
      deshabilitar(id){
        const url = localhost + '/habitaciones/deshabilitar/' + id;
        axios.post(url, {
            tipo : "Inhabilitada",
          })
          .then(response => {
            if(response.data[0].message == 'Operación realizada con exito'){
              this.$vs.notify({title:'La habitación ha sido deshabilitada correctamente',color:'success',position:'bottom-center'});
              this.refresh();
            }
            else{
              this.$vs.notify({title:'La habitación no se ha podido deshabilitar',color:'warning',position:'bottom-center'});
            }
          })
          .catch(e => {
            this.errors.push(e)
          })
        },
        habilitar(id){
          var url = "#/habilitarHabitacion/" + id;
          location.href = url;
        },
      deleteHabitacion(id){
        const url = localhost + '/habitaciones/delete/'+ id;
        axios.post(url, {
          })
          .then(response => {
            if(response.data[0].message == 'La habitacion ha sido borrada'){
              this.$vs.notify({title:'La habitación ha sido eliminada correctamente',color:'success',position:'bottom-center'});
              this.refresh();
            }
            else{
              this.$vs.notify({title:'La habitación no se ha podido eliminar',color:'danger',position:'bottom-center'});
            }
          })
          .catch(e => {
            this.errors.push(e)
          })
        },
      },
    mounted() {
    this.getHabitaciones();
    if (localStorage.getItem('role') != 'Administrador') {
      this.isAdmin = false
    }
    else {
      this.isAdmin = true
    }
    }
  }
</script>
