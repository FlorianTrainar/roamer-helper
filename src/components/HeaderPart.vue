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
    // GlobalStore.country1.value = country1.value
  } else if (num === 2) {
    $cookies.set('country2', country2.value)
  }
  router.go()
}

const invertCountry = () => {
  transition.value = GlobalStore.country1.value

  $cookies.set('country1', GlobalStore.country2.value)
  $cookies.set('country2', GlobalStore.country1.value)

  router.go()
}
</script>
<template>
  <header>
    <section>
      <div class="background">
        <img src="../assets/imgs/sky.jpg" alt="" />
      </div>

      <div class="home">
        <RouterLink :to="{ name: 'home' }">
          <img id="logo" src="../assets/imgs/Logo2cutwhite.png" alt="" />
        </RouterLink>
        <RouterLink :to="{ name: 'home' }">
          <h3>Roamer</h3>
          <h3>Helper</h3>
        </RouterLink>
      </div>
      <div v-if="country1 && country2" class="countrySelectorZone">
        <!-- <h2>{{ GlobalStore.country1.value.country }}</h2> -->
        <div>
          <select id="country1" v-model="country1" @change="updateCountry(1)">
            <!-- <option value="">Select</option> -->
            <option v-for="countries in countries" :key="countries.country" :value="countries">
              {{ countries.country }}
            </option>
          </select>
        </div>
        <button @click="invertCountry">Fleches</button>

        <div>
          <select name="langage2" id="" v-model="country2" @change="updateCountry(2)">
            <!-- <option value="">@</option> -->
            <option v-for="countries in countries" :key="countries.country" :value="countries">
              {{ countries.country }}
            </option>
          </select>
        </div>
        <!-- <h2>{{ GlobalStore.country2.value.country }}</h2> -->
      </div>
      <div>Menu</div>
    </section>
    <!-- <section v-if="country1 && country2">
      <div>
        <RouterLink :to="{ name: 'home' }">Home</RouterLink>
      </div>
      <div>
        <RouterLink :to="{ name: 'translate' }">Translate</RouterLink>
      </div>
      <div>
        <RouterLink :to="{ name: 'currencies' }">Currencies</RouterLink>
      </div>
      <div>
        <RouterLink :to="{ name: 'time' }">Time Zone</RouterLink>
      </div>
    </section> -->
  </header>
</template>
<style scoped>
header {
  height: var(--header-heigth-);
  width: 100%;
  box-shadow: 0 0 15px black;
  z-index: 1;
  position: absolute;
  background-color: var(--background-color-);
}
header > section {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.countrySelectorZone {
  display: flex;
  gap: 5px;
  /* border: 1px solid blue; */
}

/* --- */

.background {
  position: absolute;
  width: 100%;
  height: 99%;

  top: 0px;
  z-index: -1;
}
.background img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  object-position: left;
}

.home {
  display: flex;
  align-items: center;
}

#logo {
  /* height: 120px; */
  width: 100px;
  object-fit: contain;
  /* background-color: white; */
  border-radius: 20px;
  padding: 10px;
  /* box-shadow: 0 0 5px black; */
}
</style>
