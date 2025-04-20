import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TranslateView from '@/views/TranslateView.vue'
import CurrenciesView from '@/views/CurrenciesView.vue'
import TimeView from '@/views/TimeView.vue'

import { inject } from 'vue'

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
      meta: { requireCountry: true },
    },
    {
      path: '/currencies',
      name: 'currencies',
      component: CurrenciesView,
      meta: { requireCountry: true },
    },
    {
      path: '/time',
      name: 'time',
      component: TimeView,
      meta: { requireCountry: true },
    },
  ],
})

router.beforeEach((to) => {
  const GlobalStore = inject('GlobalStore')

  if (
    (to.meta.requireCountry && !GlobalStore.country1.value) ||
    (to.meta.requireCountry && !GlobalStore.country2.value)
  ) {
    return { name: 'home' }
  }
})

export default router
