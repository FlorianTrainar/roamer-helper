<script setup>
import { ref, inject } from 'vue'
import translate from 'translate'
import { countries } from '@/assets/javascript/countries'

const GlobalStore = inject('GlobalStore')

const langage1 = ref('')
const text1 = ref('')
const langage2 = ref('')
const text2 = ref('')

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
</script>

<template>
  <main>
    <div class="wrapper">
      <h1>Translator</h1>
      <section class="translate">
        <form @submit.prevent="translate">
          <div>
            <div>
              <textarea name="" id="" cols="60" rows="3" v-model="text1"></textarea>
            </div>
            <div>
              <textarea name="" id="" cols="60" rows="3" v-model="text2"></textarea>
            </div>
          </div>
          <button @:click="handle">Translate</button>
        </form>
      </section>
    </div>
    <section class="test">
      <p>Langue 1 = {{ GlobalStore.country1 }} === {{ langage1 }}</p>
      <p>text 1 = {{ text1 }}</p>
      <p>Langue 2 = {{ GlobalStore.country2 }} === {{ langage2 }}</p>
      <p>text 2 = {{ text2 }}</p>
      <p>countries = {{ countries }}</p>
    </section>
  </main>
</template>
<style scoped>
/* textarea {
  border: none;
  background: none;
} */
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
form > div {
  display: flex;
  justify-content: space-between;
}
/* form > div > div {
  background-color: white;
  border: 1px solid black;
  width: 49%;
} */
button {
  width: 100px;
  align-self: center;
  font-size: 16px;
  padding: 10px;
  border-radius: 20px;
  background-color: var(--background-color-);
}
</style>
