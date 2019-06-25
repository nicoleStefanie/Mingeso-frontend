<template>
  <div class="container">
    <md-card>
      <md-card-header data-background-color="green" style="position: relative;">
        <h3 class="title">Habitaciones</h3>
      </md-card-header>
      <md-card-content>
        <vs-table
          search
          max-items="10"
          pagination
          :data="items"
          class="text-center">
          <template slot="thead">
            <vs-th style="max-width: 20%;">
              Número de habitación
            </vs-th>
            <vs-th style="max-width: 20%;">
              Capacidad Adultos
            </vs-th>
            <vs-th style="max-width: 20%;">
              Capacidad Niños
            </vs-th>
            <vs-th style="max-width: 20%;">
              Precio por Noche
            </vs-th>
            <vs-th style="max-width: 20%;">
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
                <div class="con-expand-users">
                  <div>
                    <md-button class="md-raised md-success" type="button" @click="seleccionar(tr.idHabitacion)" >Seleccionar</md-button>
                  </div>
                </div>
              </template>
            </vs-tr>
          </template>
        </vs-table>
        <md-card-actions>
        </md-card-actions>
      </md-card-content>
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
        const url = localhost + '/habitaciones/filtrar?fechaInicio='+this.$route.params.fechaInicio+'&&fechaTermino='+this.$route.params.fechaTermino+'&&tipo='+this.$route.params.tipo;
        axios.get(url).then((data) => {
          this.items = data.data;
        });
      },
      seleccionar(idHab){
        location.href = '#/reservaSimple/'+idHab+'/'+this.$route.params.fechaInicio+'/'+this.$route.params.fechaTermino;
      }
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
