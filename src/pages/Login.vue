  <template>
  <form>
    <md-card>
      <md-card-header>
        <h4 class="title">Inicio de Sesión</h4>
      </md-card-header>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Correo</label>
              <md-input v-model="email" type="text" @keyup="email = $event.target.value"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-51">
            <md-field>
              <label>Contraseña</label>
              <md-input v-model="password" type="password" @keyup="password = $event.target.value"></md-input>
            </md-field>
          </div>
        </div>
        <div class="md-layout-item md-size-100 text-right">
          <md-button class="md-raised md-success" v-on:click="inicio">Iniciar Sesión</md-button>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>

<script>
import axios from 'axios'
export default{
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async inicio () {
      let url = 'http://159.203.94.72:8060/backend/usuarios/login'
      let inputData = this.checkData(this.email, this.password);
      if (inputData['result']) {
        await axios.post(url, {
          email: this.email,
          password: this.password
        }, { useCredentails: true }).then((data) => {
          let loginData = data['data'][0]
          if (loginData['status'] === 200) {
            localStorage.setItem('role', loginData['role'])
            localStorage.setItem('user_id', loginData['id'])
            localStorage.setItem('login', loginData['login'])
            localStorage.setItem('name', loginData['name'])
            localStorage.setItem('email', loginData['email'])
            this.updateComponents(loginData['name'], loginData['role'])
            this.$router.push('Rack')
          }
          else {
            alert(loginData['message'])
          }
        })
      }
      else {
        alert(inputData['error'])
      }
    },
    updateComponents (name, role) {
      this.$root.$emit('doLogin', name)
      this.$root.$emit('setRole', role)
    },
    checkData (email, password) {
      let errorMsg = 'Error(es) detectado(s):\r\n'
      if (email && password){
        if(email.length < 5 && password.length < 5) {
          errorMsg = errorMsg + '- Ingrese un email correcto.\r\n- Ingrese una contrasena correcta.'
          return {error: errorMsg, result: false}
        }
        else if (email.length > 5 && password.length < 5 ) {
          errorMsg = errorMsg + '- Ingrese una contrasena correcta.'
          return {error: errorMsg, result: false}
        }
        else if (email.length < 5 && password.length > 5) {
          errorMsg = errorMsg + '- Ingrese un email correcto.'
          return {error: errorMsg, result: false}
        }
        else {
          return {error: errorMsg, result: true}
        }
      }
      else if (email && !password) {
        if (email.length < 5) {
          errorMsg = errorMsg + '- Ingrese un email correcto.\r\n- Ingrese una contrasena correcta.'
          return {error: errorMsg, result: false}
        }
        else {
          errorMsg = errorMsg + '- Ingrese una contrasena correcta.'
          return {error: errorMsg, result: false}
        }
      }
      else if (!email && password) {
        if (password.length < 5) {
          errorMsg = errorMsg + '- Ingrese un email correcto.\r\n- Ingrese una contrasena correcta.'
          return {error: errorMsg, result: false}
        }
        else {
          errorMsg = errorMsg + '- Ingrese un email correcto.'
          return {error: errorMsg, result: false}
        }
      }
      else {
        errorMsg = errorMsg + '- Ingrese un email correcto.\r\n- Ingrese una contrasena correcta.'
        return {error: errorMsg, result: false}
      }
    }
  },
  mounted () {
    if (localStorage.getItem('login')) {
      this.$router.push('Rack')
    }
  }

}
</script>
