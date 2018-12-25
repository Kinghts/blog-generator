<template>
  <section class="article-list">
    <article-cell v-for="(article, key) in showedArticles"
      :articleObj="article" :key="key"
      class="article" >
    </article-cell>
    <pagination
      @toPage="toPage" @error="paginationErrorHandler"
      :totalItems="articles.length" :itemsPerPage="articlePerPage"
      :displayNum="2" :startPage="currentPage"
      class="article-pagination">
    </pagination>
  </section>
</template>

<script>
import axios from "axios"
import { mapPath } from "../config"
import article from "./article"
import pagination from "./pagination"
export default {
  data() {
    return {
      articles: [ // 所有article
        /*
        {
          name: '',
          keywords: "",
          createAt: "",
          updateAt: "",
          path: "",
          routePath: "/"
        }*/
      ],
      showedArticles: [], // 当前页显示的article
      articlePerPage: 3,
      currentPage: 1
    }
  },
  mounted() {
    if (this.$route.params.pageNum) {
      this.$data.currentPage = parseInt(this.$route.params.pageNum)
    }
    axios
      .get(mapPath)
      .then(res => {
        let _data = res.data, articles = []
        for (let name in res.data) {
          let article = {
            'name': name,
            ..._data[name],
            'routePath': _data[name].path.substr(
              1,
              _data[name].path.lastIndexOf(".json") - 1
            )
          }
          articles.push(article)
        }
        articles.sort((a, b) => {
          let _a = new Date(a.createAt)
          let _b = new Date(b.createAt)
          if (_a < _b) {
            return 1
          } else if (_a > _b) {
            return -1
          }
          return 0
        })
        console.log(articles)
        this.$data.articles = articles
        this.$data.showedArticles.push(...this.getPageArticles(this.$data.currentPage, this.$data.articlePerPage, articles))
      })
      .catch(err => {
        alert(err)
        console.error(err)
      })
  },
  methods: {
    toPage(pageNum) {
      console.log("to page: " + pageNum)
      this.$router.push({ path: '/articleList/page/' + pageNum })
      this.$data.showedArticles.splice(0)
      this.$data.showedArticles.push(...this.getPageArticles(pageNum, this.$data.articlePerPage, this.$data.articles))
    },
    getPageArticles(currentPage, maxNum, articles) {
      return articles.slice((currentPage - 1) * maxNum, (currentPage - 1) * maxNum + maxNum)
    },
    paginationErrorHandler(err) {
      alert(err)
      console.error(err)
    }
  },
  components: {
    "article-cell": article,
    pagination: pagination
  }
};
</script>

<style scoped lang="less">
.article-list {
  display: flex;
  flex-direction: column;
}
</style>
