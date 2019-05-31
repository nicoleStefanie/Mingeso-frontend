<template>
  <div class="container">
    <md-card>
      <md-card-header>
        <div class="md-title">Realizar Reserva</div>
      </md-card-header>
      <md-card-content>
         <div class="md-layout-item md-size-100">
           <div class="places-buttons text-center">
                  <md-button type="button"  :href="'#/reservaSimple'" class=" md-primary md-wd md-sm md-theme-default">
                    <div class="md-ripple">
                      <div class="md-button-content"><b>Simple</b></div>
                        <span></span>
                    </div>
                   </md-button>
                   <br>
                   <md-button type="button" :href="'#/reservaMultiple'" class="md-primary md-wd md-sm md-theme-default">
                      <div class="md-ripple">
                         <div class="md-button-content"><b>Múltiple</b></div>
                         <span></span>
                      </div>
                  </md-button>
                  <br>
                  <md-button type="button" :href="'#/reservaEntradas'" class="md-primary md-wd md-sm md-theme-default">
                      <div class="md-ripple">
                         <div class="md-button-content"><b> Varias Entradas</b></div>
                         <span></span>
                      </div>
                  </md-button>
              </div>
          </div>
      </md-card-content>
    </md-card>
    <md-card>
        <md-card-header>
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
          <md-button type="button" :href="'#/vistaModificar'">Gestionar Reserva</md-button>
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
  mounted: function () {
  },
  methods: {
  }
}
</script>


<style>
  
</style>
