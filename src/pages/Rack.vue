<template>
  <div class="container">
        <md-card>
             <!--<img  class="img" :src="require('@/assets/img/moneda.jpg')">-->
          <md-card-header data-background-color="green" style="position: relative;">
            <h2 class="title">Visualizar el Rack</h2>
          </md-card-header>
            <md-card-content>
              <div class="md-layout">
                <div>
                  <timeline :data="this.grafico_habitaciones" :colors="['#b00']"></timeline>
                </div>
              </div>

            </md-card-content>
        </md-card>
    </div>
</template>

<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script src="https://www.gstatic.com/charts/loader.js"></script>

<script>
export default {

        data(){
            return{

                reservas: [
                  {
                    id: 1,
                    fecha_inicio: '2019-01-23',
                    fecha_termino: '2019-01-28',
                    habitacion: '123',

                  },
                  {
                    id: 2,
                    fecha_inicio: '2019-02-15',
                    fecha_termino: '2019-02-18',
                    habitacion: '234',

                  },
                  {
                    id: 3,
                    fecha_inicio: '2019-03-23',
                    fecha_termino: '2019-03-30',
                    habitacion: '345',

                  },
                ],

                grafico_habitaciones: [],
            }
        },
        methods: {

            crearGrafico(){

              for (let i = 0; i < this.reservas.length; i++) {
                this.grafico_habitaciones.push([this.reservas[i].habitacion , this.reservas[i].fecha_inicio , this.reservas[i].fecha_termino]);
                }
            },

        },
        mounted(){
          this.crearGrafico();
        },
    }
</script>

<style>

</style>
