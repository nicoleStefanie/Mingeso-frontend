import DashboardLayout from '@/pages/Layout/DashboardLayout.vue'

import Dashboard from '@/pages/Dashboard.vue'
// No pescar
import UserProfile from '@/pages/UserProfile.vue'
import TableList from '@/pages/cuenta/TableList.vue'
import Home from '@/pages/Home.vue'

/*##############################################################*/ 
import Reservas from '@/pages/Reservas.vue'
import ReservaSimple from '@/pages/ReservaSimple.vue'
import ReservaMultiple from '@/pages/ReservaMultiple.vue'
import ReservaEntradas from '@/pages/ReservaEntradas.vue'
import Login from '@/pages/Login.vue'
/*##############################################################*/ 

// No pescar
import Grafo from '@/pages/Grafo.vue'
import Maps from '@/pages/Maps.vue'
import Mapa from '@/pages/Mapa.vue'
import Rack from '@/pages/Rack.vue'
import Notifications from '@/pages/Notifications.vue'
import Agregar from '@/pages/UserProfile/AddPolitico.vue'
import Editar from '@/pages/UserProfile/EditPolitico.vue'

const routes = [

  {
    path: '/',
    component: DashboardLayout,
    redirect: '/Home',
    children: [
      {
        path: 'reservaSimple',
        name: 'ReservaSimple',
        component: ReservaSimple
      },
      {
        path: 'reservaMultiple',
        name: 'ReservaMultiple',
        component: ReservaMultiple
      },
      {
        path: 'reservaEntradas',
        name: 'ReservaEntradas',
        component: ReservaEntradas
      },
      {
        path: 'reservas',
        name: 'Reservas',
        component: Reservas
      },
      {
        path: 'rack',
        name: 'Rack',
        component: Rack
      },
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'user',
        name: 'User Profile',
        component: UserProfile
      },

      {
        path: 'Agregar',
        name: 'Agregar Politico',
        component: Agregar
      },
      {
        path: 'editar',
        name: 'Editar Politico',
        component: Editar
      },
      {
        path: 'table',
        name: 'Table List',
        component: TableList
      },           
      {
        path: 'Home',
        name: 'Home',
        component: Home
      },
      {
        path: 'maps',
        name: 'Maps',
        meta: {
          hideFooter: true
        },
        component: Maps

      },
    ]
  }
]

export default routes
