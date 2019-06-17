<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-end">
        <md-button class="md-just-icon md-simple md-toolbar-toggle" :class="{toggled: $sidebar.showSidebar}" @click="toggleSidebar">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>
        <div class="md-collapse" v-if="isLogin">
          <md-list-item>
            <i class="material-icons">person_pin</i>
            <p class="hidden-lg hidden-md">Profile</p>
            <a>Bienvenido {{ role }}: {{ userName }} </a>
          </md-list-item>
            <md-list-item v-on:click="logout">
              <i class="material-icons">arrow_right_alt</i>
              <p class="hidden-lg hidden-md">Profile</p>
              <a>Desconectar</a>
            </md-list-item>
        </div>
        <div class="md-collapse" v-else>
            <md-list-item href="#/login">
              <i class="material-icons">person</i>
              <p class="hidden-lg hidden-md">Profile</p>
              <a>Login</a>
            </md-list-item>
        </div>
      </div>
    </div>

  </md-toolbar>
</template>

<script>

export default{
  data () {
    return {
      isLogin: false,
      userName: null,
      role: null
    }
  },
  methods: {
    toggleSidebar () {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
    },
    logout () {
      if (localStorage.getItem('login')) {
        localStorage.clear()
        this.$root.$emit('doLogout', true)
        this.$router.push('Login')
      }
    }
  },
  mounted () {
    if (localStorage.getItem('login')) {
      this.userName = localStorage.getItem('name')
      this.isLogin = true
      this.role = localStorage.getItem('role')
    }
    this.$root.$on('doLogin', (text) => {
      this.userName = text
      this.isLogin = true
    })
    this.$root.$on('setRole', (text) => {
      this.role = text
    })
    this.$root.$on('doLogout', (bool) => {
      this.isLogin = false
      this.role = null
      this.userName = null
    })
  },
  watch: {
    updateComponents: function () {
      this.$root.$on('doLogin', (text) => {
        this.userName = text
        this.isLogin = true
      })
    }
  }
}
</script>

<style lang="css">
</style>
