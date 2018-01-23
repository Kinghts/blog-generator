<template>
  <article class="article">
    <header class="article-header">
      <h1 class="article-title">
        <router-link :to="{ path: article.routePath }">{{ article.name }}</router-link>
      </h1>
      <div class="article-info">
        <span class="createAt">创建于 {{ article.createAt }}</span>
        <!--span class="updateAt">{{ article.updateAt }}</span-->
        <span class="tag">标签: {{ article.keywords }}</span>
      </div>
    </header>
    <div class="article-body">
      <!--简介-->
      <div v-if="!article.content" v-html="article.brief" class="content"></div>
      <!--全文-->
      <div v-else v-html="article.content" class="content"></div>
    </div>
    <footer class="article-footer">
      <router-link v-if="article.routePath" :to="{ path: article.routePath }">阅读全文 »</router-link>
    </footer>
  </article>
</template>

<script>
import axios from 'axios'
export default {
  props: ['name', 'articleObj'],
  data () {
    return {
      article: {
        name: '',
        keywords: '',
        createAt: '',
        updateAt: '',
        brief: '',
        content: '',
        path: '',
        routePath: ''
      }
    }
  },
  mounted () {
    if (this.$props.articleObj) { // 在博客首页
      Object.assign(this.$data.article, this.$props.articleObj)
      this.$data.article.name = this.$props.name
      axios.get(this.$data.article.path).then(res => {
        this.$data.article.brief = res.data.brief
      }).catch(err => {
        alert(err)
        console.error(err)
      })
    } else { // 文章页
      axios(this.$route.path + '.json').then(res => {
        this.$data.article = res.data
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
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 772px;
    margin: 20px;
    padding: 40px;
    border-radius: 5px;
    color: #bbb;
    background-color: #FFF;
    .article-header {
      .article-title {
        text-align: center;
        font-size: 25px;
        color: #444;
        font-weight: 700;
        a {
          color: #444;
          text-decoration: none;
        }
      }
      .article-info {
        font-size: 14px;
        color: #555;
      }
    }
    .article-body {
      margin: 10px 0;
      .content {
        font-size: 14px;
        color: #555;
      }
    }
    .article-footer {
      a {
        border-radius: 5px;
        padding: 5px 15px;
        color: #FFF;
        font-size: 13px;
        background-color: #97dffd;
        text-decoration: none;
        &:hover {
          background-color: rgba(0, 149, 255, 0.2);
        }
      }
    }
  }
</style>
