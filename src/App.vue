<template>
  <div id="app">
    <background></background>
    <wrapper class="wrapper"></wrapper>
    <navigator class="nav"></navigator>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
import background from './components/background'
import nav from './components/nav'
import wrapper from './components/wrapper'
export default {
  name: 'app',
  components: {
    background: background,
    navigator: nav,
    wrapper: wrapper
  }
}
</script>

<style lang="less">
  @import './assets/main.css';
  #app {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    .wrapper {
      height: 200px;
      width: 100%;
    }
    .nav {
      position: fixed;
      top: 0;
      left: 0;
    }
    .view {
      position: relative;
      z-index: 10;
    }
  }
</style>
