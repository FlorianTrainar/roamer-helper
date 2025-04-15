<script setup>
import { ref, inject } from 'vue'
import translate from 'translate'
import { countries } from '@/assets/javascript/countries'

const GlobalStore = inject('GlobalStore')

const langage1 = ref('')
const text1 = ref('')
const langage2 = ref('')
const text2 = ref('')

if (sessionStorage.getItem('text1')) {
  text1.value = sessionStorage.getItem('text1')
}
if (sessionStorage.getItem('text2')) {
  text2.value = sessionStorage.getItem('text2')
}

const handle = async () => {
  langage1.value = GlobalStore.country1.value.code
  langage2.value = GlobalStore.country2.value.code

  if (text1.value) {
    const text = await translate(text1.value, { from: langage1.value, to: langage2.value })
    console.log(text)
    text2.value = text
  } else if (text2.value) {
    const text = await translate(text2.value, { from: langage2.value, to: langage1.value })
    console.log(text)
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
            <div>
              <h2>{{ GlobalStore.country1.value.langage }}</h2>
              <textarea
                name=""
                id=""
                cols="60"
                rows="10"
                v-model="text1"
                @input="inputRefresh(1)"
              ></textarea>
            </div>
            <div>
              <h2>{{ GlobalStore.country2.value.langage }}</h2>
              <textarea
                name=""
                id=""
                cols="60"
                rows="10"
                v-model="text2"
                @input="inputRefresh(2)"
              ></textarea>
            </div>
          </div>
          <button class="handleButton" @:click="handle">Translate</button>
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
form {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
form > div {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
form > div > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
textarea {
  width: 90%;
  font-size: 17px;
  resize: none;
}
</style>
