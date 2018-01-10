<template>
  <nav :class="['nav', navClass]">
    <router-link class="link" :to="{ name: 'articleList' }">首页</router-link>
    <router-link class="link" :to="{ name: 'articleList' }">实验室</router-link>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      navClass: 'nav-show',
      scrollListener: null
    }
  },
  mounted () {
    this.$data.scrollListener = this.generateScrollListener()
    window.addEventListener('scroll', this.$data.scrollListener)
  },
  methods: {
    generateScrollListener () {
      let lastScrollY = 0, _m = this
      return function hideOnScroll(e) {
        _m.$data.navClass = lastScrollY >= window.scrollY ? 'nav-show' : 'nav-hide'
        lastScrollY = window.scrollY
      }
    }
  },
  beforeDestory () {
    window.removeEventListener('scroll', this.$data.scrollListener)
  }
}
</script>

<style lang="less" scoped>
  @bg-color: rgba(40, 42, 44, 0.6);
  .nav {
    display: flex;
    background-color: @bg-color;
    width: 100%;
    height: 38px;
    line-height: 38px;
    .link {
      display: block;
      padding: 0 38px;
      color: #fff;
      &:link {
        text-decoration: none;
      }
      &:hover {
        color: @bg-color;
        background-color: #fff;
      }
    }
  }
  .nav-show {
    transform: none;
    transition: transform 300ms ease;
  }
  .nav-hide {
    transform: translateY(-100%);
    transition: transform 300ms ease;
  }
</style>

