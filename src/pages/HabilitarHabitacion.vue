<template>
    <form>
        <md-card>
            <md-card-header :data-background-color="dataBackgroundColor">
                <h4 class="title">Habilitar Habitación</h4>
                <p class="category">Indique el nuevo tipo de la habitacion</p>
            </md-card-header>
            <md-card-content>
                <div class="md-layout">

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
                    <div class="md-layout-item md-size-100 text-right">
                        <md-button class="md-raised md-success"  @click="validar" >Habilitar Habitación</md-button>
                    </div>
                </div>
            </md-card-content>
        </md-card>
    </form>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
const localhost = 'http://159.203.94.72:8060/backend/';
export default {
  name : 'agregarEmpleado',
  components: {
  },
  data(){
    return{

      tipo:'',
      habitaciones: [],
      errors: [],

    }
  },
  methods: {
    validar: function(){
      if( this.tipo )
       this.habilitar();

        else{
          alert('Se requiere completar todos los campos.')
        }
    },
    habilitar() {
      var url = localhost + '/habitaciones/deshabilitar/' + this.$route.params.id;
      axios.post(url, {
        tipo : this.tipo,

      })
      .then(response => {

        this.tipo = "";
        alert(response.data[0].message);
        console.log(response.data.message);
      })
      .catch(e => {
        this.errors.push(e)
      });
    }
  }
}
</script>
