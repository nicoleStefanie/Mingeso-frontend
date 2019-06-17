<template>
    <form>
        <md-card>
            <md-card-header data-background-color="green">
                <h4 class="title">Agregar Habitación</h4>
                <p class="category">Completar los campos</p>
            </md-card-header>
            <md-card-content>
                <div class="md-layout">
                    <div class="md-layout-item md-small-size-100 md-size-40">
                        <md-field>
                            <label>N° de habitacion</label>
                            <md-input v-model="nroHabitacion" type="number" min="1"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-60">
                        <md-field>
                          <vs-select v-model="tipo" placeholder="Seleccione un tipo de habitación">
                            <vs-select-item value="Simple" text="Simple"/>
                            <vs-select-item value="Doble" text="Doble"/>
                            <vs-select-item value="Triple" text="Triple"/>
                            <vs-select-item value="Cuadruple" text="Cuadruple"/>
                            <vs-select-item value="Matrimonial" text="Matrimonial"/>
                            <vs-select-item value="Inhabilitada" text="Inhabilitada"/>
                          </vs-select>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-40">
                        <md-field>
                            <label>Capacidad niños</label>
                            <md-input v-model="capacidadNinos" type="number" min="0"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-40">
                        <md-field>
                            <label>Capacidad Adultos</label>
                            <md-input v-model="capacidadAdultos" type="number" min="1"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-30">
                        <md-field>
                            <label>Precio Noche </label>
                            <md-input v-model="precioNoche" type="number" min="0"></md-input>
                            <md-icon>attach_money</md-icon>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-100 text-right">
                      <md-button class="md-raised md-success" @click="volver">Volver</md-button>
                      <md-button class="md-raised md-success"  @click="validar" >Agregar Habitación</md-button>
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
  name : 'agregarEmpleado',
  components: {
  },
  data(){
    return{
      nroHabitacion: '',
      tipo:'',
      capacidadNinos:'',
      capacidadAdultos:'',
      precioNoche:'',
    }
  },
  methods: {
    validar: function(){
      if(this.nroHabitacion && this.tipo && this.capacidadNinos && this.capacidadAdultos&& this.precioNoche)
       this.agregarHabitacion();
        else{
          this.$vs.notify({title:'Se requiere completar todos los campos.',color:'danger',position:'bottom-center'});
        }
    },
    agregarHabitacion() {
      var url = localhost + '/habitaciones/create';
      axios.post(url, {
        tipo : this.tipo,
        nroHabitacion : this.nroHabitacion,
        capacidadNinos : this.capacidadNinos,
        capacidadAdultos: this.capacidadAdultos,
        precioNoche: this.precioNoche

      })
      .then(response => {
        if(response.data[0].message == 'Habitacion agregada con exito'){
          this.$vs.notify({title:'La habitación se ha agregado correctamente.',color:'success',position:'bottom-center'});
          location.href = "http://159.203.94.72/#/habitaciones";
        } else {
          this.$vs.notify({title:'No se pudo agregar la habitación.',color:'danger',position:'bottom-center'});
        }
      })
    },
    volver(){
      location.href = "http://159.203.94.72/#/habitaciones";
    },
  },
  mounted () {
    if (localStorage.getItem('role') != 'Administrador') {
      this.$router.push('Rack')
    }
    if (!localStorage.getItem('login')) {
      this.$router.push('Login')
    }
  }
}
</script>
