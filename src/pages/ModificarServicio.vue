<template>
    <form>
        <md-card>
            <md-card-header data-background-color="green" style="position: relative;">
                <h4 class="title">Editar Servicio </h4>
                <p class="category">Completar los campos </p>
            </md-card-header>
            <md-card-content>
                <div class="md-layout">
                    <div class="md-layout-item md-small-size-100 md-size-40">
                        <md-field>
                            <label>Nombre</label>
                            <md-input v-model="nombreServicio" type="text" value="nombre"></md-input>
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
                          <md-input v-model="precioServicio" value="item.precioServicio" type="number" min="1"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-100 text-right">
                      <md-button class="md-raised md-success" @click="volver">Volver</md-button>
                      <md-button class="md-raised md-success" @click="validar">Editar Servicio</md-button>
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
  name : 'modificarServicio',

  components: {
  },
  data(){
    return{
      nombreServicio: '',
      descripcion: '',
      precioServicio:'',
      categoriaServicio:'',
      servicios: [],
      item: [],
      errors: [],

    }
  },
  methods: {
    validar: function(){
      if(this.nombreServicio && this.descripcion && this.precioServicio > 0 && this.categoriaServicio){
        this.putServicio();
      }
      else{
        this.$vs.notify({title:'Se requiere completar los campos correctamente.',color:'danger',position:'bottom-center'});
      }
    },
    getServicio(){
      var url = localhost + '/servicios/';
      var idString = "" + this.$route.params.id;
      url = url + idString;
      axios.get(url).then((data) => {
        this.item = data.data;
        this.nombreServicio = this.item.nombreServicio;
        this.descripcion = this.item.descripcionServicio;
        this.precioServicio = this.item.precio;
        this.categoriaServicio = this.item.categoriaServicio;
      });
    },
    putServicio() {
      var url = localhost + '/servicios/update/';
      var idString = "" + this.$route.params.id;
      url = url + idString;
      axios.post(url, {
        nombreServicio : this.nombreServicio,
        descripcion : this.descripcion,
        precioServicio : this.precioServicio,
        categoriaServicio: this.categoriaServicio
      })
      .then(response => {
        this.nombreServicio = "";
        this.descripcion = "";
        this.precioServicio = "";
        this.categoriaServicio = "";
        if(response.data[0].message == 'El servicio ha sido editado'){
          this.$vs.notify({title:'El servicio ha sido editado correctamente.',color:'success',position:'bottom-center'});
          location.href = "http://159.203.94.72/#/servicios";
        }
        else{
          this.$vs.notify({title:'El servicio no se ha podido editar.',text:'Porfavor, verifique los datos ingresados.',color:'danger',position:'bottom-center'});
        }
      })
      .catch(e => {
        this.errors.push(e)
      });
    },
    volver(){
      location.href = "http://159.203.94.72/#/servicios";
    },
  },
  mounted(){
    this.getServicio()
    if (localStorage.getItem('role') != 'Administrador') {
      this.$router.push('Rack')
    }
    if (!localStorage.getItem('login')) {
      this.$router.push('Login')
    }
  }
}

</script>
