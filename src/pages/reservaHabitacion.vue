<template>
  <div class="container">
    <md-card>
      <md-card-header data-background-color="green" style="position: relative;">
        <h3 class="title">Reserva #{{this.reserva.codigoReserva}}</h3>
      </md-card-header>
      <md-card-content>
        <div>
          <div class="md-layout-item md-small-size-50 md-size-50"><p><b>Nombre Cliente: {{reserva.nombreCliente}}</b></p></div>
          <div class="md-layout-item md-small-size-50 md-size-50"><p><b>Rut Cliente: {{reserva.rutCliente}}</b></p></div>
          <div class="md-layout-item md-small-size-50 md-size-50"><p><b>Correo Cliente: {{reserva.correoCliente}}</b></p></div>
          <div class="md-layout-item md-small-size-50 md-size-50"><p><b>Descuento aplicado: {{reserva.descuento}}%</b></p></div>
        </div>
        <div>
        <md-card-header data-background-color="green" style="position: relative; margin-top: 40px; height: 55px;">
          <h5 class="title">Habitaciones reservadas</h5>
        </md-card-header>
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
            <md-button type="button" class="md-raised md-success" :href="'#/registroCliente/'+ this.habitacion +'/'+ this.fechaInicio+'/'+this.fechaTermino+'/'+this.reserva.idReserva" >Registrar Clientes</md-button>
          </div>
        </md-card-actions>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
    import axios from 'axios';
    const localhost = 'http://159.203.94.72:8060/backend/';
    export default {
        name: "reservaHabitacion",
      data(){
        return{
          fields: [
            "fechaInicio",
            "fechaTermino",
            "nroHabitacion",
            "capacidadNinos",
            "capacidadAdultos",
            "precioNoche",
            "precioConDescuento",
            "tipoHabitacion"],
          items:[],
          errors:[],
          itemsCompleto: [],
          selectMode: 'single',
          selected: null,
          habitacion: null,
          fechaInicio : null,
          fechaTermino : null,
          reserva:null,
        }
      },
      methods: {
        refresh(){
          location.reload(true);
        },
        getReserva(){
          const url = localhost + 'reservas/conUsuario/'+ this.$route.params.idReserva;
          axios.get(url).then((data)=>{
            this.reserva = data.data;
            this.getHabitaciones();
          });
        },
        getHabitaciones(){
          const url = localhost + 'reservahabitacion/habitaciones/'+ this.reserva.idReserva;
          axios.get(url).then((data) => {
            this.items = data.data;
          });
        },
        rowSelected(items) {
          this.selected = items;
          this.habitacion = this.selected[0].idHab;
          this.fechaTermino = this.selected[0].fechaTermino;
          this.fechaInicio = this.selected[0].fechaInicio;
        },
      },
      mounted() {
        this.getReserva();
      }
    }
</script>

<style scoped>

</style>
