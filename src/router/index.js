import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ProfileView from '@/views/ProfileView.vue'
import CharactersView from '@/views/CharactersView.vue'
import LocationsView from '@/views/LocationsView.vue'
import EpisodesView from '@/views/EpisodesView.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
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
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Adicione o guarda global de navegação
router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user-info')

  // Permite o acesso às rotas públicas
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else if (user) {
    // Permite o acesso às rotas protegidas se o usuário estiver autenticado
    next()
  } else {
    // Redireciona para a página de login se o usuário não estiver autenticado
    next('/login')
  }
})

export default router
