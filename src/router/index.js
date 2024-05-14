import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ProfileView from '@/views/ProfileView.vue'
import CharactersView from '@/views/LayoutPrincipal/CharactersView.vue'
import LocationsView from '@/views/LayoutPrincipal/LocationsView.vue'
import EpisodesView from '@/views/LayoutPrincipal/EpisodesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/characters',
      name: 'CharactersView',
      component: CharactersView
    },
    {
      path: '/episodes',
      name: 'EpisodesView',
      component: EpisodesView
    },
    {
      path: '/locations',
      name: 'LocationsView',
      component: LocationsView
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
