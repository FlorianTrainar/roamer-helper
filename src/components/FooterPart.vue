<script setup></script>
<template>
  <footer>
    <nav>
      <p>Made by <a href="">Florian Trainar</a> with <a href="">Vue.js</a></p>
    </nav>
  </footer>
</template>
<style scoped>
footer {
  height: var(--header-heigth-);
  width: 100%;
  position: absolute;
  bottom: 0px;
  background: var(--header-gradient-);
  z-index: 1;
  text-align: center;
  line-height: var(--header-heigth-);
  box-shadow: 0 0 15px black;
}
</style>
