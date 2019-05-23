<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Agregar Empleado</h4>
        <p class="category">Completar los campos</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">

          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Nombre Completo</label>
              <md-input v-model="nombre" type="text"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Rol</label>
              <md-input v-model="rol" type="text"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Correo</label>
              <md-input v-model="correo" type="text"></md-input>
            </md-field>
          </div>



          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success">Agregar Empleado</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>

<script>

</script>


<style>

</style>
