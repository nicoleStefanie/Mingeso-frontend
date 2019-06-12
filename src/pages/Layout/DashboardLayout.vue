<template v-if="$localStorage.getItem('login') == true">
  <div class="wrapper" :class="{'nav-open': $sidebar.showSidebar}">
    <notifications></notifications>
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>

      <sidebar-link to="/rack">
        <md-icon>notes</md-icon>
        <p>Rack</p>
      </sidebar-link>

      <sidebar-link to="/checkin">
        <md-icon>chevron_right</md-icon>
        <p>Check-In</p>
      </sidebar-link>

      <sidebar-link to="/checkOut">
        <md-icon>chevron_left</md-icon>
        <p>Check-Out</p>
      </sidebar-link>

      <sidebar-link to="/reservas">
        <md-icon>assignment</md-icon>
        <p>Reservas</p>
      </sidebar-link>

      <sidebar-link to="/habitaciones">
        <md-icon>meeting_room</md-icon>
        <p>Habitaciones</p>
      </sidebar-link>

      <sidebar-link to="/usuarios">
        <md-icon>people</md-icon>
        <p>Usuarios</p>
      </sidebar-link>

      <sidebar-link to="/servicios">
        <md-icon>room_service</md-icon>
        <p>Servicios</p>
      </sidebar-link>

    </side-bar>

    <div class="main-panel">
       <top-navbar></top-navbar>

      <dashboard-content>

      </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>

<template v-else>
  <div class="wrapper" :class="{'nav-open': $sidebar.showSidebar}">
    <notifications></notifications>
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>

      <sidebar-link to="/">
        <md-icon>notes</md-icon>
        <p>Login</p>
      </sidebar-link>

    </side-bar>

    <div class="main-panel">
       <top-navbar></top-navbar>

      <dashboard-content>

      </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
import TopNavbar from './TopNavbar.vue'
import ContentFooter from './ContentFooter.vue'
import DashboardContent from './Content.vue'
import MobileMenu from '@/pages/Layout/MobileMenu.vue'

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  }
}
</script>
