<template>
  <div class="container">
    <md-card>
      <md-card-header data-background-color="green" style="position: relative;">
        <h3 class="title">Reservas</h3>
      </md-card-header>
      <md-card-content>
        <div>
          <vs-table
            search
            max-items="10"
            pagination
            :data="items"
            class="text-center">
            <template slot="thead">
              <vs-th style="max-width: 15%;">
                Código reserva
              </vs-th>
              <vs-th style="max-width: 15%;">
                Rut
              </vs-th>
              <vs-th style="max-width: 15%;">
                Estado
              </vs-th>
              <vs-th style="max-width: 15%;">
                Nombre cliente
              </vs-th>
              <vs-th style="max-width: 10%;">
                Número habitación
              </vs-th>
              <vs-th style="max-width: 15%;">
                Fecha inicio
              </vs-th>
              <vs-th style="max-width: 15%;">
                Fecha termino
              </vs-th>
            </template>
            <template slot-scope="{data}">
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
                <vs-td :data="tr.codigoReserva">
                  {{tr.codigoReserva}}
                </vs-td>
                <vs-td :data="tr.rut">
                  {{tr.rut}}
                </vs-td>
                <vs-td :data="tr.estado">
                  {{tr.estado}}
                </vs-td>
                <vs-td :data="tr.nombreCliente">
                  {{tr.nombreCliente}}
                </vs-td>
                <vs-td :data="tr.nroHabitacion">
                  {{tr.nroHabitacion}}
                </vs-td>
                <vs-td :data="tr.fechaInicio">
                  {{tr.fechaInicio}}
                </vs-td>
                <vs-td :data="tr.fechaTermino">
                  {{tr.fechaTermino}}
                </vs-td>
                <template class="expand-user" slot="expand">
                  <div>
                    <md-button type="button" :href="'#/modificartodo/'+ tr.codigoReserva" >Editar todos los datos</md-button>
                    <md-button type="button" :href="'#/modificarfechas/'+ tr.codigoReserva +'/'+ tr.nroHabitacion">Editar fecha de reserva</md-button>
                    <md-button type="button" @click="eliminaReserva(tr.codigoReserva)">Eliminar reserva</md-button>
                  </div>
                </template>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import axios from 'axios';
const localhost = 'http://159.203.94.72:8060/backend';
import { access } from 'fs';
export default {
    components: {
    },
    data(){
      return{
        items:[],
        errors:[],
      }
    },
    methods: {
      getReservas(){
          const url = localhost + '/reservas/mostrarReservas';
          axios.get(url).then((data) => {
            this.items = data.data;
            for(var i=0;i<this.items.length;i++){
              if(this.items[i].estado == 0){
                this.items[i].estado = "Cancelada";
              } else {
                this.items[i].estado = "Vigente";
              }
              this.items[i].fechaInicio = this.items[i].fechaInicio.split(" ")[0];
              this.items[i].fechaTermino = this.items[i].fechaTermino.split(" ")[0];
            }
          });
        },
      eliminaReserva(codigo) {
        var url = localhost + '/reservas/delete/';
        var idString = "" + codigo;
        url = url + idString;
        axios.post(url, {})
        .then(response => {
          alert(response.data[0].message);
          console.log(response.data.message);
        })
        .catch(e => {
          this.errors.push(e)
        });
      },
    },
    mounted() {
      this.getReservas()
      if (!localStorage.getItem('login')) {
        this.$router.push('Login')
      }
    }
  }
</script>
