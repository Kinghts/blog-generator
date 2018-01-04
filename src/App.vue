<template>
  <div id="app">
    <background></background>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
import background from './components/background'
export default {
  name: 'app',
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
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .view {
    position: relative;
    z-index: 10;
  }
</style>
