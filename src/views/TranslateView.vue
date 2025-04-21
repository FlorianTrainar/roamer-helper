<script setup>
import { ref, inject } from 'vue'
import translate from 'translate'
import { useRouter } from 'vue-router'

import { countries } from '@/assets/javascript/countries'

const router = useRouter()

const GlobalStore = inject('GlobalStore')

const langage1 = ref('')
const langage1Selected = ref(0)
const langage2 = ref('')
if (sessionStorage.getItem('langage1Selected')) {
  langage1Selected.value = parseInt(sessionStorage.getItem('langage1Selected'))
}
const langage2Selected = ref(0)
if (sessionStorage.getItem('langage2Selected')) {
  langage2Selected.value = parseInt(sessionStorage.getItem('langage2Selected'))
}
const text1 = ref('')

const text2 = ref('')

if (sessionStorage.getItem('text1')) {
  text1.value = sessionStorage.getItem('text1')
}
if (sessionStorage.getItem('text2')) {
  text2.value = sessionStorage.getItem('text2')
}

const selectLangage = (i, num) => {
  if (num === 1) {
    langage1Selected.value = i
    sessionStorage.setItem('langage1Selected', i)
  } else if (num === 2) {
    langage2Selected.value = i
    sessionStorage.setItem('langage2Selected', i)
  }

  // router.go()
}

const handle = async () => {
  langage1.value = String(Object.values(GlobalStore.country1.value.langage[langage1Selected.value]))
  langage2.value = String(Object.values(GlobalStore.country2.value.langage[langage2Selected.value]))

  if (text1.value) {
    const text = await translate(text1.value, {
      from: langage1.value,
      to: langage2.value,
    })
    // console.log(langage1.value)
    text2.value = text
  } else if (text2.value) {
    const text = await translate(text2.value, { from: langage2.value, to: langage1.value })
    // console.log(text)
    text1.value = text
  }
}
const inputRefresh = (num) => {
  if (num === 1) {
    text2.value = ''
    sessionStorage.setItem('text1', text1.value)
  }
  if (num === 2) {
    text1.value = ''
    sessionStorage.setItem('text2', text2.value)
  }
}
</script>

<template>
  <main>
    <div class="wrapper">
      <section class="content">
        <h1>Translator</h1>

        <form @submit.prevent="translate">
          <div>
            <section>
              <div class="langageList">
                <h2
                  v-for="(langage, i) in GlobalStore.country1.value.langage"
                  :key="langage"
                  :class="{
                    langageSelected: i === langage1Selected,
                  }"
                  @click="(selectLangage(i, 1), inputRefresh(2))"
                >
                  {{ String(Object.keys(langage)) }}
                </h2>
              </div>

              <textarea
                name=""
                id=""
                cols="60"
                rows="15"
                v-model="text1"
                @input="inputRefresh(1)"
                @keyup.enter="handle"
                @blur="handle"
              ></textarea>
            </section>
            <section>
              <div class="langageList">
                <h2
                  v-for="(langage, i) in GlobalStore.country2.value.langage"
                  :key="langage"
                  :class="{
                    langageSelected: i === langage2Selected,
                  }"
                  @click="(selectLangage(i, 2), inputRefresh(1))"
                >
                  {{ String(Object.keys(langage)) }}
                </h2>
              </div>
              <textarea
                name=""
                id=""
                cols="60"
                rows="15"
                v-model="text2"
                @input="inputRefresh(2)"
                @keyup.enter="handle"
                @blur="handle"
              ></textarea>
            </section>
          </div>
          <!-- <button class="handleButton" @:click="handle">Translate</button> -->
        </form>
      </section>
    </div>
    <!-- <section class="test">
      <p>Langue 1 = {{ GlobalStore.country1 }} === {{ langage1 }}</p>
      <p>text 1 = {{ text1 }}</p>
      <p>Langue 2 = {{ GlobalStore.country2 }} === {{ langage2 }}</p>
      <p>text 2 = {{ text2 }}</p>
      <p>countries = {{ countries }}</p>
    </section> -->
  </main>
</template>
<style scoped>
h1 {
  margin: 40px 0 60px;
}
form {
  margin-top: 30px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
form > div {
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: space-evenly;
  margin: 0 30px;
}
form > div > section {
  display: flex;
  flex-direction: column;
  flex: 1;

  position: relative;
  z-index: 2;
}
.langageList {
  display: flex;
  position: absolute;
  z-index: -1;
  top: -40px;
  left: 4px;
}
.langageList > h2 {
  padding: 10px;
  font-style: italic;
  border-radius: 20px 20px 0 0;
  font-size: 22px;
}
.langageList:hover {
  cursor: pointer;
}
.langageSelected {
  background-color: white;
  color: var(--orange-color-);
  box-shadow: 0 0px 5px black;
}
textarea {
  width: 100%;
  font-size: 17px;
  resize: none;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 1px 5px black;
  font-family: monospace;
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
    gap: 60px;
  }
  textarea {
    height: 200px;
  }
}
</style>
