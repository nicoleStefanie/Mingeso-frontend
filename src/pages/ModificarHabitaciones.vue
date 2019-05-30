<template>
    <form>
        <md-card>
            <md-card-header :data-background-color="dataBackgroundColor">
                <h4 class="title">Agregar Habitación</h4>
                <p class="category">Completar los campos</p>
            </md-card-header>
            <md-card-content>
                <div class="md-layout">
                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                            <label>N° de habitacion</label>
                            <md-input  v-model="nroHabitacion" type="number"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                            <select v-model="tipo">
                              <option disabled value="">Seleccione un tipo de habitacion</option>
                              <option>Simple</option>
                              <option>Doble</option>
                              <option>Triple</option>
                              <option>Cuadruple</option>
                              <option>Matrimonial</option>
                            </select>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                            <label>Capacidad niños</label>
                            <md-input v-model="capacidadNinos" type="number"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                            <label>Capacidad Adultos</label>
                            <md-input v-model="capacidadAdultos" type="number"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-30">
                        <md-field>
                            <label>Precio Noche </label>
                            <md-input v-model="precioNoche" type="number"></md-input>
                            <md-icon>attach_money</md-icon>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-100 text-right">
                        <md-button class="md-raised md-success"  @click="validar" >Modificar Habitación</md-button>
                    </div>
                </div>
            </md-card-content>
        </md-card>
    </form>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
const localhost = 'http://159.203.94.72:8060/backend';
export default {
  name : 'modificarProducto',

  components: {
  },
  data(){
    return{
      nroHabitacion: '',
        nroHabitacion2: '',
      tipo:'',
      capacidadNinos:'',
      capacidadAdultos:'',
      precioNoche:'',
      habitaciones: [],
      items:[],
      errors: [],

    }
  },
  methods: {
      
    validar: function(){
      if(this.nroHabitacion && this.tipo && this.capacidadNinos && this.capacidadAdultos&& this.precioNoche)
       this.putHabitacion();

        else{
          alert('Se requiere completar todos los campos.')
        }

    },
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
        console.log(response.data.message);
      })
      .catch(e => {
        this.errors.push(e)
      });
    }
  },
}

</script>
