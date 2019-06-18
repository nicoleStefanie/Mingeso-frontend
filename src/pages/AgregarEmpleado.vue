<template>
    <form>
        <md-card>
            <md-card-header data-background-color="green">
                <h4 class="title">Agregar Usuario </h4>
                <p class="category">Completar los campos </p>
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
                            <label>Rut , ej: 191135709</label>
                            <md-input v-model="rut_usuario" type = "number"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-30">
                        <md-field>
                          <vs-select v-model="rol_usuario" placeholder="Seleccione un rol de usuario">
                            <vs-select-item value="Operario" text="Operario"/>
                            <vs-select-item value="Administrador" text="Administrador"/>
                          </vs-select>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                            <label>Correo electrónico , ej: example@example.com</label>
                            <md-input v-model="correo_usuario" type="text"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                            <label>Contraseña</label>
                            <md-input v-model="pass_usuario" type="text"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-100 text-right">
                      <md-button class="md-raised md-success" @click="volver">Volver</md-button>
                      <md-button class="md-raised md-success" @click="validar">Agregar Usuario</md-button>
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
      nombre_usuario: '',
      rut_usuario:'',
      rol_usuario:'',
      correo_usuario:'',
      pass_usuario:'',
      usuarios: [],
      errors: [],
      vatError2:'',
      vatErrorMsg2:''
    }
  },
  methods: {
    validar(){
      if(this.nombre_usuario && this.rut_usuario > 0 && this.rol_usuario && this.correo_usuario){
       this.agregarEmpleado();
      } else{
          this.$vs.notify({title:'Se requiere completar los campos correctamente.',color:'danger',position:'bottom-center'});
        }
    },
    agregarEmpleado() {
      var url = localhost + '/usuarios/create';
      axios.post(url, {
        nombre_usuario : this.nombre_usuario,
        rol_usuario : this.rol_usuario,
        correo_usuario : this.correo_usuario,
        rut_usuario: this.rut_usuario,
        password: this.pass_usuario
      })
      .then(response => {

        this.nombre_usuario = "";
        this.rol_usuario = "";
        this.correo_usuario = "";
        this.rut_usuario = "";
        this.pass_usuario = "";
        if(response.data[0].message == 'OK'){
          location.href = "http://159.203.94.72/#/usuarios";
          this.$vs.notify({title:'El usuario ha sido creado correctamente.',color:'success',position:'bottom-center'});
        } else{
          this.$vs.notify({title:'El usuario no se ha podido crear.',color:'danger',position:'bottom-center'});
        }
      })
      .catch(e => {
        this.errors.push(e)
      });
    },
    volver(){
      location.href = "http://159.203.94.72/#/usuarios";
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
