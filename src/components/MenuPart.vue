<script setup>
import { RouterLink } from 'vue-router'
import { inject } from 'vue'
const Store = inject('Store')
</script>
<template>
  <div class="appSelect">
    <RouterLink id="homeLink" :to="{ name: 'home' }" @click="$emit('display', false)"
      >{{ Store.homeText.value }} <font-awesome-icon :icon="['fas', 'home']"
    /></RouterLink>
    <RouterLink :to="{ name: 'translate' }" @click="$emit('display', false)"
      >{{ Store.translateText.value }} <font-awesome-icon :icon="['fas', 'book']"
    /></RouterLink>
    <RouterLink :to="{ name: 'currencies' }" @click="$emit('display', false)"
      >{{ Store.currenciesText.value }} <font-awesome-icon :icon="['fas', 'coins']"
    /></RouterLink>
    <RouterLink :to="{ name: 'time' }" @click="$emit('display', false)"
      >{{ Store.timeZoneText.value }} <font-awesome-icon :icon="['fas', 'clock']"
    /></RouterLink>
  </div>
</template>
<style scoped>
div {
  position: absolute;
  background-color: var(--select-color-);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-radius: 30px;
  box-shadow: 0 0 5px black;
  top: 66px;
  right: 42px;
  z-index: 5;
  padding: 20px 10px;
  /* width: 200px; */
}
.appSelect a {
  font-size: 26px;
  color: black;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
.appSelect a:hover {
  background: var(--orange-gradient-);
  color: white;
  /* font-weight: bold; */
}
.appSelect svg {
  color: var(--icon-color-);
}
#homeLink {
  display: none;
}

@media (max-width: 600px) {
  #homeLink {
    display: flex;
  }
}
</style>
