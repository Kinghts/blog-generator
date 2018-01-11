<template>
  <section class="article-list">
    <article-cell :name="key" :articleObj="article" class="article" :key="key" v-for="(article, key) in articles">
    </article-cell>
  </section>
</template>

<script>
import axios from 'axios'
import { mapPath } from '../config'
import article from './article'
export default {
  data () {
    return {
        articles: {
          [Symbol()]: {
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
        }
        this.$data.articles = res.data
      })
      .catch(err => {
        alert(err)
        console.log(err)
      })
  },
  components: {
    'article-cell': article
  }
}
</script>

<style scoped>
  .article-list {
    border-radius: 5px;
    display: flex;
    flex-direction: column;
  }
</style>
