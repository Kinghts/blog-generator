<template>
  <div id="app">
    <!--background></background-->
    <header class="header">
      <navigator class="nav"></navigator>
      <wrapper class="wrapper"></wrapper>
    </header>
    <main class="main">
      <router-view class="view"></router-view>
    </main>
    <footer class="footer">
      <div class="footer-image"></div>
      <div class="footer-inner">
        本博客参考<a href="https://diygod.me">diygod.me</a>的设计，在此表示感谢.
      </div>
    </footer>
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
  @import './assets/main.less';
  #app {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .header {
      position: relative;
      width: 100%;
      .nav {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
      }
      .wrapper {
        height: 600px;
        width: 100%;
      }
    }
    .main {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .footer {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .footer-image {
        width: 100%;
        height: 400px;
        background-image: url(./assets/img/footer-image.jpg);
        background-size: cover;
        background-position: center 50%;
        background-repeat: no-repeat;
      }
      .footer-inner {
        padding: 10px;
        color: #888;
        background-color: #232323;
        text-align: center;
        a {
          color: #795548;
        }
      }
    }
  }
</style>
