<script setup>
import { ref, inject, onMounted } from 'vue'
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
if (GlobalStore.country1.value.currency.code) {
  {
    currency1.value = GlobalStore.country1.value.currency.code
  }
}
const currency2 = ref('')
if (GlobalStore.country2.value.currency.code) {
  currency2.value = GlobalStore.country2.value.currency.code
}

const handle = async () => {
  const converter = new Converter()
  if (value1.value) {
    const value = await converter.convert(value1.value, currency1.value, currency2.value)
    // console.log(value)
    value2.value = value.toFixed(2)
  } else if (value2.value) {
    const value = await converter.convert(value2.value, currency2.value, currency1.value)
    // console.log(value)
    value1.value = value.toFixed(2)
  }
}

const currencyArray = ref([])
const currencyValue = ref([])

onMounted(async () => {
  const converter = new Converter()
  for (let i = 0; i < countries.length; i++) {
    if (
      currencyArray.value.indexOf(countries[i].currency.code) === -1 &&
      countries[i].currency.code !== GlobalStore.country1.value.currency.code
    ) {
      currencyArray.value.push(countries[i].currency.code)
    }
  }
  currencyArray.value.sort()

  // console.log(currencyArray.value)

  for (let i = 0; i < currencyArray.value.length; i++) {
    const value = await converter.convert(1, currency1.value, currencyArray.value[i])

    currencyValue.value.push({ [currencyArray.value[i]]: value })
  }
  // console.log(currencyValue.value)
})

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
                {{ GlobalStore.country1.value.currency.name }}
                <span>({{ GlobalStore.country1.value.currency.code }})</span>
              </h3>
              <div class="inputZone">
                <input
                  type="number"
                  id="value1"
                  step="0.01"
                  v-model="value1"
                  @keyup.enter="handle"
                  @input="inputRefresh(1)"
                  @blur="handle"
                />
                <p v-if="GlobalStore.country1.value">
                  {{ GlobalStore.country1.value.currency.symbol }}
                </p>
              </div>
            </div>
            <div>
              <h3 v-if="GlobalStore.country2.value" for="value2">
                {{ GlobalStore.country2.value.currency.name }}
                <span>({{ GlobalStore.country2.value.currency.code }})</span>
              </h3>
              <div class="inputZone">
                <input
                  type="number"
                  id="value2"
                  step="0.01"
                  v-model="value2"
                  @keyup.enter="handle"
                  @input="inputRefresh(2)"
                  @blur="handle"
                />
                <p v-if="GlobalStore.country2.value">
                  {{ GlobalStore.country2.value.currency.symbol }}
                </p>
              </div>
            </div>
          </div>
        </form>
        <section class="rateZone">
          <h3>{{ GlobalStore.country1.value.currency.name }} rates</h3>
          <div>
            <p
              v-for="(rate, i) in currencyValue"
              :key="rate"
              :class="{
                selectedCurrency:
                  String(Object.keys(currencyValue[i])) ===
                  GlobalStore.country2.value.currency.code,
              }"
            >
              {{ String(Object.keys(currencyValue[i])) }} :
              {{ String(Object.values(currencyValue[i])) }}
            </p>
          </div>
        </section>
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
h1 {
  margin: 40px 0;
}
form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
}
form > div {
  display: flex;
  align-items: center;
  gap: 40px;
}
form > div > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.rateZone {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  box-shadow: 0 0 3px black;
  border: solid 1px black;
  border-radius: 20px;
  width: 600px;
  height: 300px;
  padding: 10px;
}
.rateZone > div {
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 10px;
  margin-top: 10px;
  padding: 0 20px;
  flex-wrap: wrap;
  overflow: scroll;

  height: 78%;
  width: 100%;

  font-family: monospace;
  font-size: 20px;
}
.selectedCurrency {
  font-weight: bold;
  color: var(--orange-color-);
}
.rateZone > h3 {
  margin-bottom: 10px;
}
.inputZone {
  font-family: monospace;
}
input {
  font-size: 20px;
  resize: none;
  font-family: monospace;
}
span {
  font-style: italic;
  font-size: 20px;
}

/* --- */
/* Media Query */
/* --- */

@media (max-width: 900px) {
  h1 {
    margin: 20px 0 30px;
    font-size: 38px;
  }

  form > div {
    flex-direction: column;
    gap: 10px;
  }
  .rateZone {
    width: 500px;
  }
}
@media (max-width: 600px) {
  .rateZone {
    width: 90%;
  }
}
@media (max-width: 430px) {
  .rateZone > div {
    padding: 0;
    font-size: 17px;
  }

  .inputZone > input {
    /* border: solid 1px blue; */
    width: 220px;
  }
  h3 {
    font-size: 20px;
  }
  h3 span {
    font-size: 18px;
  }
}
</style>
