<template>
  <div class="container">
    <md-card>
      <md-card-header data-background-color="green" style="position: relative;">
        <h3 class="title">Buscar Habitaciones</h3>
      </md-card-header>
      <br>
      <md-card-content>
        <div class="md-layout">
            <br><br>
          <div class="md-layout-item md-small-size-100 md-size-40 " style="margin-left: 100px">
            <label>Fecha de Inicio</label>
            <b-form-input v-model="fechaInicio" @change="maximo" placeholder="Fecha Inicio" type="date" v-bind:min="today" v-bind:max="maxInicio"></b-form-input>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-40">
            <label>Fecha de Termino</label>
            <b-form-input  v-model="fechaTermino" @change="minimo" placeholder="Fecha Termino" type="date" v-bind:min="minTermino"></b-form-input>
          </div>
          <br><br>
          <div class="md-layout-item md-small-size-100 md-size-100 text-center" style="margin-top: 2%">
            <md-button class="md-raised md-success" style="width: 60%; font-size:20px" @click="enviar">Buscar</md-button>
        </div>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
    export default {
      components: {
      },
      data(){
        return{
          fechaTermino: '',
          fechaInicio: '',
          tipo: 'Simple',
          today: new Date().toISOString().slice(0, 10),
          minTermino: new Date().toISOString().slice(0,10),
          maxInicio: '',
        }
      },
      methods: {
        enviar(){
          if(this.fechaTermino != '' && this.fechaInicio != ''){
            location.href = "#/seleccionarReservaMulti/"+this.fechaInicio+'/'+this.fechaTermino;
          }
          else{
            alert("No se han ingresado datos a todos los campos");
          }
        },
        maximo(){
          this.minTermino= this.fechaInicio;
        },
        minimo(){
          this.maxInicio = this.fechaTermino;
        }
      },
    }

</script>

<style scoped>

</style>
