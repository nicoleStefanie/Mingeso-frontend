<template>
  <form id="simple">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Editando Reserva</h4>
        <p class="category">La reserva que quiera editar, la podrá editar posteriormente.</p>
      </md-card-header>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-30">
            <md-field>
              <label>Código de la reserva</label>
              <md-input v-model="id_reserva" type="number" min="1"></md-input>
            </md-field>
              <p v-if="id_reserva">{{ id_reserva }}</p>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50" v-if="id_reserva != null">
            <md-button class="md-raised md-success" @click.native="evento(id_reserva)"
            :href="'#/modificarReservaSimple/'+ this.id_reserva">Editar Reserva</md-button>
          </div>
        </div>
      </md-card-content>
    <md-card-content>
      <div class="md-layout-item md-small-size-100 md-size-50">
        <md-button class="md-raised md-size-50 md-success md-accent" :href="'#/reservas'">ATRAS</md-button>
      </div>
    </md-card-content>
    </md-card>
  </form>
</template>

<script>
/* eslint-disable */
export default{
  name: 'simple',
  props: {
    dataBackgroundColor: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      id_reserva: null
      }
  },
  methods:{
    evento: function(id_reserva) {
      if(id_reserva == null)
      {
        alert('Se requiere completar el campo de Código de Reserva');
      }
      return
    }
  }
}
</script>


<style>

</style>

