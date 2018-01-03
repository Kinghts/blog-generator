<template>
  <div id="app">
    <background></background>
  </div>
</template>

<script>
import background from './components/background'
export default {
  name: 'app',
  data () {
    return {
      msg: 'welcome to my blog'
    }
  },
  components: {
    background: background
  }
}
</script>

<style>
  @import './assets/main.css';
  #app {
    width: 100%;
    height: 100%;
  }
</style>
