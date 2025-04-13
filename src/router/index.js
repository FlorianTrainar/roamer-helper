import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TranslateView from '@/views/TranslateView.vue'
import CurrenciesView from '@/views/CurrenciesView.vue'
import TimeView from '@/views/TimeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/translate',
      name: 'translate',
      component: TranslateView,
    },
    {
      path: '/currencies',
      name: 'currencies',
      component: CurrenciesView,
    },
    {
      path: '/time',
      name: 'time',
      component: TimeView,
    },
  ],
})

export default router
