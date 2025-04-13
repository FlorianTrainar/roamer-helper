<script setup>
import { ref, inject, onBeforeMount } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

import { countries } from '@/assets/javascript/countries'

const GlobalStore = inject('GlobalStore')

const router = useRouter()

const country1 = ref('')
const country2 = ref('')
const transition = ref('')

// onBeforeMount(() => {
//   $cookies.remove('country1')
//   $cookies.remove('country2')
// })

const updateCountry = (num) => {
  if (num === 1) {
    $cookies.set('country1', country1.value)
    // GlobalStore.country1.value = country1.value
  } else if (num === 2) {
    $cookies.set('country2', country2.value)
  }
}

const start = () => {
  router.go()

  // router.push({ path: '/translate' })
}
</script>
<template>
  <main>
    <h1>Welcome !</h1>

    <div v-if="!GlobalStore.country1.value && !GlobalStore.country2.value" class="countrySelect">
      <div>
        <select id="country1" v-model="country1" @change="updateCountry(1)">
          <option value="" hidden>Your country</option>
          <option v-for="countries in countries" :key="countries.country" :value="countries">
            {{ countries.country }}
          </option>
        </select>
      </div>
      <button v-if="country1 && country2" @click="start">START</button>
      <div>
        <select name="langage2" id="" v-model="country2" @change="updateCountry(2)">
          <option value="" hidden>Your destination</option>
          <option v-for="countries in countries" :key="countries.country" :value="countries">
            {{ countries.country }}
          </option>
        </select>
      </div>
    </div>

    <div v-if="GlobalStore.country1.value && GlobalStore.country2.value" class="appSelect">
      <section>
        <div>
          <RouterLink :to="{ name: 'translate' }">Translate</RouterLink>
        </div>
        <div>
          <RouterLink :to="{ name: 'currencies' }">Currencies</RouterLink>
        </div>
        <div>
          <RouterLink :to="{ name: 'time' }">Time Zone</RouterLink>
        </div>
      </section>
    </div>
  </main>
</template>
<style scoped>
.countrySelect {
  display: flex;
  gap: 5px;
}
</style>
