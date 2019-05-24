<template>
  <div class="container">
    <md-card>
      <md-card-header>
        <div class="md-title">Realizar Reserva</div>
      </md-card-header>
      <md-card-content>
         <div class="md-layout-item md-size-100">
           <div class="places-buttons text-center">
                  <md-button type="button"  :href="'#/reservaSimple'" class=" md-primary md-wd md-sm md-theme-default" >
                    <div class="md-ripple">
                      <div class="md-button-content"><b>Simple</b></div>
                        <span></span>
                    </div>
                   </md-button>
                   <br>
                   <md-button type="button" :href="'#/reservaMultiple'" class="md-primary md-wd md-sm md-theme-default" >
                      <div class="md-ripple">
                         <div class="md-button-content"><b>Múltiple</b></div>
                         <span></span>
                      </div>
                  </md-button>
                  <br>
                  <md-button type="button" :href="'#/reservaEntradas'" class="md-primary md-wd md-sm md-theme-default" >
                      <div class="md-ripple">
                         <div class="md-button-content"><b> Varias Entradas</b></div>
                         <span></span>
                      </div>
                  </md-button>
              </div>
          </div>
      </md-card-content>
    </md-card>
    <md-card>
        <md-card-header>
          <div class="md-title">Editar Reserva</div>
        </md-card-header>
        <md-card-content>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
         <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Tipo de reserva</label>
              <md-select v-model="tipo_habitacion" name="tipo_reserva" id="tipo_reserva" placeholder="Tipo de reserva">
                  <md-option value="1"> <br>&nbsp;Simple</md-option>
                  <md-option value="2"> <br>&nbsp;Múltiple</md-option>
                  <md-option value="3"> <br>&nbsp;Varias entradas</md-option>
                </md-select>

            </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-100">
          <md-field>
            <label>ID reserva</label>
            <md-input v-model="id_reserva" type="text"></md-input>
          </md-field>
        </div>
        </md-card-content>
        <md-card-actions>
          <md-button type="button" :href="'#/modificarReservaSimple'" >Editar</md-button>
        </md-card-actions>
    </md-card>
    <md-card >
        <md-card-header>
          <div class="md-title">Eliminar Reserva</div>
        </md-card-header>
        <md-card-content>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>ID reserva</label>
              <md-input v-model="id_reserva" type="text"></md-input>
            </md-field>
          </div>
        </md-card-content>
        <md-card-actions>
          <md-button>Eliminar</md-button>
        </md-card-actions>
    </md-card>
  </div>
</template>

<script>
/* eslint-disable */
export default{
  name: 'Home',
  props: {
    dataBackgroundColor: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      datos: [],
      id_reserva: null,
      tipo_reserva: null,
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
  
</style>