<template>
  <div class="container">
        <md-card>
          <md-card-header data-background-color="green" style="position: relative;">
            <h3 class="title">Visualizar el Rack</h3>
          </md-card-header>
            <md-card-content>
              <div class="md-layout">
                <div id="chartdiv"></div>
              </div>
            </md-card-content>
            Rerservas {{this.reservas}}
        </md-card>

    </div>
</template>



<script>
import { existsSync } from 'fs';
import axios from 'axios';
const localhost = 'http://159.203.94.72:8060/backend';
/* eslint-disable */
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
        methods: {
          getReservas(){
              const url = localhost + '/reservahabitacion/rack';
              axios.get(url).then((data) => {
                this.items = data.data;
                this.modificarDatosRack();
              });

            },

            modificarDatosRack(){
               for (let i = 0; i < this.items.length; i++) {
                   if(this.items[i] !== null){
                     this.reservas.push(["habitacion",this.items[i].nroHabitacion, "segments", [this.items[i].idCliente, this.items[i].idReserva , this.items[i].fechaInicio, this.items[i].fechaTermino, this.items[i].nombreCliente]]);
                   }
               }
               this.crearGrafico();
           },
            crearGrafico: function(){
                var chart = AmCharts.makeChart("chartdiv", {
                  "type": "gantt",
                  "marginRight": 70,
                  "period": "DD",
                  "dataDateFormat": "YYYY-MM-DD",
                  "columnWidth": 0.5,
                  "valueAxis": {
                    "type": "date"
                  },
                  "brightnessStep": 7,
                  "graph": {
                    "fillAlphas": 1,
                    "lineAlpha": 1,
                    "lineColor": "#fff",
                    "fillAlphas": 0.85,
                    "balloonText": "<b>[[cliente]] ID Reserva [[id]]</b>:<br /> Desde [[open]] hasta [[value]]"
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
                  "legend": {
                    "data": [{
                      "title": "Reserva Simple",
                      "color": "#b9783f"
                    }, {
                      "title": "Reserva Múltiple",
                      "color": "#cc4748"
                    }, {
                      "title": "Reserva varias entradas",
                      "color": "#cd82ad"
                    }]
                  },
                  "listeners": [{
                    "event": "clickGraphItem",
                    "method": function(e) {
                      alert("Información de la reserva:\nID Reserva: " + e.graph.segmentData.id +
                      "\nFecha inicio: " + e.graph.segmentData.start +
                      "\nFecha término: " + e.graph.segmentData.end +
                      "\nCliente: " + e.graph.segmentData.cliente +
                      "\nTipo: Reserva " + e.graph.segmentData.tipo)
                    }
                  }],
                  "export": {
                    "enabled": false
                  }
                });
            },
        },

    }
</script>


<style>
#chartdiv {
  width: 100%;
  height: 500px;
}
</style>
