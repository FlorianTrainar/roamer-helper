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

// Total definition

const definitiveTime = ref(null)

const timeSet = (hour) => {
  if (!displaySwitched.value) {
    if (hour > 23) {
      definitiveTime.value = hour - 24
    } else if (hour < 0) {
      definitiveTime.value = hour + 24
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
  Object.values(GlobalStore.country2.value.citiesTime[0]) -
    Object.values(GlobalStore.country1.value.citiesTime[0]),
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
          <div v-if="GlobalStore.country1.value">
            <div v-if="GlobalStore.country1.value.citiesTime">
              <p v-for="cities in GlobalStore.country1.value.citiesTime" :key="cities">
                Time in <span>{{ Object.keys(cities).join() }} </span> :
                {{ timeSet(parseInt(utcHour) + parseInt(Object.values(cities))) }}
              </p>
            </div>
          </div>

          <div v-if="GlobalStore.country2.value">
            <div v-if="GlobalStore.country2.value.citiesTime">
              <p v-for="cities in GlobalStore.country2.value.citiesTime" :key="cities">
                Time in <span>{{ Object.keys(cities).join() }} </span> :
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
p {
  font-size: 22px;
}
span {
  color: var(--orange-color-);
  font-weight: bold;
}
</style>
