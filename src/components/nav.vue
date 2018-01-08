<template>
  <nav class="nav">
    <router-link class="link" :to="{ name: 'articleList' }">首页</router-link>
    <router-link class="link" :to="{ name: 'articleList' }">实验室</router-link>
  </nav>
</template>

<script>
export default {
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
</style>

