<script setup>
import { ref, inject } from 'vue'
import { Converter } from 'easy-currencies'
import { countries } from '@/assets/javascript/countries'

const GlobalStore = inject('GlobalStore')

const value1 = ref(null)
const value2 = ref(null)

const currency1 = ref('')
const currency2 = ref('')

const handle = async () => {
  currency1.value = GlobalStore.country1.value.currency.code
  currency2.value = GlobalStore.country2.value.currency.code

  const converter = new Converter()
  const value = await converter.convert(value1.value, currency1.value, currency2.value)

  console.log(value) // converted value
  value2.value = value.toFixed(2)
}
</script>
<template>
  <main>
    <div class="wrapper">
      <h1>Currencies</h1>

      <form @submit.prevent="handleSubmit">
        <section>
          <div>
            <label v-if="GlobalStore.country1.value" for="value1"
              >{{ GlobalStore.country1.value.currency.name }} :</label
            >
            <div class="inputZone">
              <input type="number" id="value1" step="0.01" v-model="value1" />
              <p v-if="GlobalStore.country1.value">
                {{ GlobalStore.country1.value.currency.symbol }}
              </p>
            </div>
          </div>
          <div>
            <label v-if="GlobalStore.country2.value" for="value2"
              >{{ GlobalStore.country2.value.currency.name }} :</label
            >
            <div class="inputZone">
              <input type="number" id="value2" step="0.01" v-model="value2" />
              <p v-if="GlobalStore.country2.value">
                {{ GlobalStore.country2.value.currency.symbol }}
              </p>
            </div>
          </div>
        </section>
        <button @click="handle">Convert</button>
      </form>

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
  display: flex;
  flex-direction: column;
  gap: 10px;
}
form > section {
  display: flex;
  justify-content: center;
  gap: 20px;
}
form > section > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

button {
  width: 100px;
  align-self: center;
  font-size: 16px;
  padding: 10px;
  border-radius: 20px;
  background-color: var(--background-color-);
}
</style>
