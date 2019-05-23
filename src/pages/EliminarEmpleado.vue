<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Eliminar Empleado</h4>
        <p class="category">Indique el ID del empleado a eliminar</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">

          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>ID Empleado</label>
              <md-input v-model="id_empleado" type="text"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success">Eliminar Empleado</md-button>
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
