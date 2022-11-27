<template>
  <desktop/>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import desktop from '@/components/desktop/index';


@Options({
  components: {
    desktop
  },
})
export default class App extends Vue {
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
