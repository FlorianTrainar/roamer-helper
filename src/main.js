import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { ref } from 'vue'

import VueCookies from 'vue-cookies'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faExchangeAlt,
  faBook,
  faCoins,
  faClock,
  faBars,
  faArrowRight,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'
import {} from '@fortawesome/free-regular-svg-icons'
import {} from '@fortawesome/free-brands-svg-icons'
library.add(faExchangeAlt, faBook, faCoins, faClock, faBars, faArrowRight, faArrowLeft)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(VueCookies)

// Création de la valeur réactive
const country1 = ref($cookies.get('country1')) || ref('')
const country2 = ref($cookies.get('country2')) || ref('')

// Création du 'provider'
app.provide('GlobalStore', { country1: country1, country2: country2 })

app.mount('#app')
