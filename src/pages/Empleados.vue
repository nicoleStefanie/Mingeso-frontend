<template>
  <div class="container">
        <md-card>
          <md-card-header data-background-color="green" style="position: relative;">
            <h3 class="title">Empleados</h3>
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
              </div>
              </md-card-actions>
            </md-card-content>
            <md-card-actions>
            <div>
              <md-button type="button" :href="'#/agregarEmpleado'" >Agregar Empleado</md-button>
              <md-button type="button" :href="'#/eliminarEmpleado'" >Eliminar Empleado</md-button>
            </div>
            </md-card-actions>
        </md-card>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          { id: 40, nombre: 'Felipe Contreras', correo: 'FC@gmail.com' },
          { id: 21, nombre: 'Jose Soto', correo: 'JS@gmail.com' },
          { id: 89, nombre: 'carlos Contreras', correo: 'CarlosC@gmail.com' },
          { id: 38, nombre: 'Felipe Meza', correo: 'FMeza@gmail.com' },
        ],
        selectMode: 'single',
        selected: null,
        id_empleado: null
      }
    },
    methods: {
      rowSelected(items) {
        this.selected = items,
        this.id_empleado = this.selected[0].id
      }

    }
  }
</script>
