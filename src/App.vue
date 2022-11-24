<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <desktop/>
  <web-test/>
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from './components/HelloWorld.vue'
import desktop from './components/desktop/desktop'
import test from './components/desktop/test1'

customElements.define('web-test', test)

@Options({
  components: {
    HelloWorld,
    desktop
  }
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
