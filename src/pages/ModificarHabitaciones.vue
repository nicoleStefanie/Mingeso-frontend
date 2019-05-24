<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Modificar Habitación N° {{this.$route.params.id}} </h4>
        <p class="category">Completar con los campos que quiere modificar</p>
      </md-card-header>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Tipo</label>
              <md-input v-model="tipo" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Estado</label>
              <md-input v-model="estado" type="text"></md-input>
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
            <md-button class="md-raised md-success">Modificar Habitación</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>

<script>
/* eslint-disable */
</script>
