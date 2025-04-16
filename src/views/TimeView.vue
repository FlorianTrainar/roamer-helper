<script setup>
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'

const Router = useRouter()

const GlobalStore = inject('GlobalStore')

const displaySwitched = ref(false)

if (sessionStorage.getItem('switch') === 'true') {
  displaySwitched.value = true
}

const selectedCity1 = ref(0)
if (sessionStorage.getItem('selectedCity1')) {
  selectedCity1.value = parseInt(sessionStorage.getItem('selectedCity1'))
}
const selectedCity2 = ref(0)
if (sessionStorage.getItem('selectedCity2')) {
  selectedCity2.value = parseInt(sessionStorage.getItem('selectedCity2'))
}

const selectCity = (i, num) => {
  if (num === 1) {
    selectedCity1.value = i
    sessionStorage.setItem('selectedCity1', i)
  } else if (num === 2) {
    selectedCity2.value = i
    sessionStorage.setItem('selectedCity2', i)
  }
  Router.go()
}

// Minutes definition

const d = new Date() // for now
const minutes = d.getMinutes()
const paddedMinutes = String(minutes).padStart(2, '0')
const utcHour = ref(d.getUTCHours())

// Total definition

const definitiveTime = ref(null)

const timeSet = (hour) => {
  if (!displaySwitched.value) {
    if (hour > 23) {
      definitiveTime.value = hour - 24
      return `${definitiveTime.value}h${paddedMinutes}`
    } else if (hour < 0) {
      definitiveTime.value = hour + 24
      return `${definitiveTime.value}h${paddedMinutes}`
    }
    definitiveTime.value = String(hour).padStart(2, '0')

    return `${definitiveTime.value}h${paddedMinutes}`

    // ---
  } else if (displaySwitched.value) {
    if (hour > 24) {
      definitiveTime.value = String(hour - 24).padStart(2, '0')
      return `${definitiveTime.value}h${paddedMinutes}AM`
    }

    if (hour > 12 && hour !== 24) {
      definitiveTime.value = String(hour - 12).padStart(2, '0')
      return `${definitiveTime.value}h${paddedMinutes}PM`
    } else if (hour === 12) {
      return `12h${paddedMinutes}PM`
    } else if (hour === 0 || hour === 24) {
      return `12h${paddedMinutes}AM`
    }
  }
  definitiveTime.value = String(hour).padStart(2, '0')
  return `${definitiveTime.value}h${paddedMinutes}AM`
}

// --- Time Difference

const timeDifference = ref(
  Object.values(GlobalStore.country2.value.citiesTime[selectedCity2.value]) -
    Object.values(GlobalStore.country1.value.citiesTime[selectedCity1.value]),
)

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
          <div v-if="GlobalStore.country1.value.citiesTime">
            <div v-for="(cities, i) in GlobalStore.country1.value.citiesTime" :key="cities">
              <p :class="{ selectedCity: i === selectedCity1 }" @click="selectCity(i, 1)">
                {{ Object.keys(cities).join() }}
              </p>
              <p>:</p>
              <p>
                {{ timeSet(parseInt(utcHour) + parseInt(Object.values(cities))) }}
              </p>
            </div>
          </div>

          <div v-if="GlobalStore.country2.value.citiesTime">
            <div v-for="(cities, i) in GlobalStore.country2.value.citiesTime" :key="cities">
              <p :class="{ selectedCity: i === selectedCity2 }" @click="selectCity(i, 2)">
                {{ Object.keys(cities).join() }}
              </p>
              <p>:</p>
              <p>
                {{ timeSet(parseInt(utcHour) + parseInt(Object.values(cities))) }}
              </p>
            </div>
          </div>
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
section > div {
  padding: 20px;
  background-color: white;
  border-radius: 20px;
  width: 30%;
  height: 180px;
}
section > div > div {
  display: flex;
  justify-content: space-between;
}
section > div > div > p:first-child,
section > div > div > p:last-child {
  flex: 2;
  text-align: center;
}
section > div > div > p:first-child:hover {
  cursor: pointer;
}

p {
  font-size: 22px;
}

.selectedCity {
  color: var(--orange-color-);
  font-weight: bold;
}
</style>
