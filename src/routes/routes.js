import DashboardLayout from '@/pages/Layout/DashboardLayout.vue'

import Rack from '@/pages/Rack.vue'
import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Reservas from '@/pages/Reservas.vue'
import ReservaSimple from '@/pages/ReservaSimple.vue'
import VistaEliminar from '@/pages/VistaEliminar.vue'
import VistaModificar from '@/pages/VistaModificar.vue'
import ReservaMultiple from '@/pages/ReservaMultiple.vue'
import ReservaEntradas from '@/pages/ReservaEntradas.vue'
import ModificarSimple from '@/pages/ModificarSimple.vue'
import ModificarReservaMultiple from '@/pages/ModificarMultiple.vue'
import Habitaciones from '@/pages/Habitaciones.vue'
import ModificarHabitaciones from '@/pages/ModificarHabitaciones.vue'
import AgregarHabitaciones from '@/pages/AgregarHabitaciones.vue'
import Empleados from '@/pages/Empleados.vue'
import ModificarEmpleado from '@/pages/ModificarEmpleado.vue'
import AgregarEmpleado from '@/pages/AgregarEmpleado.vue'
import HabilitarHabitacion from '@/pages/HabilitarHabitacion.vue'
import ModificarFechas from '@/pages/ModificarFechas.vue'
import ModificarTodo from '@/pages/ModificarTodo.vue'
/*##############################################################*/

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/rack',
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
        path: 'modificarReservaSimple/:id',
        name: 'ModificarReservaSimple',
        component: ModificarSimple
      },
      {
        path: 'modificarReservaMultiple',
        name: 'ModificarReservaMultiple',
        component: ModificarReservaMultiple
      },
      {
        path: 'reservas',
        name: 'Reservas',
        component: Reservas
      },
      {
        path: 'vistaEliminar',
        name: 'VistaEliminar',
        component: VistaEliminar
      },
      {
        path: 'vistaModificar',
        name: 'VistaModificar',
        component: VistaModificar
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
        path: 'habitaciones',
        name: 'Habitaciones',
        component: Habitaciones
      },
      {
        path: 'modificarHabitacion/:id',
        name: 'modificarHabitacion',
        component: ModificarHabitaciones
      },
      {
        path: 'agregarHabitacion',
        name: 'agregarHabitacion',
        component: AgregarHabitaciones
      },
      {
        path: 'usuarios',
        name: 'uaurios',
        component: Empleados
      },
      {
        path: 'modificarEmpleado/:rut',
        name: 'modificarEmpleado',
        component: ModificarEmpleado
      },
      {
        path: 'agregarEmpleado',
        name: 'agregarEmpleado',
        component: AgregarEmpleado
      },
      {
        path: 'habilitarHabitacion/:id',
        name: 'habilitarHabitacion',
        component: HabilitarHabitacion

      },
      {
        path: 'modificarfechas/:codigoReserva/:idHabitacion',
        name: 'modificarfechas',
        component: ModificarFechas

      },
      {
        path: 'modificartodo/:codigoReserva',
        name: 'modificartodo',
        component: ModificarTodo

      },
    ]
  }
]

export default routes
