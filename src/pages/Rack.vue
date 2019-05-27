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
        </md-card>
    </div>
</template>

<script>
/* eslint-disable */ 
export default {
        data(){
            return{
                reservas: [{
                    "habitacion": "12",
                    "segments": [{
                      "id":"1",
                      "start": "2016-01-01",
                      "end": "2016-01-14",
                      "color": "#b9783f",
                      "cliente": "Nicole",
                      "tipo": "simple",
                      "color":"#b9783f", 
                    }, {
                      "id":"2",
                      "start": "2016-01-16",
                      "end": "2016-01-27",
                      "cliente": "Javiera",
                      "tipo": "simple",
                      "color":"#b9783f", 
                    }, {
                      "id":"3",
                      "start": "2016-02-05",
                      "end": "2016-04-18",
                      "cliente": "Javiera",
                      "tipo": "multiple",
                      "color":"#cc4748"
                    }, {
                       "id":"4",
                      "start": "2016-08-18",
                      "end": "2016-08-30",
                      "cliente": "Liliana",
                      "tipo": "simple",
                      "color":"#b9783f", 

                    }]
                  }, {
                    "habitacion": "321",
                    "segments": [{
                      "id":"5",                      
                      "start": "2016-01-08",
                      "end": "2016-01-10",
                      "color": "#cc4748",
                      "cliente": "Liliana",
                      "tipo": "simple",
                     "color":"#b9783f", 
                    }, {
                      "id":"6",
                      "start": "2016-01-12",
                      "end": "2016-01-15",
                      "cliente": "Nicole",
                      "tipo": "multiple",
                      "color":"#cc4748"
                    }, {
                      "id":"7",
                      "start": "2016-09-26",
                      "end": "2016-10-05",
                      "cliente": "Javiera",
                      "tipo": "multiple",
                      "color":"#cc4748"
                    }]
                  }, {
                    "habitacion": "23",
                    "segments": [{
                      "id":"8",
                      "start": "2016-01-02",
                      "end": "2016-01-08",
                      "color": "#cd82ad",
                      "cliente": "Javiera",
                      "tipo": "simple",
                      "color":"#b9783f", 
                    }, {
                      "id":"10",
                      "start": "2016-01-08",
                      "end": "2016-01-16",
                      "cliente": "Nicole",
                      "tipo": "entradas",
                      "color":"#cd82ad"
                    }, {
                      "id":"10",
                      "start": "2016-01-19",
                      "end": "2016-03-01",
                      "cliente": "Nicole",
                      "tipo": "entradas",
                      "color":"#cd82ad"
                    }]
                  }, {
                    "habitacion": "24",
                    "segments": [{
                      "id":"11",
                      "start": "2016-01-01",
                      "end": "2016-01-19",
                      "color": "#2f4074",
                      "cliente": "Javiera",
                      "tipo": "simple",
                      "color":"#b9783f", 
                    }, {
                      "id":"12",                      
                      "start": "2017-01-19",
                      "end": "2017-02-03",
                      "cliente": "Nicole",
                      "tipo":"multiple",
                      "color":"#cc4748",
                    }]
                  }, {
                    "habitacion": "654",
                    "segments": [{
                      "id":"13",
                      "start": "2016-01-01",
                      "end": "2016-01-12",
                      "color": "#448e4d",
                      "cliente": "Nicole",
                      "tipo": "simple",
                      "color":"#b9783f", 
                    }, {
                      "id":"14",
                      "start": "2016-01-12",
                      "end": "2016-01-19",
                      "cliente": "Javiera",
                      "tipo": "simple",
                      "color":"#b9783f", 
                    }, {
                      "id":"15",
                      "start": "2016-11-19",
                      "end": "2016-12-01",
                      "cliente": "Liliana",
                      "tipo": "simple",
                      "color":"#b9783f", 
                    }]
                  }],
            }
        },
        mounted: function(){
          this.crearGrafico();
        },
        methods: {
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