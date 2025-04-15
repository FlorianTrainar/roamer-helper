<script setup>
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'

const Router = useRouter()

const GlobalStore = inject('GlobalStore')

const displaySwitched = ref(false)

if (sessionStorage.getItem('switch') === 'true') {
  displaySwitched.value = true
}

// Minutes definition

const d = new Date() // for now
const minutes = d.getMinutes()
const paddedMinutes = String(minutes).padStart(2, '0')
const utcHour = ref(d.getUTCHours())

// Hours definition

const hourCorrection = (num) => {
  if (!displaySwitched.value) {
    if (num > 23) {
      num = num - 24
    } else if (num < 0) {
      num = num + 24
    }
    return String(num).padStart(2, '0')
  } else if (displaySwitched.value) {
    if (num > 11) {
      num = num - 12
    } else if (num > 23) {
      num = num - 24
    } else if (num < 0) {
      num = num - 24
    }
    return String(num).padStart(2, '0')
  }

  return String(num).padStart(2, '0')
}
const hour1 = ref(utcHour.value + GlobalStore.country1.value.time)
const hour1Corrected = ref(hourCorrection(hour1.value))

const hour2 = ref(utcHour.value + GlobalStore.country2.value.time)
const hour2Corrected = ref(hourCorrection(hour2.value))

// Total definition

const currentTime1 = ref(`${hour1Corrected.value}h${paddedMinutes}`)
if (displaySwitched.value) {
  if (hour1.value < 13 && hour1.value !== 0) {
    currentTime1.value = ref(`${hour1Corrected.value}h${paddedMinutes}AM`)
  } else {
    currentTime1.value = ref(`${hour1Corrected.value}h${paddedMinutes}PM`)
  }
}
const currentTime2 = ref(`${hour2Corrected.value}h${paddedMinutes}`)
if (displaySwitched.value) {
  if (hour2.value < 13 && hour2.value !== 0) {
    currentTime2.value = ref(`${hour2Corrected.value}h${paddedMinutes}AM`)
  } else {
    currentTime2.value = ref(`${hour2Corrected.value}h${paddedMinutes}PM`)
  }
}

const timeDifference = ref(GlobalStore.country2.value.time - GlobalStore.country1.value.time)

// Switch display

const switchDisplay = (boolean) => {
  displaySwitched.value = boolean
  sessionStorage.setItem('switch', boolean)
  Router.go()

  return displaySwitched.value
}
</script>
<template>
  <main>
    <div class="wrapper">
      <div class="content">
        <h1>Time Zone</h1>
        <section>
          <div v-if="GlobalStore.country1.value">
            <p>
              Time in <span>{{ GlobalStore.country1.value.capital }} </span> : {{ currentTime1 }}
            </p>
            <div v-if="GlobalStore.country1.value.citiesTime">
              <p v-for="cities in GlobalStore.country1.value.citiesTime" :key="cities">
                Time in <span>{{ Object.keys(cities).join() }} </span> :
                {{ currentTime1 }}
              </p>
            </div>
          </div>

          <p v-if="GlobalStore.country2.value">
            Time in <span>{{ GlobalStore.country2.value.capital }}</span> : {{ currentTime2 }}
          </p>
        </section>
        <section>
          <p v-if="GlobalStore.country1.value && GlobalStore.country2.value">
            Time difference = {{ timeDifference }}h
          </p>
        </section>
        <button v-if="displaySwitched" @click="switchDisplay(false)" class="handleButton">
          AM/PM
        </button>
        <button v-if="!displaySwitched" @click="switchDisplay(true)" class="handleButton">
          24h
        </button>
        <!-- <p>displaySwitched= {{ displaySwitched }}</p> -->
      </div>
    </div>
  </main>
</template>
<style scoped>
.content {
  gap: 40px;
}
section {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}
p {
  font-size: 22px;
}
span {
  color: var(--orange-color-);
  font-weight: bold;
}
</style>
