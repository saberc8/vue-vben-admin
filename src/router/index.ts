import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/sys/login/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/workbench',
      name: 'workbench',
      component: () => import('../views/dashboard/workbench/index.vue'),
    }
  ]
})

export default router
