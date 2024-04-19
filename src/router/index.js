import { createRouter, createWebHistory } from 'vue-router'
import LayoutPrincipal from '../views/LayoutPrincipal.vue'
import TestsView from '../views/TestsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LayoutPrincipal',
      component: LayoutPrincipal
    },
    {
      path: '/tests',
      name: 'TestsView',
      component: TestsView
    },
  ]
})

export default router
