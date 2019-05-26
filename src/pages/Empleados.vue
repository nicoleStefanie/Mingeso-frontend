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
                @row-selected="rowSelected"
              ></b-table>
            </div>
              <md-card-actions>
              <div  v-if="selected !== null">
                <md-button type="button" :href="'#/modificarEmpleado/'+ this.id_empleado" >Editar</md-button>
                  <md-button class="md-raised md-success">Eliminar Empleado</md-button>
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
/* eslint-disable */
  export default {
    data() {
      return {
        fields: ["nombreUsuario",
        "rolUsuario",
        "correoUsuario",
        "rutUsuario"],
        items: [],
        selectMode: 'single',
        selected: null,
        id_empleado: null
      }
    },
    methods: {
      rowSelected(items) {
        this.selected = items,
        this.id_empleado = this.selected[0].idUser
      }

    }
  }
</script>
