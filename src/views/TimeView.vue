<script setup>
import { inject, ref, computed } from 'vue'

const GlobalStore = inject('GlobalStore')

// Minutes definition

const d = new Date() // for now
const minutes = d.getMinutes()
const paddedMinutes = String(minutes).padStart(2, '0')
const utcHour = ref(d.getUTCHours())

// Hours definition

const hourCorrection = (num) => {
  if (num > 23) {
    return String(num).padStart(2, '0') - 24
  } else if (num < 0) {
    return String(num).padStart(2, '0') + 24
  }
  return String(num).padStart(2, '0')
}
const hour1 = ref(utcHour.value + GlobalStore.country1.value.time)
const hour1Corrected = hourCorrection(hour1.value)
const hour2 = ref(utcHour.value + GlobalStore.country2.value.time)
const hour2Corrected = hourCorrection(hour2.value)

// Total definition

const currentTime1 = ref(`${hour1Corrected}h${paddedMinutes}`)
const currentTime2 = ref(`${hour2Corrected}h${paddedMinutes}`)

const timeDifference = ref(GlobalStore.country1.value.time - GlobalStore.country2.value.time)
</script>
<template>
  <main>
    <div class="wrapper">
      <h1>Time Zone</h1>
      <section>
        <div>
          <p v-if="GlobalStore.country1.value">
            Time in {{ GlobalStore.country1.value.capital }} : {{ currentTime1 }}
          </p>
          <p v-if="GlobalStore.country1.value && GlobalStore.country2.value">
            Time difference = {{ timeDifference }}h
          </p>
          <p v-if="GlobalStore.country2.value">
            Time in {{ GlobalStore.country2.value.capital }} : {{ currentTime2 }}
          </p>
        </div>
      </section>
    </div>
  </main>
</template>
