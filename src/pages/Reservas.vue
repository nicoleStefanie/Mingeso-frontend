<template>
  <div class="container">
        <md-card>
          <md-card-header data-background-color="green" style="position: relative;">
            <h2 class="title">Realizar reserva </h2>
          </md-card-header>
          <md-card-content>
             <div class="md-card-avatar">
                   <div class="md-layout-item md-size-100">
                        <div class="places-buttons text-center">
                              <md-button type="button"  :href="'#/reservaSimple'" class=" md-button md-primary md-sm md-theme-default" >
                                  <div class="md-ripple">
                                      <div class="md-button-content"><b>Reserva Simple</b></div>
                                        <span></span>
                                    </div>
                              </md-button>
                                <md-button type="button" :href="'#/reservaMultiple'" class="md-button md-primary md-sm md-theme-default" >
                                    <div class="md-ripple">
                                       <div class="md-button-content"><b>Reserva Múltiple</b></div>
                                       <span></span>
                                    </div>
                                </md-button>
                                <md-button type="button" :href="'#/reservaEntradas'" class="md-button md-primary md-sm md-theme-default" >
                                    <div class="md-ripple">
                                       <div class="md-button-content"><b>Reserva Múltiples Entradas</b></div>
                                       <span></span>
                                    </div>
                                </md-button>
                          </div>
                  </div>
             </div>
          </md-card-content>
        </md-card>
    </div>
</template>


<script>
export default{
  name: 'Home',
  props: {
    dataBackgroundColor: {
      type: String,
      default: ''
    }
  }
}
</script>


<script>
export default{
  data () {
    return {
      datos: []
    }
  },
  mounted: function () {
    // GET /someUrl
    /*this.$http.get('')
      .then(response => {
        // get body data
        this.datos = response.body
        console.log('datos', this.datos)
        // this.obtenerFecha();
        this.loadpie()
      }, response => {
        // error callback
        console.log('Error cargando lista')
      })*/
  },
  methods: {

  }
}
</script>

<style>

h2.title{
  text-align:center;
}   
</style>