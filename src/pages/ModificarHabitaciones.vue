<template>
    <form>
        <md-card>
            <md-card-header data-background-color="green">
                <h4 class="title">Modificar Habitación</h4>
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
                    <div class="md-layout-item md-small-size-100 md-size-40">
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
  name : 'modificarHabitacion',

  components: {
  },
  data(){
    return{
      nroHabitacion: '',
      tipo:'',
      capacidadNinos:'',
      capacidadAdultos:'',
      precioNoche:'',
      habitacion: [],
    }
  },
  methods: {
    validar: function(){
      if(this.nroHabitacion && this.tipo && this.capacidadNinos && this.capacidadAdultos&& this.precioNoche)
       this.putHabitacion();

        else{
          this.$vs.notify({title:'Se requiere completar todos los campos.',color:'danger',position:'bottom-center'});
        }

    },
    getHabitacion(){
      var url = localhost + '/habitaciones/';
      var idString = "" + this.$route.params.id;
      url = url + idString;
      axios.get(url).then((data) => {
        this.habitacion = data.data;
        this.nroHabitacion = this.habitacion.nroHabitacion;
        this.capacidadNinos = this.habitacion.capacidadNinos;
        this.capacidadAdultos = this.habitacion.capacidadAdultos;
        this.precioNoche = this.habitacion.precioNoche;
        this.tipo = this.habitacion.tipoHabitacion;
      })
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
        if(response.data[0].message == 'La Habitacion ha sido editada'){
          this.$vs.notify({title:'La habitación ha sido editada correctamente',color:'success',position:'bottom-center'});
          location.href = "http://159.203.94.72/#/habitaciones";
        } else {
          this.$vs.notify({title:'La habitación no se ha podido editar',color:'danger',position:'bottom-center'});
        }
      })
    }
  },
  mounted () {
    this.getHabitacion();
    if (localStorage.getItem('role') != 'Administrador') {
      this.$router.push('Rack')
    }
    if (!localStorage.getItem('login')) {
      this.$router.push('Login')
    }
  }
}

</script>
