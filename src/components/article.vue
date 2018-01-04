<template>
  <div class="article">
    <div v-html="article.content" class="content">
    </div>
    <div class="article-info">
      <span class="createAt">创建于 {{ article.createAt }}</span>
      <span class="updateAt">{{ article.updateAt }}</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      article: {
        name: '',
        createAt: '',
        updateAt: '',
        content: ''
      }
    }
  },
  mounted () {
    axios.get(this.$route.path + '.json')
      .then(res => {
        this.$data.article = res.data
      })
      .catch(err => {
        alert(err)
      })
  }
}
</script>

<style scoped>
  .article {
    display: flex;
    align-items: center;
    flex-direction: column;
    flex: 1;
    margin: 20px;
    padding: 10px;
    border-radius: 5px;
    max-width: 1200px;
    background-color: #555;
    color: #bbb;
  }
</style>
