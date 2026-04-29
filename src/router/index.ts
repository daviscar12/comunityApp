import { createRouter, createWebHistory } from '@ionic/vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/auth'
  },

  {
    path: '/auth',
    component: () => import('../views/AuthView.vue')
  },

  {
    path: '/login',
    component: () => import('../views/LoginView.vue')
  },

  {
    path: '/tabs/',
    component: () => import('../views/TabsView.vue'),
    children: [
      {
        path: '',
        redirect: '/tabs/home'
      },
      {
        path: 'home',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: 'events',
        component: () => import('../views/EventsView.vue')
      },
      {
        path: 'profile',
        component: () => import('../views/ProfileView.vue')
      },
      {
        path: 'settings',
        component: () => import('../views/SettingsView.vue')
      }
    ]
  },

  {
    path: '/event/:id',
    component: () => import('../views/EventDetailView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router