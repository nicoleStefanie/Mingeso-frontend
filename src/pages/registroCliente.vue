<template>
    <div class="container">
      <md-card>
        <md-card-header data-background-color="green" style="position: relative;">
        <h3 class="title">Registrar Clientes en Habitación n°{{this.habitacion.nroHabitacion}}</h3>
        </md-card-header>
        <md-card-content>
          <div v-if="this.items.length != 0">
            <b-table
              selectable
              :select-mode="selectMode"
              selectedVariant="success"
              :items="items"
              :fields = "fields"
              @row-selected="rowSelected"
            ></b-table>
            <div class="md-layout-item md-size-100 text-right">
              <md-button class="md-raised md-success" @click="registrar()">Registrar estos clientes</md-button>
            </div>
          </div>
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
            <div class="md-layout-item md-small-size-33 md-size-33">
              <b-form-checkbox v-model="representante" aria-placeholder="Representante" value="si" style="margin-top: 10%" unchecked-value="no" :disabled="hayRepresentante">Representante</b-form-checkbox>
            </div>
            <br><br><br><br>
            <div class="md-layout-item md-size-50 text-left">
              <md-button class="md-raised md-success" style="text-align: left" :href="'#/reservaHabitacion/'+this.$route.params.idReserva">Volver</md-button>
            </div>
            <div class="md-layout-item md-size-50 text-right">
              <md-button class="md-raised md-success" @click="validar()">Agregar Cliente</md-button>
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
  const localhost2 = 'https://localhost:8060/';
    export default {
      name: "registroCliente",
      components: {
        Datepicker
      },
      data(){
        return{
          fields: [
            "nombre",
            "rut",
            "telefono",
            "fechaNacimiento",
            "correo",
            "representante",
            ],
          items:[],
          errors:[],
          itemsCompleto: [],
          selectMode: 'single',
          selected: null,
          nombre:'',
          rut:'',
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
          representante: 'no',
          cliente: null,
          hayRepresentante: false,
        }
      },
      methods: {
        refresh(){
          location.reload(true);
        },
        getReserva(){
          const url = localhost + 'reservas/conUsuario/'+ this.$route.params.idReserva;
          axios.get(url).then((data)=>{
            this.reserva = data.data;
            this.getHabitacion();
          });
        },
        rowSelected(items) {
          this.selected = items;
        },
        dateFormat: function(date) {
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
          });
        },
        validar(){
          if(this.nombre != '' && this.rut != '' && this.telefono != '' && this.correo != '' && this.fechaNacimiento != ''){
            this.items.push({
              nombre: this.nombre,
              rut: this.rut,
              telefono: this.telefono,
              correo: this.correo,
              fechaNacimiento: this.fechaNacimiento,
              representante: this.representante,
            });
            if(this.representante == 'si'){
              this.hayRepresentante = true;
            }
            this.nombre = '';
            this.rut = '';
            this.telefono = '';
            this.fechaNacimiento = '';
            this.correo = '';
            this.representante = 'no';
          }
          else{
            alert("Debes llenar todos los campos")
          }
        },
        registrar(){
          var url = localhost + 'registro/create?idHab='+this.$route.params.idHab+'&&fechaInicio='+this.$route.params.fechaInicio+'&&fechaTermino='+this.$route.params.fechaTermino+'&&descuento='+this.reserva.descuento;
          var url2 = localhost + 'reservahabitacion/desactivar?idHab='+this.$route.params.idHab+'&&idReserva='+this.$route.params.idReserva;
          axios.post(url,this.items)
            .then(response => {
              axios.get(url2).then(response => {
                alert("Registro exitoso");
                location.href ="#/reservaHabitacion/"+this.$route.params.idReserva;
              })
            })
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
        }
      },
      mounted() {
        this.getReserva();
      }
    }
</script>

<style scoped>

</style>
