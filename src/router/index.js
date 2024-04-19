import { createRouter, createWebHistory } from 'vue-router'
import LayoutPrincipal from '../views/LayoutPrincipal.vue'
import Home from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/layout-principal',
      name: 'LayoutPrincipal',
      component: LayoutPrincipal
    }
  ]
})

export default router
