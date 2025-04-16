<script setup>
import { ref, inject, onBeforeMount } from 'vue'
import { countries } from '@/assets/javascript/countries'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const GlobalStore = inject('GlobalStore')

const country1 = ref($cookies.get('country1')) || ref('')
const country2 = ref($cookies.get('country2')) || ref('')
const transition = ref('')

const updateCountry = (num) => {
  if (num === 1) {
    $cookies.set('country1', country1.value)
    sessionStorage.removeItem('text1')
    sessionStorage.removeItem('langage1Selected')
    sessionStorage.removeItem('selectedCity1')
  } else if (num === 2) {
    $cookies.set('country2', country2.value)
    sessionStorage.removeItem('text2')
    sessionStorage.removeItem('langage2Selected')
    sessionStorage.removeItem('selectedCity2')
  }

  router.go()
}

const invertCountry = () => {
  transition.value = GlobalStore.country1.value

  $cookies.set('country1', GlobalStore.country2.value)
  $cookies.set('country2', GlobalStore.country1.value)
  sessionStorage.removeItem('text1')
  sessionStorage.removeItem('text2')
  sessionStorage.removeItem('langage1Selected')
  sessionStorage.removeItem('langage2Selected')
  sessionStorage.removeItem('selectedCity1')
  sessionStorage.removeItem('selectedCity2')

  router.go()
}
</script>
<template>
  <header>
    <div class="wrapper">
      <div class="home">
        <RouterLink :to="{ name: 'home' }">
          <img id="logo" src="../assets/imgs/LogoRH.png" alt="" />
        </RouterLink>
      </div>

      <!-- --- -->

      <div v-if="country1 && country2" class="countrySelectorZone">
        <div>
          <img class="flag" :src="GlobalStore.country1.value.flag" alt="" />

          <select id="country1" v-model="country1" @change="updateCountry(1)">
            <option v-for="countries in countries" :key="countries.country" :value="countries">
              {{ countries.country }}
            </option>
          </select>
        </div>

        <button class="roundButton" @click="invertCountry">
          <font-awesome-icon :icon="['fas', 'exchange-alt']" />
        </button>

        <div>
          <select name="langage2" id="" v-model="country2" @change="updateCountry(2)">
            <option v-for="countries in countries" :key="countries.country" :value="countries">
              {{ countries.country }}
            </option>
          </select>
          <img class="flag" :src="GlobalStore.country2.value.flag" alt="" />
        </div>
      </div>

      <!-- --- -->
      <div>
        <button class="roundButton">
          <font-awesome-icon :icon="['fas', 'bars']" />
        </button>
      </div>
    </div>
  </header>
</template>
<style scoped>
header {
  height: var(--header-heigth-);
  width: 100%;
  box-shadow: 0 0 15px black;

  position: absolute;
  z-index: 1;
  top: 0px;

  background: var(--header-gradient-);
}

.wrapper {
  display: flex;
  align-items: center;
}
.wrapper > div {
  /* border: solid blue 1px; */
  flex: 1;
  justify-content: center;
  text-align: center;
}

.home {
  display: flex;
  align-items: center;
  border-radius: 100px;
}
#logo {
  height: 100%;
  width: 100px;
  object-fit: contain;
  /* background-color: white; */
  /* border-radius: 50%; */
  /* border: solid 1.5px white; */
  /* box-shadow: -2px 2px 6px black; */
}

/* --- */

.countrySelectorZone {
  flex: 2;
  display: flex;
  gap: 5px;
  /* border: 1px solid blue; */
}
.countrySelectorZone > div {
  display: flex;
  align-items: center;
  gap: 10px;
}

.flag {
  width: 38px;
  height: 28px;
  object-fit: cover;
}

/* --- */

svg {
  font-size: 24px;
  /* color: white; */
}
</style>
