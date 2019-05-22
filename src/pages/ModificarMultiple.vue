<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Modificar Reserva en grupo</h4>
        <p class="category">Completar con los campos que quiere modificar</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Nombre</label>
              <md-input v-model="firstname" type="text"></md-input>
            </md-field>
          </div>
          
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Apellido</label>
              <md-input v-model="lastname" type="text"></md-input>
            </md-field>
          </div>
          
          <div class="md-layout-item md-small-size-100 md-size-50">
              <label>Fecha inicio</label>
              <md-datepicker v-model="selectedLabeled" :md-disabled-dates="disabledDates"></md-datepicker>
          </div>
          
          <div class="md-layout-item md-small-size-100 md-size-50">
              <label>Fecha término</label>
              <md-datepicker v-model="selectedLabeled"></md-datepicker>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-30">
            <md-field>
              <label>Habitación</label>
      
                <md-select v-model="tipo_habitacion" name="tipo_habitacion" id="tipo_habitacion" 
                placeholder="Habitación" >
                  <md-option value="1"> <br>&nbsp;Opción 1</md-option>
                  <md-option value="2"> <br>&nbsp;Opción 2</md-option>
                  <md-option value="3"> <br>&nbsp;Opción 3</md-option>
                  <md-option value="4"> <br>&nbsp;Opción 4</md-option>
                  <md-option value="5"> <br>&nbsp;Opción 5</md-option>
                </md-select>

            </md-field>
          </div>
          
          <div class="md-layout-item md-small-size-100 md-size-30">
            <md-field>
              <label>Precio Noche </label>
                <md-input v-model="Precio"></md-input>
                <md-icon>attach_money</md-icon>
            </md-field>
          </div>

          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success">Crear Reserva</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>

<script>
export default {
  name: "Home",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      nombre: null,
      apellido: null,
      tipo_habitacion: null,
      precio: 0,
    };
  }
};
</script>


<style>

</style>
