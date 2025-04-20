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
    sessionStorage.setItem('selectedCity1', i)
  } else if (num === 2) {
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
    } else {
      definitiveTime.value = String(hour).padStart(2, '0')

      return `${definitiveTime.value}h${paddedMinutes}`
    }

    // ---
  } else if (displaySwitched.value) {
    if (hour > 24) {
      definitiveTime.value = String(hour - 24).padStart(2, '0')
      return `${definitiveTime.value}h${paddedMinutes}am`
    } else if (hour > 12 && hour !== 24) {
      definitiveTime.value = String(hour - 12).padStart(2, '0')
      return `${definitiveTime.value}h${paddedMinutes}pm`
    } else if (hour === 12) {
      return `12h${paddedMinutes}pm`
    } else if (hour === 0 || hour === 24) {
      return `12h${paddedMinutes}am`
    }
  }
  definitiveTime.value = String(hour).padStart(2, '0')
  return `${definitiveTime.value}h${paddedMinutes}am`
}

// --- Time Difference
const timeDifference = ref(
  Object.values(GlobalStore.country2.value.citiesTime[selectedCity2.value]) -
    Object.values(GlobalStore.country1.value.citiesTime[selectedCity1.value]),
)

// Switch display

const switchDisplay = (boolean) => {
  // displaySwitched.value = boolean
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
            <div
              class="timeZone"
              v-for="(cities, i) in GlobalStore.country1.value.citiesTime"
              :key="cities"
              :class="{ selectedCity: i === selectedCity1 }"
              @click="selectCity(i, 1)"
            >
              <div>
                <p>
                  {{ Object.keys(cities).join() }}
                </p>
                <p>:</p>
                <p>
                  {{ timeSet(parseInt(utcHour) + parseInt(Object.values(cities))) }}
                </p>
              </div>
              <div>
                <p v-if="i === selectedCity1">
                  <span v-if="timeDifference > 0">
                    + {{ timeDifference }}h
                    <font-awesome-icon :icon="['fas', 'arrow-right']" />
                    {{ String(Object.keys(GlobalStore.country2.value.citiesTime[selectedCity2])) }}
                  </span>
                  <span v-if="timeDifference < 0">
                    - {{ String(timeDifference).slice(1) }}h
                    <font-awesome-icon :icon="['fas', 'arrow-right']" />
                    {{ String(Object.keys(GlobalStore.country2.value.citiesTime[selectedCity2])) }}
                  </span>
                  <span v-if="timeDifference === 0">
                    =
                    {{ String(Object.keys(GlobalStore.country2.value.citiesTime[selectedCity2])) }}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div v-if="GlobalStore.country2.value.citiesTime">
            <div
              class="timeZone"
              v-for="(cities, i) in GlobalStore.country2.value.citiesTime"
              :key="cities"
              :class="{ selectedCity: i === selectedCity2 }"
              @click="selectCity(i, 2)"
            >
              <div>
                <p>
                  {{ Object.keys(cities).join() }}
                </p>
                <p>:</p>
                <p>
                  {{ timeSet(parseInt(utcHour) + parseInt(Object.values(cities))) }}
                </p>
              </div>
              <div>
                <p v-if="i === selectedCity2">
                  <span v-if="timeDifference > 0">
                    - {{ String(timeDifference) }}h

                    <font-awesome-icon :icon="['fas', 'arrow-right']" />
                    {{ String(Object.keys(GlobalStore.country1.value.citiesTime[selectedCity1])) }}
                  </span>
                  <span v-if="timeDifference < 0">
                    + {{ String(timeDifference).slice(1) }}h
                    <font-awesome-icon :icon="['fas', 'arrow-right']" />
                    {{ String(Object.keys(GlobalStore.country1.value.citiesTime[selectedCity1])) }}
                  </span>
                  <span v-if="timeDifference === 0">
                    =
                    {{ String(Object.keys(GlobalStore.country1.value.citiesTime[selectedCity1])) }}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <button v-if="displaySwitched" @click="switchDisplay(false)">AM/PM</button>
        <button v-if="!displaySwitched" @click="switchDisplay(true)">AM/PM</button>
      </div>
    </div>
  </main>
</template>
<style scoped>
h1 {
  margin: 40px 0;
}
.content {
  /* gap: 40px; */
  position: relative;
}
section {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  position: relative;
  z-index: 2;
}
section > div {
  padding: 20px;
  background-color: rgb(233, 237, 239);
  border-radius: 20px;
  box-shadow: 0 0 5px black;
  width: 450px;
  height: 340px;
  margin-bottom: 40px;
}
.timeZone {
  display: flex;
  flex-direction: column;
  gap: 3px;
  border-radius: 20px;
  padding: 10px 0;

  cursor: pointer;
}
.timeZone > div:first-of-type {
  display: flex;
  font-family: monospace;
}
.timeZone > div:last-of-type {
  font-style: italic;
  font-family: monospace;
}
.timeZone > div > p:first-child,
.timeZone > div > p:last-child {
  flex: 2;
  text-align: center;
}

p {
  font-size: 22px;
}

.selectedCity {
  background: var(--header-gradient-);
  color: white;
  font-weight: bold;
}
.selectedCity span {
  font-weight: normal;
  font-size: 18px;
}
.selectedCity svg {
  color: white;
}

#timeDifference {
  position: absolute;
  background-color: rgb(233, 237, 239);
  width: 80px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  font-size: 30px;
  font-weight: bold;
  font-style: italic;
  border-radius: 25px;
  top: 255px;
  box-shadow: 0 0 5px black;
  z-index: 2;
}
.positive {
  color: rgb(3, 123, 3);
}
.negative {
  color: rgba(188, 4, 4, 0.967);
}
button {
  height: 50px;
  width: 100px;
  background-color: white;
  font-size: 20px;
  border-radius: 20px;
}

@media (max-width: 1080px) {
  section > div {
    width: 400px;
  }
}

@media (max-width: 900px) {
  h1 {
    margin: 20px 0 30px;
    font-size: 38px;
  }
  section {
    flex-direction: column;
    align-items: center;
  }
  section > div {
    width: 90%;
    padding: 15px;
    height: 240px;
    overflow: scroll;
    margin-bottom: 20px;
  }
  p {
    font-size: 18px;
  }
  .selectedCity span {
    font-size: 15px;
  }
}
@media (max-width: 600px) {
}
</style>
