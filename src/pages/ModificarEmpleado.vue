<template>
    <form>
        <md-card>
            <md-card-header :data-background-color="dataBackgroundColor">
                <h4 class="title">Modificar Empleado Seleccionado </h4>
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
                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                            <label>Rut - Sin Guión</label>
                            <md-input v-model="rut_usuario" type="number"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                            <select v-model="rol_usuario">
                              <option disabled value="">Seleccione un rol de usuario</option>
                              <option>Operario</option>
                              <option>Administrador</option>
                            </select>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                            <label>Correo electrónico</label>
                            <md-input v-model="correo_usuario" type="text"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-100 text-right">
                        <md-button class="md-raised md-success" @click="validar" >Modificar Empleado</md-button>
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
  data(){_usuario
      return{
        nombre_usuario: '',
        rut_usuario:'',
        rol_usuario:'',
        correo_usuario:'',
        usuarios: [],
        errors: []
      }
  },
  methods: {
    validar: function(){
      if(this.nombre_usuario && this.rut_usuario&& this.rol_usuario && this.correo_usuario)
       this.putEmpleado();

        else{
          alert('Se requiere completar todos los campos.')
        }


    },
    putEmpleado() {
      var url = localhost + '/usuarios/update/';
      var idString = "" + this.$route.params.rut;
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
        alert(response.data[0].message);
        console.log(response.data.message);
        if(response.data[0].message == 'OK'){
          location.href = "http://159.203.94.72/#/usuarios";
        }
      })
      .catch(e => {
        this.errors.push(e)
      });
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
