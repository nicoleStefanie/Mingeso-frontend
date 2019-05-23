<template>
  <div class="wrapper" :class="{'nav-open': $sidebar.showSidebar}">
    <notifications></notifications>

    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/Home">
        <md-icon>home</md-icon>
        <p>Home</p>
      </sidebar-link>

      <sidebar-link to="/reservas">
        <md-icon>pie_chart</md-icon>
        <p>Reservas</p>
      </sidebar-link>

      <sidebar-link to="/rack">
        <md-icon>pie_chart</md-icon>
        <p>Rack</p>
      </sidebar-link>

      <sidebar-link to="/habitaciones">
        <md-icon>pie_chart</md-icon>
        <p>Habitaciones</p>
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
