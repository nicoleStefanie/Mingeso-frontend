<template>
  <div class="container">
    <md-card>
      <md-card-header data-background-color="green" style="position: relative;">
        <h3 class="title">Reservar la Habitación n°{{this.nroHabitacion}}</h3>
      </md-card-header>
      <md-card-content>
        <br>
        <md-card-header data-background-color="green" style="position: relative; margin-top: 40px; height: 55px;">
          <h5 class="title">Agregar cliente a habitación</h5>
        </md-card-header>
        <br>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50 text-center">
            <label>Rut</label>
            <b-form-input @keyup="validarRut(rut)" @change="getCliente" v-model="rut" placeholder="Rut , ej: 191135709"></b-form-input>
            <p class="error" v-if="vatError2">{{vatErrorMsg2}}</p>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50 text-center">
            <label>Teléfono</label>
            <b-form-input @keyup="validarTelefono(telefono)" v-model="telefono" placeholder="Teléfono , ej: 983897060"></b-form-input>
            <p class="error" v-if="vatError3">{{vatErrorMsg3}}</p>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100 text-center" style="margin-top: 1%">
            <label>Nombre y Apellido del Cliente</label>
            <b-form-input @keyup="validarNombre" v-model="nombre" placeholder="Nombre y Apellido del Cliente"></b-form-input>
            <p class="error" v-if="vatError1">{{vatErrorMsg1}}</p>
          </div>
          <br><br>
          <div class="md-layout-item md-small-size-100 md-size-33 text-center">
            <label>Correo</label>
            <b-form-input @keyup="validarEmail" v-model="correo" placeholder="Correo , ej: example@example.com"></b-form-input>
            <p class="error" v-if="vatError4">{{vatErrorMsg4}}</p>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33 text-center">
            <label>Fecha de Nacimiento</label>
            <b-form-input  v-model="fechaNacimiento" type="date" placeholder=" Fecha de Nacimiento"></b-form-input>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33 text-center">
            <label>Descuento</label>
            <b-form-input  v-model="descuento" type= "number" placeholder="Descuento"></b-form-input>
          </div>
          <br><br><br><br>
          <div class="md-layout-item md-size-33 text-left">
            <md-button class="md-raised md-warning" style="text-align: left" @click="$router.go(-1)">Volver</md-button>
          </div>
          <div class="md-layout-item md-size-33 text-center">
            <md-button class="md-raised md-success" @click="validarAReserva()">Añadir Reserva</md-button>
          </div>
          <div class="md-layout-item md-size-33 text-right">
            <md-button class="md-raised md-success" @click="validar()">Reservar</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>


