import { createRouter, createWebHistory } from 'vue-router'
import LayoutPrincipal from '@/views/LayoutPrincipal.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ProfileView from '@/views/ProfileView.vue'

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
      path: '/register',
      name: 'RegisterView',
      component: RegisterView
    },
    {
      path: '/profile',
      name: 'ProfileView',
      component: ProfileView
    },
  ]
})

export default router
