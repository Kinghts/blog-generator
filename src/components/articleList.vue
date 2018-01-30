<template>
  <section class="article-list">
    <article-cell :name="key" :articleObj="article" class="article" :key="key" v-for="(article, key) in articles">
    </article-cell>
    <pagination
      @toPage="toPage"
      :start="1" :total-size="5" :page-size="3" :current="1"
      class="article-pagination">
    </pagination>
  </section>
</template>

<script>
import axios from 'axios'
import { mapPath } from '../config'
import article from './article'
import pagination from './pagination'
export default {
  data () {
    return {
        articles: {
          [Symbol()]: {
          keywords: '',
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
  methods: {
    toPage (num) {
      console.log('to page: ' + num)
    }
  },
  components: {
    'article-cell': article,
    'pagination': pagination
  }
}
</script>

<style scoped>
  .article-list {
    display: flex;
    flex-direction: column;
  }
</style>
