import { createRouter, createWebHistory } from 'vue-router'
import LayoutPrincipal from '@/views/LayoutPrincipal.vue'
import LoginView from '@/views/LoginView.vue'
import TestsView from '@/views/TestsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LayoutPrincipal',
      component: LayoutPrincipal
    },
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView
    },
    {
      path: '/tests',
      name: 'TestsView',
      component: TestsView
    }
  ]
})

export default router
