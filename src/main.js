import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { ref } from 'vue'

const app = createApp(App)

app.use(router)

// Création de la valeur réactive
const country1 = ref('')
const country2 = ref('')

// Création du 'provider'
app.provide('GlobalStore', { country1: country1, country2: country2 })

app.mount('#app')
