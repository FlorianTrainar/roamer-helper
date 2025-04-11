<script setup>
import { ref, inject } from 'vue'
import { countries } from '@/assets/javascript/countries'

const GlobalStore = inject('GlobalStore')

const country1 = ref('')
const country2 = ref('')
const transition = ref('')

const updateCountry = (num) => {
  if (num === 1) {
    GlobalStore.country1.value = country1.value
  } else if (num === 2) {
    GlobalStore.country2.value = country2.value
  }
}

const invertCountry = () => {
  transition.value = GlobalStore.country1.value

  GlobalStore.country1.value = GlobalStore.country2.value
  country1.value = country2.value
  GlobalStore.country2.value = transition.value
  country2.value = transition.value
}
</script>
<template>
  <header>
    <div>Logo</div>
    <div class="countrySelect">
      <div>
        <select name="country1" id="" v-model="country1" @change="updateCountry(1)">
          <option value="">Select</option>
          <option v-for="countries in countries" :key="countries.country" :value="countries">
            {{ countries.country }}
          </option>
        </select>
      </div>
      <button @click="invertCountry">Fleches</button>
      <div>
        <select name="langage2" id="" v-model="country2" @change="updateCountry(2)">
          <option value="">Select</option>
          <option v-for="countries in countries" :key="countries.country" :value="countries">
            {{ countries.country }}
          </option>
        </select>
      </div>
    </div>
    <div>Menu</div>
  </header>
</template>
<style scoped>
header {
  height: var(--header-heigth-);
  background-color: var(--background-color-);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  box-shadow: 0 0 5px grey;
}
.countrySelect {
  display: flex;
  gap: 5px;
}
</style>
