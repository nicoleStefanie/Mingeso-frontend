import DashboardAdminLayout from '@/pages/Layout/DashboardAdminLayout.vue'

import TableList from '@/pages/cuenta/TableList.vue'
import Dashboard from '@/pages/Dashboard.vue'

const routesAdmin = [
  {
    path: '/',
    component: DashboardAdminLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'table',
        name: 'Table List',
        component: TableList
      },

    ]
  }
]

export default routesAdmin
