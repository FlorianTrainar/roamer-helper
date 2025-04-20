<script setup>
import { ref, inject, onBeforeMount } from 'vue'
import { countries } from '@/assets/javascript/countries'
import { RouterView, RouterLink, useRouter } from 'vue-router'
import MenuPart from './MenuPart.vue'

const router = useRouter()

const GlobalStore = inject('GlobalStore')

const country1 = ref('')
const country2 = ref('')
if ($cookies.get('country1')) {
  country1.value = $cookies.get('country1')
}
if ($cookies.get('country2')) {
  country2.value = $cookies.get('country2')
}

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

const menuDisplayed = ref(false)
const displayMenu = () => {
  if (!menuDisplayed.value) {
    menuDisplayed.value = true
  } else if (menuDisplayed.value) {
    menuDisplayed.value = false
  }
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

      <div class="countrySelectorZone">
        <div>
          <img
            v-if="GlobalStore.country1.value"
            class="flag"
            :src="GlobalStore.country1.value.flag"
            alt=""
          />

          <select id="country1" v-model="country1" @change="updateCountry(1)">
            <option value="" hidden>Your country</option>
            <option v-for="countries in countries" :key="countries.country" :value="countries">
              {{ countries.country }}
            </option>
          </select>
        </div>

        <button
          :class="{ invisible: !GlobalStore.country1.value || !GlobalStore.country2.value }"
          class="roundButton"
          @click="invertCountry"
        >
          <font-awesome-icon :icon="['fas', 'exchange-alt']" />
        </button>

        <div>
          <select name="country2" id="" v-model="country2" @change="updateCountry(2)">
            <option value="" hidden>Your destination</option>
            <option v-for="countries in countries" :key="countries.country" :value="countries">
              {{ countries.country }}
            </option>
          </select>
          <img
            v-if="GlobalStore.country2.value"
            class="flag"
            :src="GlobalStore.country2.value.flag"
            alt=""
          />
        </div>
      </div>

      <!-- --- -->
      <div>
        <button @click="displayMenu" class="roundButton" :class="{ activated: menuDisplayed }">
          <font-awesome-icon :icon="['fas', 'bars']" />
        </button>

        <div :class="{ hidden: !menuDisplayed }">
          <MenuPart @display="(payload) => displayMenu()" />
        </div>
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
  width: 44px;
  height: 28px;

  object-fit: cover;
}

/* --- */

svg {
  font-size: 24px;
  /* color: white; */
}
.roundButton {
  position: relative;
}
.activated {
  transform: rotate(90deg);
}
.hidden {
  display: none;
}
.invisible {
  visibility: hidden;
}
</style>
