<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <div class="appSelect">
    <RouterLink :to="{ name: 'translate' }" @click="$emit('display', false)"
      >Translate <font-awesome-icon :icon="['fas', 'book']"
    /></RouterLink>
    <RouterLink :to="{ name: 'currencies' }" @click="$emit('display', false)"
      >Currencies <font-awesome-icon :icon="['fas', 'coins']"
    /></RouterLink>
    <RouterLink :to="{ name: 'time' }" @click="$emit('display', false)"
      >Time Zone <font-awesome-icon :icon="['fas', 'clock']"
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
  width: 200px;
}
.appSelect a {
  font-size: 26px;
  color: black;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
.appSelect a:hover {
  background: var(--orange-gradient-);
  color: white;
  /* font-weight: bold; */
}
.appSelect svg {
  color: var(--icon-color-);
}
</style>
