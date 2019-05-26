<template>
  <div class="container">
        <md-card>
          <md-card-header data-background-color="green" style="position: relative;">
            <h3 class="title">Usuarios</h3>
          </md-card-header>
            <md-card-content>
            <div>
              <b-table
                selectable
                :select-mode="selectMode"
                selectedVariant="success"
                :items="items"
                :fields = "fields"
                @row-selected="rowSelected"
              ></b-table>
            </div>
              <md-card-actions>
              <div  v-if="selected !== null">
                <md-button type="button" :href="'#/modificarEmpleado/'+ this.usuarioR" >Editar</md-button>
                <md-button class="md-raised md-success" @click="deleteUsuario">Eliminar Empleado</md-button>
              </div>
              </md-card-actions>
            </md-card-content>
            <md-card-actions>
            <div>
              <md-button type="button" :href="'#/agregarEmpleado'" >Agregar Empleado</md-button>
            </div>
            </md-card-actions>
        </md-card>
    </div>
</template>

<script>
import axios from 'axios';
const localhost = 'http://localhost:8060';
export default {
    components: {
    },
    data(){
        return{
            fields: ["nombreUsuario",
                     "rolUsuario",
                     "correoUsuario",
                     "rutUsuario"],
            items: [],
            selectMode: 'single',
            selected: null,
            selectMode: 'single',
            selected: null,
            usuarioI: null,
            usuarioR: null
        }
    },
    methods: {
      getUsuarios(){
          const url = localhost + '/usuarios';
          axios.get(url).then((data) => {
            this.items = data.data;
          });
        },

      rowSelected(items) {
        this.selected = items,
        this.usuarioI = this.selected[0].idUsuario
        this.usuarioR = this.selected[0].rutUsuario
      },
      deleteUsuario(){
        const url = localhost + '/usuarios/delete/'+ this.usuarioI;
        axios.post(url, {})
        .then(response => {
          alert(response.data[0].message);
        })
        .catch(e => {
          this.errors.push(e)
        });
        },
      },
    mounted() {
    this.getUsuarios();
    }
  }
</script>
