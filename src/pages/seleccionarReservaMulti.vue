<template>
  <div class="container">
    <md-card>
      <md-card-header data-background-color="green" style="position: relative;">
        <h3 class="title">Habitaciones</h3>
      </md-card-header>
      <md-card-content>
        <vs-table
          multiple
          v-model="selected"
          pagination
          max-items="10"
          search
          :data="items"
          class="text-center">
          <template slot="thead">
            <vs-th style="max-width: 20%;" sort-key="nroHabitacion" >
              Número de habitación
            </vs-th>
            <vs-th style="max-width: 20%;" sort-key="capacidadAdultos">
              Capacidad Adultos
            </vs-th>
            <vs-th style="max-width: 20%;" sort-key="capacidadNinos">
              Capacidad Niños
            </vs-th>
            <vs-th style="max-width: 20%;" sort-key="precioNoche">
              Precio por Noche
            </vs-th>
            <vs-th style="max-width: 20%;" sort-key="tipoHabitacion">
              Tipo de habitación
            </vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
              <vs-td :data="data[indextr].nroHabitacion">
                {{data[indextr].nroHabitacion}}
              </vs-td>

              <vs-td :data="data[indextr].capacidadAdultos">
                {{data[indextr].capacidadAdultos}}
              </vs-td>

              <vs-td :data="data[indextr].capacidadNinos">
                {{data[indextr].capacidadNinos}}
              </vs-td>

              <vs-td :data="data[indextr].precioNoche">
                {{data[indextr].precioNoche}} CLP
              </vs-td>

              <vs-td :data="data[indextr].tipoHabitacion">
                {{data[indextr].tipoHabitacion}}
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
        <div class="md-layout-item md-small-size-100 md-size-100 text-center" style="margin-left: 40%">
        <md-button class="md-raised md-success text-lg-right" style="width: 60%; font-size:20px" @click="mostrar()" >Reservar Habitaciones</md-button>
        </div>
        <pre>{{ ver }}</pre>
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
        ver: '',
        selected:[],
        items:[],
        isAdmin: false,
      }
    },
    methods: {
      mostrar(){
        if(this.selected != ''){
        for(var i=0;i<this.selected.length;i++){
          this.ver = this.ver+ this.selected[i].idHabitacion + ' ';
        }
        location.href = '#/reservaMulti/'+this.ver+'/'+this.$route.params.fechaInicio+'/'+this.$route.params.fechaTermino;
        }
        else{
          alert("No se ha seleccionado una reserva");
        }
      },
      refresh(){
        location.reload(true);
      },
      getHabitaciones(){
        const url = localhost + '/habitaciones/filtrar?fechaInicio='+this.$route.params.fechaInicio+'&&fechaTermino='+this.$route.params.fechaTermino+'&&tipo=no';
        axios.get(url).then((data) => {
          this.items = data.data;
        });
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
