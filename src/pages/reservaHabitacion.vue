<template>
  <div class="container">
    <md-card>
      <md-card-header data-background-color="green" style="position: relative;">
        <h3 class="title">Reserva #{{reserva.codigoReserva}}</h3>
      </md-card-header>
      <md-card-content>
        <div>
          <div class="md-layout-item md-small-size-50 md-size-50"><p>Nombre Cliente: {{reserva.nombreCliente}}</p></div>
          <div class="md-layout-item md-small-size-50 md-size-50"><p>Rut Cliente: {{reserva.rutCliente}}</p></div>
          <div class="md-layout-item md-small-size-50 md-size-50"><p>Correo Cliente: {{reserva.correoCliente}}</p></div>
          <div class="md-layout-item md-small-size-50 md-size-50"><p>Descuento aplicado: {{reserva.descuento}}%</p></div>
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
            <md-button type="button" :href="'#/registroCliente/'+ this.habitacion" >Registrar Clientes</md-button>
          </div>

        </md-card-actions>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
    import axios from 'axios';
    const localhost = "http://localhost:8060/"
    const localhost2 = 'http://159.203.94.72:8060/backend/';
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
            "tipoHabitacion"],
          items:[],
          errors:[],
          itemsCompleto: [],
          selectMode: 'single',
          selected: null,
          habitacion: null,
          arreglo : null,
          reserva : null,
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
            console.log(this.items);
          });
        },
        rowSelected(items) {
          this.selected = items;
          this.habitacion = this.selected[0].idHab;
          this.arreglo = this.selected[0].tipoHabitacion;

        },
      },
      mounted() {
        this.getReserva();
      }
    }
</script>

<style scoped>

</style>
