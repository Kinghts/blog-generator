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
      navClass: 'nav-show'
    }
  }
}
</script>

<style lang="less" scoped>
  @bg-color: rgba(40, 42, 44, 0.6);
  .nav {
    display: flex;
    background-color: @bg-color;
    width: 100%;
    height: 3.8rem;
    line-height: 3.8rem;
    font-size: 1.5rem;
    .link {
      display: block;
      padding: 0 3.8rem;
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

