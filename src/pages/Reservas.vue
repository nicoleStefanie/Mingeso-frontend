<template>
  <div class="container">
    <md-card>
      <md-card-header data-background-color="purple" style="position: relative;">
        <div class="md-title">Realizar Reserva</div>
      </md-card-header>
      <md-card-content>
        Elija el tipo de reserva que quiere realizar.<br>
         <div class="md-layout-item md-size-100">
           <div class="places-buttons text-center">
                  <md-button class="md-raised md-danger" :href="'#/filtrarReserva'">Simple</md-button>
                   <br>
                  <md-button class="md-raised md-warning" :href="'#/filtrarReserva'">Múltiple</md-button>
                  <br>
              </div>
          </div>
      </md-card-content>
    </md-card>
    <md-card>
        <md-card-header data-background-color="purple" style="position: relative;">
          <div class="md-title">Gestión de Reserva</div>
        </md-card-header>
        <md-card-content>
        En esta sección se puede editar la información de una reserva y se puede eliminar una reserva.
         <div class="md-layout-item md-small-size-100 md-size-100">
        </div>
        <div class="md-layout-item md-small-size-100 md-size-100">
        </div>
        </md-card-content>
        <md-card-actions>
          <md-button class="md-raised md-success" type="button" :href="'#/vistaModificar'">Gestionar Reserva</md-button>
        </md-card-actions>
    </md-card>
  </div>
</template>

<script>
/* eslint-disable */
export default{
  name: 'Home',
  props: {
    dataBackgroundColor: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      datos: [],
      id_reserva: null,
      tipo_reserva: null,
    }
  },
  mounted () {
    if (!localStorage.getItem('login')) {
      this.$router.push('Login')
    }
  },
  methods: {
  }
}
</script>


<style>

</style>
