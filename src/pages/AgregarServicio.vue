<template>
    <form>
        <md-card>
            <md-card-header data-background-color="green" style="position: relative;">
                <h4 class="title">Agregar Servicio </h4>
                <p class="category">Completar los campos </p>
            </md-card-header>
            <md-card-content>
                <div class="md-layout">
                    <div class="md-layout-item md-small-size-100 md-size-40">
                        <md-field>
                            <label>Nombre</label>
                            <md-input v-model="nombreServicio" type="text"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-40">
                      <md-field>
                          <label>Categoría</label>
                          <md-input v-model="categoriaServicio" type="text"></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-40">
                      <md-field>
                          <label>Descripcion</label>
                          <md-textarea v-model="descripcion" type="text"></md-textarea>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-40">
                      <md-field>
                          <label>Precio</label>
                          <md-input v-model="precioServicio" type="number" min="1"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-100 text-right">
                      <md-button class="md-raised md-success" @click="volver">Volver</md-button>
                      <md-button class="md-raised md-success" @click="validar">Agregar Servicio</md-button>
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
  name : 'agregarServicio',
  components: {
  },
  data(){
    return{
      nombreServicio: '',
      descripcion:'',
      categoriaServicio:'',
      precioServicio:'',
      errors: [],
      vatError2:'',
      vatErrorMsg2:''
    }
  },
  methods: {
    validar: function(){
      if(this.nombreServicio && this.descripcion&& this.categoriaServicio && this.precioServicio > 0){
       this.agregarServicio();
      }
      else{
        this.$vs.notify({title:'Se requiere completar los campos correctamente.',color:'danger',position:'bottom-center'});
      }
    },
    agregarServicio() {
      var url = localhost + '/servicios/create';
      axios.post(url, {
        nombreServicio : this.nombreServicio,
        descripcion : this.descripcion,
        categoriaServicio : this.categoriaServicio,
        precioServicio: this.precioServicio
      })
      .then(response => {
        this.nombreServicio = "";
        this.descripcion = "";
        this.categoriaServicio = "";
        this.precioServicio = "";
        if(response.data[0].message == 'Servicio agregado con exito'){
          this.$vs.notify({title:'El servicio ha sido creado correctamente', color:'success',position:'bottom-center'});
          this.$router.push('servicios')
        } else {
          this.$vs.notify({title:'Error al crear servicio',text:'Porfavor, verifique los datos ingresados.', color:'danger',position:'bottom-center'});
        }
      })
      .catch(e => {
        this.errors.push(e)
      });
    },
    volver(){
      this.$router.push('servicios')
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
