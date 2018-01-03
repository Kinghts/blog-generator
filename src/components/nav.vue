<template>
  <nav class="nav">
      <router-link :to="{ name: 'articleList' }">blog</router-link>
  </nav>
</template>

<script>
import ArticleList from './articleList'
export default {
  components: {
    articlelist: ArticleList
  }
}
</script>

<style scoped>
  .nav {
    width: 50%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: lightgray;
    border-radius: 5px;
  }
</style>

