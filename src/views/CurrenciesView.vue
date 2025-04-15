<script setup>
import { ref, inject } from 'vue'
import { Converter } from 'easy-currencies'
import { countries } from '@/assets/javascript/countries'

const GlobalStore = inject('GlobalStore')

const value1 = ref(null)
const value2 = ref(null)
if (sessionStorage.getItem('value1')) {
  value1.value = sessionStorage.getItem('value1')
}
if (sessionStorage.getItem('value2')) {
  value2.value = sessionStorage.getItem('value2')
}

const currency1 = ref('')
const currency2 = ref('')

const handle = async () => {
  currency1.value = GlobalStore.country1.value.currency.code
  currency2.value = GlobalStore.country2.value.currency.code

  const converter = new Converter()
  if (value1.value) {
    const value = await converter.convert(value1.value, currency1.value, currency2.value)
    console.log(value) // converted value
    value2.value = value.toFixed(2)
  } else if (value2.value) {
    const value = await converter.convert(value2.value, currency2.value, currency1.value)
    console.log(value) // converted value
    value1.value = value.toFixed(2)
  }
}
const inputRefresh = (num) => {
  sessionStorage.setItem('value1', value1.value)
  sessionStorage.setItem('value2', value2.value)
  if (num === 1) {
    value2.value = ''
  }
  if (num === 2) {
    value1.value = ''
  }
}
</script>
<template>
  <main>
    <div class="wrapper">
      <section class="content">
        <h1>Currencies</h1>

        <form @submit.prevent="handleSubmit">
          <div>
            <div>
              <h3 v-if="GlobalStore.country1.value" for="value1">
                {{ GlobalStore.country1.value.currency.name }} :
              </h3>
              <div class="inputZone">
                <input
                  type="number"
                  id="value1"
                  step="0.01"
                  v-model="value1"
                  @input="inputRefresh(1)"
                />
                <p v-if="GlobalStore.country1.value">
                  {{ GlobalStore.country1.value.currency.symbol }}
                </p>
              </div>
            </div>
            <div>
              <h3 v-if="GlobalStore.country2.value" for="value2">
                {{ GlobalStore.country2.value.currency.name }} :
              </h3>
              <div class="inputZone">
                <input
                  type="number"
                  id="value2"
                  step="0.01"
                  v-model="value2"
                  @input="inputRefresh(2)"
                />
                <p v-if="GlobalStore.country2.value">
                  {{ GlobalStore.country2.value.currency.symbol }}
                </p>
              </div>
            </div>
          </div>
          <button class="handleButton" @click="handle">Convert</button>
        </form>
      </section>

      <!-- <section>
        <p>Value1 = {{ value1 }}</p>
        <p>Value2 = {{ value2 }}</p>
        <p>currency1 = {{ currency1 }}</p>
        <p>currency2 = {{ currency2 }}</p>
      </section> -->
    </div>
  </main>
</template>
<style scoped>
form {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
form > div {
  display: flex;
  align-items: center;
  gap: 40px;
  justify-content: space-evenly;
}
form > div > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
input {
  font-size: 20px;
  resize: none;
}
</style>
