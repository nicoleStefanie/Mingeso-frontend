<template>
    <form>
        <md-card>
            <md-card-header data-background-color="green">
                <h4 class="title">Editar Empleado </h4>
                <p class="category">Completar con los campos que quiere modificar</p>
            </md-card-header>
            <md-card-content>
                <div class="md-layout">
                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                            <label>Nombre Completo</label>
                            <md-input v-model="nombre_usuario" type="text"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-30">
                        <md-field>
                            <label>Rut - Sin Guión</label>
                            <md-input v-model="rut_usuario" type="number"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-30">
                        <md-field>
                          <vs-select width=100% v-model="rol_usuario" placeholder="Seleccione un rol de usuario">
                            <vs-select-item value="Operario" text="Operario"/>
                            <vs-select-item value="Administrador" text="Administrador"/>
                          </vs-select>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                            <label>Correo electrónico</label>
                            <md-input v-model="correo_usuario" type="text"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-100 text-right">
                      <md-button class="md-raised md-success" @click="volver">Volver</md-button>
                      <md-button class="md-raised md-success" @click="validar" >Editar Empleado</md-button>
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
  name : 'modificarEmpleado',

  components: {
  },
  data(){
      return{
        nombre_usuario: '',
        rut_usuario:'',
        rol_usuario:'',
        correo_usuario:'',
        usuarios: [],
        errors: [],
        item: []
      }
  },
  methods: {
    validar: function(){
      if(this.nombre_usuario && this.rut_usuario > 0 && this.rol_usuario && this.correo_usuario)
       this.putEmpleado();

        else{
          this.$vs.notify({title:'Se requiere completar los campos correctamente.',color:'danger',position:'bottom-center'});
        }
    },
    getEmpleado(){
      var url = localhost + '/usuarios/';
      var idString = "" + this.$route.params.id;
      url = url + idString;
      axios.get(url).then((data) => {
        this.item = data.data;
        this.nombre_usuario = this.item.nombreUsuario;
        this.rut_usuario = this.item.rutUsuario;
        this.rol_usuario = this.item.rolUsuario;
        this.correo_usuario = this.item.correoUsuario;
      });
    },
    putEmpleado() {
      var url = localhost + '/usuarios/update/';
      var idString = "" + this.item.rutUsuario;
      url = url + idString;
      axios.post(url, {
        nombre_usuario : this.nombre_usuario,
        rol_usuario : this.rol_usuario,
        correo_usuario : this.correo_usuario,
        rut_usuario: this.rut_usuario
      })
      .then(response => {
        this.nombre_usuario = "";
        this.rol_usuario = "";
        this.correo_usuario = "";
        this.rut_usuario = "";
        if(response.data[0].message == 'OK'){
          this.$router.push('usuarios')
          this.$vs.notify({title:'El usuario se ha modificado correctamente.',color:'success',position:'bottom-center'});
        } else {
          this.$vs.notify({title:'El usuario no se ha podido eliminar.',color:'danger',position:'bottom-center'});
        }
      })
      .catch(e => {
        this.errors.push(e)
      });
    },
    volver(){
      this.$router.push('usuarios')
    },
  },
  mounted () {
    this.getEmpleado();
    if (localStorage.getItem('role') != 'Administrador') {
      this.$router.push('Rack')
    }
    if (!localStorage.getItem('login')) {
      this.$router.push('Login')
    }
  }
}

</script>
