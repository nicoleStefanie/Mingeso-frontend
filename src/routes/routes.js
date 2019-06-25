import DashboardLayout from '@/pages/Layout/DashboardLayout.vue'

import Rack from '@/pages/Rack.vue'
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
import Servicios from '@/pages/Servicios.vue'
import AgregarServicio from '@/pages/AgregarServicio.vue'
import ModificarServicio from '@/pages/ModificarServicio.vue'
import CheckOut from '@/pages/Check-out.vue'
import Checkin from '@/pages/Checkin.vue'
import AsociarServicio from '@/pages/AsociarServicio.vue'
import reservaHabitacion from "../pages/reservaHabitacion";
import registroCliente from "../pages/registroCliente";
import filtrarHabitaciones from "../pages/filtrarHabitaciones";
import seleccionarHabitacion from "../pages/seleccionarHabitacion";
import registroSinReserva from "../pages/registroSinReserva";
import filtrarReserva from "../pages/filtrarReserva";
import seleccionarReservaSimple from "../pages/seleccionarReservaSimple";
import reservaSimple from "../pages/reservaSimple";
/*##############################################################*/

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/login',
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
        name: 'usuarios',
        component: Empleados
      },
      {
        path: 'modificarEmpleado/:id',
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
        path: 'modificarfechas/:codigoReserva/:nroHabitacion/:idHabitacion',
        name: 'modificarfechas',
        component: ModificarFechas

      },
      {
        path: 'modificartodo/:codigoReserva',
        name: 'modificartodo',
        component: ModificarTodo

      },
      {
        path: 'servicios',
        name: 'servicios',
        component: Servicios
      },
      {
        path: 'agregarServicio',
        name: 'agregarServicio',
        component: AgregarServicio
      },
      {
        path: 'modificarServicio/:id',
        name: 'modifcarServicio',
        component: ModificarServicio
      },
      {
        path: 'checkOut',
        name: 'checkOut',
        component: CheckOut
      },
      {
        path: 'checkin',
        name: 'checkin',
        component: Checkin
      },
      {
        path: 'asociarServicio',
        name: 'asociarServicio',
        component: AsociarServicio
      },
      {
        path: 'reservaHabitacion/:idReserva',
        name: 'reservaHabitacion',
        component: reservaHabitacion
      },
      {
        path: 'registroCliente/:idHab/:fechaInicio/:fechaTermino/:idReserva',
        name: 'registroCliente',
        component: registroCliente
      },
      {
        path: 'filtrarHabitaciones',
        name: 'filtrarHabitaciones',
        component: filtrarHabitaciones
      },
      {
        path: 'filtrarReserva',
        name: 'filtrarReserva',
        component: filtrarReserva
      },
      {
        path: 'seleccionarHabitacion/:fechaInicio/:fechaTermino/:tipo',
        name: 'seleccionarHabitacion',
        component: seleccionarHabitacion
      },
      {
        path: 'seleccionarReservaSimple/:fechaInicio/:fechaTermino/:tipo',
        name: 'seleccionarReservaSimple',
        component: seleccionarReservaSimple
      },
      {
        path: 'registroSinReserva/:idHab/:fechaInicio/:fechaTermino',
        name: 'registroSinReserva',
        component: registroSinReserva
      },

      {
        path: 'reservaSimple/:idHab/:fechaInicio/:fechaTermino',
        name: 'reservaSimple',
        component: reservaSimple
      },
    ]
  }
]

export default routes
