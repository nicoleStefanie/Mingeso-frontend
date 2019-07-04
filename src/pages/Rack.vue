<template>
  <div class="container">
        <md-card>
          <md-card-header data-background-color="purple" style="position: relative;">
            <h3 class="title md-size-70" align="center">Rack Hotel</h3>
          </md-card-header>
            <md-card-content>
              <div class="md-layout">
                <div id="chartdiv"></div>
              </div>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
/* eslint-disable */
var hoy = new Date();
import { existsSync } from 'fs';
import axios from 'axios';
const localhost = 'localhost:8080/backend';
export default {
        data(){
            return{
                  id_reserva: '',
                  fecha_inicio: '',
                  fecha_termino: '',
                  nombre_cliente: '',
                  tipo_reserva: '',
                  reservas: [],
                  items: null,
            }
        },
        mounted: function(){
          this.getReservas();
        },
        dateFormat: function(date) {
          //return date.getFullYear() + '-' + (date.getMonth() +1) + '-' + date.getDate();
          if(date.getMonth()< 10 && date.getDate() < 10)
          {
            return date.getFullYear() + '-0' + (date.getMonth() +1) + '-0' + date.getDate();
          }
          else if(date.getMonth()< 10){
            return date.getFullYear() + '-0' + (date.getMonth() +1) + '-' + date.getDate();
          }
          else if(date.getDate() < 10){
            return date.getFullYear() + '-' + (date.getMonth() +1) + '-0' + date.getDate();
          }
        },
        methods: {
          getReservas(){
              const url = localhost + '/reservahabitacion/rack';
              axios.get(url).then((data) => {
                this.items = data.data;
                this.modificarDatosRack();
              });

            },
            modificarDatosRack(){
              var k =0;

               for (let i = 0; i < this.items.length; i++) {
                   if(!this.existe(this.items[i].nroHabitacion)){
                     this.reservas.push({"habitacion": this.items[i].nroHabitacion , "segments":{}});
                     var segments =[];
                     segments.push({"codigoReserva": this.items[i].codigo,
                     "start": this.items[i].fechaInicio,
                      "end": this.items[i].fechaTermino,
                   "cliente": this.items[i].nombreCliente,
                   "tipo": this.items[i].tipo});

                    for(let j= i+1; j<this.items.length;j++){
                      if(this.items[j].nroHabitacion === this.items[i].nroHabitacion){
                        segments.push({"codigoReserva": this.items[j].codigo,
                        "start": this.items[j].fechaInicio,
                        "end": this.items[j].fechaTermino,
                      "cliente": this.items[j].nombreCliente,
                      "tipo": this.items[i].tipo});

                      }
                    }
                    this.reservas[k].segments = segments;
                    k = k+1;
                   }
               }
               this.crearGrafico();
           },
           existe: function(numero){
             for(var x=0;x<this.reservas.length; x++){
               if(this.reservas[x].habitacion === numero){
                 return true;
               }
             }
             return false;
           },
            crearGrafico: function(){
                var chart = AmCharts.makeChart("chartdiv", {
                  "type": "gantt",
                  "theme":"light",
                  "marginRight": 70,
                  "period": "DD",
                  "dataDateFormat": "DD-MM-YYYY",
                  "columnWidth": 0.5,
                  "valueAxis": {
                    "type": "date",
                    "title":"Fecha",
                    "size":14
                  },
                  "categoryAxis":{
                    "title":"Número de Habitación",
                    "size":14
                  },
                  "brightnessStep": 7,
                  "graph": {
                    "fillAlphas": 1,
                    "lineAlpha": 1,
                    "lineColor": "#fff",
                    "fillAlphas": 0.85,
                    "balloonText": "<b>Cliente: [[cliente]]</b><br/>Estado de la habitación: [[tipo]]</b><br/> Desde [[open]] hasta [[value]]"
                  },
                  "rotate": true,
                  "categoryField": "habitacion",
                  "segmentsField": "segments",
                  "colorField": "color",
                  "startDateField": "start",
                  "endDateField": "end",
                  "dataProvider": this.reservas,
                  "valueScrollbar": {
                    "autoGridCount": true
                  },
                  "chartCursor": {
                    "cursorColor": "#55bb76",
                    "valueBalloonsEnabled": false,
                    "cursorAlpha": 0,
                    "valueLineAlpha": 0.5,
                    "valueLineBalloonEnabled": true,
                    "valueLineEnabled": true,
                    "zoomable": false,
                    "valueZoomable": true
                  },
                  "listeners": [{
                    "event": "clickGraphItem",
                    "method": function(e) {
                      var ventana = window.open( "", "nombrePop-Up", "width=380,height=300, top=85,left=50");
                      if(e.graph.segmentData.tipo != "Ocupada"){
                        ventana.document.write("Información de la reserva: <br><br>" +
                          "<br>Código Reserva: " + e.graph.segmentData.codigoReserva +
                          "<br>Cliente: " + e.graph.segmentData.cliente +
                          "<br>Fecha inicio: " + e.graph.segmentData.start +
                          "<br>Fecha término: " + e.graph.segmentData.end +
                          "<br>Estado Habitación: " + e.graph.segmentData.tipo +
                          "<br><br>");
                      }
                      else{
                        ventana.document.write("Información de la reserva: <br><br>" +
                          "<br>Cliente: " + e.graph.segmentData.cliente +
                          "<br>Fecha inicio: " + e.graph.segmentData.start +
                          "<br>Fecha término: " + e.graph.segmentData.end +
                          "<br>Estado Habitación: " + e.graph.segmentData.tipo +
                          "<br><br>");
                      }
                    }
                  }],
                  "export": {
                    "enabled": false
                  }
                });
            },
        },
        mounted () {
          if (!localStorage.getItem('login')) {
            this.$router.push('Login')
          }
          this.getReservas();
        }
    }
</script>


<style>
#chartdiv {
  width: 100%;
  height: 500px;
}
</style>
