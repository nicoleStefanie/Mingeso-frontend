<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Modificar Habitación Seleccionada</h4>
        <p class="category">Completar con los campos que quiere modificar</p>
      </md-card-header>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>N° de habitacion</label>
              <md-input v-model="nroHabitacion" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Tipo</label>
              <md-input v-model="tipo" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Capacidad niños</label>
              <md-input v-model="capacidadNinos" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Capacidad Adultos</label>
              <md-input v-model="capacidadAdultos" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-30">
            <md-field>
              <label>Precio Noche </label>
                <md-input v-model="precioNoche"></md-input>
                <md-icon>attach_money</md-icon>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" @click="putHabitacion" >Modificar Habitación</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>

<script>
import axios from 'axios';
const localhost = 'http://localhost:8060';
export default {
  name : 'modificarProducto',

  components: {
  },
  data(){
    return{
      nroHabitacion: '',
      tipo:'',
      capacidadNinos:'',
      capacidadAdultos:'',
      precioNoche:'',
      habitaciones: [],
      errors: []
    }
  },
  methods: {
    putHabitacion() {
      var url = localhost + '/habitaciones/update/';
      var idString = "" + this.$route.params.id;
      url = url + idString;
      axios.post(url, {

        nroHabitacion : this.nroHabitacion,
        tipo : this.tipo,
        capacidadNinos : this.capacidadNinos,
        capacidadAdultos: this.capacidadAdultos,
        precioNoche: this.precioNoche

      })
      .then(response => {

        this.tipo = "";
        this.nroHabitacion = "";
        this.capacidadNinos = "";
        this.capacidadAdultos = "";
        this.precioNoche= "";
        alert(response.data[0].message);
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
  },
}

</script>
