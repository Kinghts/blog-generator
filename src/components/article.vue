<template>
  <article class="article">
    <div class="article-date">
      {{ article.createAt }}
    </div>
    <header class="article-header">
      <h1 class="article-title">
        <router-link :to="{ path: article.routePath }">{{ article.name }}</router-link>
      </h1>
      <div class="article-info">
        <!--span class="updateAt">{{ article.updateAt }}</span-->
        <span class="tag">标签: {{ article.keywords }}</span>
      </div>
    </header>
    <div class="article-body">
      <!--简介-->
      <div v-if="!article.content" v-html="article.brief" class="content"></div>
      <!--全文-->
      <div v-else v-html="article.content" class="content code"></div>
    </div>
    <footer class="article-footer">
      <router-link v-if="article.routePath" :to="{ path: article.routePath }">阅读全文 »</router-link>
    </footer>
  </article>
</template>

<script>
import axios from 'axios'
export default {
  props: ['articleObj'],
  data () {
    return {
      article: {
        name: '',
        keywords: '',
        createAt: '',
        updateAt: '',
        brief: '', // 需要单独请求
        content: '', // 需要单独请求
        path: '',
        routePath: ''
      }
    }
  },
  watch: {
    articleObj: function (newArticle) { // 分页组件切换时，有些article不会重新初始化
      this.initArticleWithBrief()
    }
  },
  mounted () {
    if (this.$props.articleObj) { // 在博客首页
      this.initArticleWithBrief()
    } else { // 文章页
      axios(this.$route.path + '.json').then(res => {
        this.$data.article = res.data
      }).catch(err => {
        alert(err)
        console.error(err)
      })
    }
  },
  methods: {
    initArticleWithBrief() {
      Object.assign(this.$data.article, this.$props.articleObj)
      axios.get(this.$data.article.path).then(res => {
        this.$data.article.brief = res.data.brief
      }).catch(err => {
        alert(err)
        console.error(err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .article {
    position: relative;
    display: flex;
    align-items: center;
    align-self: stretch;
    flex-direction: column;
    margin: 2rem 0;
    padding: 5rem 10rem;
    border-radius: .5rem;
    box-shadow: 2px 2px 15px #e2e4e9;
    color: #bbb;
    background-color: #a0a0a0;
    .article-date {
      position: absolute;
      top: 0;
      right: 0;
      color: black;
      background-color: lightsalmon;
      width: 80px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-radius: 0 0 0 30px;
      font-size: 14px;
      box-shadow: 2px 2px #999;
    }
    .article-header {
      .article-title {
        text-align: center;
        font-size: 2.5rem;
        margin: 0;
        color: #444;
        font-weight: 700;
        a {
          color: #444;
          text-decoration: none;
        }
      }
      .article-info {
        font-size: 1.2rem;
        color: #555;
        text-align: center;
      }
    }
    .article-body {
      margin: 10px 0;
      .content {
        font-size: 1.4rem;
        color: #555;
      }
    }
    .article-footer {
      a {
        border-radius: .5rem;
        padding: .5rem 1.5rem;
        color: #FFF;
        font-size: 1.3rem;
        background-color: #97affd;
        text-decoration: none;
        &:hover {
          background-color: rgba(0, 149, 255, 0.2);
        }
      }
    }
  }
</style>
