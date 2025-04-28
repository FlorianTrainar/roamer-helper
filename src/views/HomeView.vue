<script setup>
import { ref, inject, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import translate from 'translate'
import { countries } from '@/assets/javascript/countries'

const GlobalStore = inject('GlobalStore')

const router = useRouter()

const country1 = ref('')
const country2 = ref('')

const homeText = ref('Home')
const welcomeText = ref('Welcome to')
const translateText = ref('Translator')
const currenciesText = ref('Currencies')
const timeZoneText = ref('Time Zones')
onMounted(async () => {
  if (GlobalStore.country1.value.langage[0] && GlobalStore.country1.value.langage[0] !== 'en')
    try {
      homeText.value = await translate(homeText.value, {
        from: 'en',
        to: String(Object.values(GlobalStore.country1.value.langage[0])),
      })
      welcomeText.value = await translate(welcomeText.value, {
        from: 'en',
        to: String(Object.values(GlobalStore.country1.value.langage[0])),
      })
      translateText.value = await translate(translateText.value, {
        from: 'en',
        to: String(Object.values(GlobalStore.country1.value.langage[0])),
      })
      currenciesText.value = await translate(currenciesText.value, {
        from: 'en',
        to: String(Object.values(GlobalStore.country1.value.langage[0])),
      })
      timeZoneText.value = await translate(timeZoneText.value, {
        from: 'en',
        to: String(Object.values(GlobalStore.country1.value.langage[0])),
      })
    } catch (error) {
      console.log(error)
    }
})

const updateCountry = (num) => {
  if (num === 1) {
    $cookies.set('country1', country1.value)
  } else if (num === 2) {
    $cookies.set('country2', country2.value)
  }
}
const start = () => {
  router.go()
}
</script>
<template>
  <main>
    <div class="wrapper">
      <div class="content">
        <div>
          <h1>{{ welcomeText }}</h1>

          <img
            src="https://res.cloudinary.com/dnq2ftd45/image/upload/v1745180314/Logo_RH_l7w2dc.png"
            alt=""
          />
        </div>

        <div
          v-if="!GlobalStore.country1.value || !GlobalStore.country2.value"
          class="countrySelectZone"
        >
          <h2>Please select your country and your destination to start</h2>
          <div>
            <section>
              <select
                class="countrySelector"
                id="country1"
                v-model="country1"
                @change="updateCountry(1)"
              >
                <option value="" hidden>Your country</option>
                <option v-for="countries in countries" :key="countries.country" :value="countries">
                  {{ countries.country }}
                </option>
              </select>
            </section>
            <button class="starter" v-if="country1 && country2" @click="start">START</button>
            <section>
              <select
                class="countrySelector"
                name="langage2"
                id=""
                v-model="country2"
                @change="updateCountry(2)"
              >
                <option value="" hidden>Your destination</option>
                <option v-for="countries in countries" :key="countries.country" :value="countries">
                  {{ countries.country }}
                </option>
              </select>
            </section>
          </div>
        </div>

        <!-- --- -->

        <div v-if="GlobalStore.country1.value && GlobalStore.country2.value" class="appSelect">
          <RouterLink :to="{ name: 'translate' }"
            >{{ translateText }} <font-awesome-icon :icon="['fas', 'book']" />
          </RouterLink>

          <RouterLink :to="{ name: 'currencies' }">
            {{ currenciesText }} <font-awesome-icon :icon="['fas', 'coins']" />
          </RouterLink>

          <RouterLink :to="{ name: 'time' }">
            {{ timeZoneText }} <font-awesome-icon :icon="['fas', 'clock']" />
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
h1 {
  margin: 40px 0;
  width: 100%;
}
.content > div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
img {
  width: 400px;
}

/* --- */

.countrySelectZone {
  display: flex;
  flex-direction: column;
  margin: 30px 0;
}
.countrySelectZone > div {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin: 40px 0;
}
.starter {
  background-color: white;
  width: 60px;
  height: 60px;
}

/* --- */

.appSelect {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 60px 0 40px;
}

.appSelect a,
.countrySelector {
  border-radius: 20px;
  font-size: 26px;
  background-color: white;
  box-shadow: 0 0 10px black;
  padding: 10px 15px;
  color: black;
}
.appSelect a:hover,
.countrySelector:hover {
  background: var(--orange-gradient-);
  color: white;
  /* font-weight: bold; */
}
.appSelect svg {
  color: var(--icon-color-);
}

/* --- */
/* Media Query */
/* --- */

@media (max-width: 900px) {
  h2 {
    text-align: center;
    font-size: 28px;
    padding: 0 10px;
  }
}

@media (max-width: 600px) {
  h2 {
    font-size: 22px;
  }
  img {
    width: 350px;
  }
  .countrySelectZone > div,
  .appSelect {
    flex-direction: column;
    align-items: center;
  }
  .countrySelectZone > div {
    margin: 20px;
  }
}
@media (max-width: 460px) {
  img {
    width: 300px;
  }
}
</style>
