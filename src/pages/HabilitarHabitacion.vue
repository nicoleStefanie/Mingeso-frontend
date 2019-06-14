<template>
    <form>
        <md-card>
            <md-card-header data-background-color="green">
                <h4 class="title">Habilitar Habitación</h4>
                <p class="category">Indique el nuevo tipo de la habitacion</p>
            </md-card-header>
            <md-card-content>
                <div class="md-layout">

                  <div class="md-layout-item md-small-size-100 md-size-50">
                      <md-field>
                        <vs-select v-model="tipo" placeholder="Seleccione un tipo de habitación">
                          <vs-select-item value="Simple" text="Simple"/>
                          <vs-select-item value="Doble" text="Doble"/>
                          <vs-select-item value="Triple" text="Triple"/>
                          <vs-select-item value="Cuadruple" text="Cuadruple"/>
                          <vs-select-item value="Matrimonial" text="Matrimonial"/>
                        </vs-select>
                      </md-field>
                  </div>
                    <div class="md-layout-item md-size-100 text-right">
                        <md-button class="md-raised md-success" :href="'#/habitaciones'">Volver</md-button>
                        <md-button class="md-raised md-success"  @click="validar">Habilitar</md-button>
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
      tipo:'',
    }
  },
  methods: {
    validar: function(){
      if( this.tipo )
       this.habilitar();

        else{
          this.$vs.notify({title:'Se requiere completar todos los campos.',color:'danger',position:'bottom-center'});
        }
    },
    habilitar() {
      var url = localhost + '/habitaciones/deshabilitar/' + this.$route.params.id;
      axios.post(url, {
        tipo : this.tipo,

      })
      .then(response => {
        if(response.data[0].message == 'Operación realizada con exito'){
          this.$vs.notify({title:'Se ha habilitado la habitación.',color:'succes',position:'bottom-center'});
          location.href = "http://159.203.94.72/#/habitaciones";
        } else {
          this.$vs.notify({title:'No se pudo habilitar la habitación.',color:'danger',position:'bottom-center'});
        }
      })
    }
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
