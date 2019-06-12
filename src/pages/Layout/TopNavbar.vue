<template v-if="window.localStorage.getItem('login')">
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-end">
        <md-button class="md-just-icon md-simple md-toolbar-toggle" :class="{toggled: $sidebar.showSidebar}" @click="toggleSidebar">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>
        <div class="md-collapse">
            <md-list-item>
              <i class="material-icons">person</i>
              <p class="hidden-lg hidden-md">Profile</p>
              <a>Bienvenido(a) DUDE</a>
            </md-list-item>

            <md-list-item href="/logout">
              <i class="material-icons">person</i>
              <p class="hidden-lg hidden-md">Profile</p>
              <a>Desconectar</a>
            </md-list-item>
        </div>
      </div>
    </div>

  </md-toolbar>
</template>

<template v-else>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-end">
        <md-button class="md-just-icon md-simple md-toolbar-toggle" :class="{toggled: $sidebar.showSidebar}" @click="toggleSidebar">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>
        <div class="md-collapse">
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
      userName: null
    }
  },
  methods: {
    toggleSidebar () {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
    }
  }
}
</script>

<style lang="css">
</style>
