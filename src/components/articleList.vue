<template>
  <ul class="article-list">
    <li class="article" :key="key" v-for="(article, key) in articles">
      <router-link class="title" :to="{ path: article.routePath }">{{ key }}</router-link>
      <span class="time">{{ article.createAt }}</span>
    </li>
  </ul>
</template>

<script>
import axios from 'axios'
import { mapPath } from '../config'
export default {
  data () {
    return {
        articles: {
          'aaa': {
          createAt: '',
          updateAt: '',
          path: '',
          routePath: '/'
        }
      }
    }
  },
  mounted () {
    axios.get(mapPath)
      .then((res) => {
        let _articles = res.data
        for (let name in res.data) {
          let article = _articles[name]
          article.routePath = article.path.substr(1, article.path.lastIndexOf('.json') - 1)
          console.log(article.path)
        }
        this.$data.articles = res.data
      })
      .catch(err => {
        alert(err)
        console.log(err)
      })
  }
}
</script>

<style scoped>
  .article-list {
    border: 1px solid black;
    border-radius: 5px;
    width: 80%;
    padding: 20px;
    background-color: #ddd;
    display: flex;
  }
  .article {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .title {
    font-size: 28px;
    font-weight: 700;
    line-height: 1.5;
  }
  .time {
    padding: 12px 0;
  }
</style>