<script>
  import Datepicker from 'vuejs-datepicker';
  import axios from 'axios';
  const localhost = 'http://159.203.94.72:8060/backend/';
  export default {
    name: "reserva",
    components: {
      Datepicker
    },
    data(){
      return{
        items:[],
        errors:[],
        itemsCompleto: [],
        selectMode: 'single',
        selected: null,
        nombre:'',
        rut:'',
        rutUsuario: '',
        fechaNacimiento:'',
        telefono:'',
        correo:'',
        vatError1: '',
        vatErrorMsg1: '',
        vatError2: '',
        vatErrorMsg2: '',
        vatError3: '',
        vatErrorMsg3: '',
        vatError4: '',
        vatErrorMsg4: '',
        habitacion: null,
        fechaInicio:'',
        fechaTermino:'',
        estado : '',
        descuento: '',
        cliente: null,
        nroHabitacion: 0,
      }
    },
    methods: {
      refresh(){
        location.reload(true);
      },
      getRut(){
        this.rutUsuario = localStorage.getItem('rut');
      },
      addReserva:function(){
       var url = localhost + 'reservas/createMultiFechas';
       axios.post(url, {
         nombre:this.nombre,
         rut:this.rut,
         fechaNacimiento:this.fechaNacimiento,
         telefono:this.telefono,
         rutUsuario:this.rutUsuario,
         correo:this.correo,
         fechaInicio:this.$route.params.fechaInicio,
         fechaTermino:this.$route.params.fechaTermino,
         IdHab:this.habitacion.idHabitacion,
         estado:'1',
         descuento:this.descuento,
       }, { useCredentails: true })
       .then(response => {
         this.nombre = "";
         this.rut = "";
         this.fechaNacimiento = "";
         this.telefono = "";
         this.rutUsuario= "";
         this.correo = "";
         this.fechaInicio = "";
         this.fechaTermino = "";
         this.IdHab= "";
         this.estado="";
         this.descuento="";
         alert(response.data[0].message);
         if(response.data[0].message == 'OK'){
           location.href = "#/filtrarReservaRangos/"+this.$route.params.fechaTermino+'/'+response.data[1].message+'/2';
         }
         else{
          console.log(response.data.message);
          alert("Error al agregar reserva a la cola");
         }
       })
       .catch(e => {
         this.errors.push(e)
       });

      },
      createReserva:function(){
        var url = localhost + 'reservas/create';
        axios.post(url, {
          nombre:this.nombre,
          rut:this.rut,
          fechaNacimiento:this.fechaNacimiento,
          telefono:this.telefono,
          rutUsuario:this.rutUsuario,
          correo:this.correo,
          fechaInicio:this.$route.params.fechaInicio,
          fechaTermino:this.$route.params.fechaTermino,
          IdHab:this.habitacion.idHabitacion,
          estado:'1',
          descuento:this.descuento,
        }, { useCredentails: true })
        .then(response => {
          this.nombre = "";
          this.rut = "";
          this.fechaNacimiento = "";
          this.telefono = "";
          this.rutUsuario= "";
          this.correo = "";
          this.fechaInicio = "";
          this.fechaTermino = "";
          this.IdHab= "";
          this.estado="";
          this.descuento="";
          alert(response.data[0].message);
          console.log(response.data.message);
          if(response.data[0].message == 'OK'){
            this.$router.push('Rack')
          }
        })
        .catch(e => {
          this.errors.push(e)
        });

       },
      validarNombre:function(){
        if(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g.test(this.nombre)) {
          this.vatError1 = true;
          this.vatErrorMsg1 = null;
          return true }
        else{
          this.vatError1 = true;
          this.vatErrorMsg1 = "Ingrese un nombre válido.";
        }
      },
      validarRut:function(){
        if(/^\d*$/.test(this.rut)){
          if(Object.keys(this.rut).length < 10){
            this.vatError2 = false;
            this.vatErrorMsg2 = null;
          }
          else{
            this.vatError2 = true;
            this.vatErrorMsg2 = "Largo del rut inválido."
          }
        }
        else{
          this.vatError2 = true;
          this.vatErrorMsg2 = "Ingrese un rut válido."
        }
      },
      validarTelefono:function(){
        if(/^\d*$/.test(this.telefono)){
          if(Object.keys(this.telefono).length < 10){
            this.vatError3 = false;
            this.vatErrorMsg3 = null;
          }
          else{
            this.vatError3 = true;
            this.vatErrorMsg3 = "Largo del teléfono inválido."
          }
        }
        else{
          this.vatError3 = true;
          this.vatErrorMsg3 = "Ingrese un teléfono válido."
        }
      },
      validarEmail:function() {
        var a = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
        if(a.test(this.correo)){
          this.vatError4 = false;
          this.vatErrorMsg4 = null; }
        else{
          this.vatError4 = true;
          this.vatErrorMsg4 = "Ingrese un correo válido."
        }
      },
      getHabitacion(){
        const url = localhost + 'habitaciones/'+ this.$route.params.idHab;
        axios.get(url).then((data) => {
          this.habitacion = data.data;
          this.nroHabitacion = this.habitacion.nroHabitacion;
        });
      },
      getCliente(){
        var url = localhost+'clientes/rut/'+this.rut;
        if(!this.vatError2){
          axios.get(url).then((data) => {
            this.cliente = data.data;
            if(this.cliente != null){
              this.nombre = this.cliente.nombreCliente;
              this.telefono = this.cliente.telefonoCliente;
              this.correo = this.cliente.correoCliente;
              this.fechaNacimiento = this.cliente.fechaNacimiento.slice(0,10);
            }
          });
        }
      },
      validar(){
        if(this.descuento != '' && this.rutUsuario != '' && this.nombre != '' && this.rut != '' && this.telefono != '' && this.correo != '' && this.fechaNacimiento != ''){
          this.createReserva();
        }
        else{
          alert("Debes llenar todos los campos")
        }
      },
      validarAReserva(){
        if(this.descuento != '' && this.rutUsuario != '' && this.nombre != '' && this.rut != '' && this.telefono != '' && this.correo != '' && this.fechaNacimiento != ''){
          this.addReserva();
        }
        else{
          alert("Debes llenar todos los campos")
        }
      },
    },


    mounted() {
      this.getHabitacion();
      this.getRut();
    }
  }
</script>

<style scoped>

</style>
