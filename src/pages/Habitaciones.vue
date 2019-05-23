<template>
  <div class="container">
        <md-card>
          <md-card-header data-background-color="green" style="position: relative;">
            <h3 class="title">Habitaciones</h3>
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
                <md-button type="button" :href="'#/modificarHabitaciones/'+ this.habitacion" >Editar</md-button>
              </div>
              </md-card-actions>
            </md-card-content>
            <md-card-actions>
            <div>
              <md-button type="button" :href="'#/agregarHabitaciones'" >Agregar</md-button>
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
          { id: 40, tipo: 'Simple', estado: 'Ocupada' },
          { id: 21, tipo: 'Doble', estado: 'Libre' },
          { id: 89, tipo: 'Triple', estado: 'Libre' },
          { id: 38, tipo: 'Simple', estado: 'Libre' }
        ],
        selectMode: 'single',
        selected: null,
        habitacion: null
      }
    },
    methods: {
      rowSelected(items) {
        this.selected = items,
        this.habitacion = this.selected[0].id
      }

    }
  }
</script>
