<template>
  <div>
    <h2 class="title">{{ article.name }}</h2>
    <div class="article-info">
      <span class="createAt">创建于 {{ article.createAt }}</span>
      <span class="updateAt">{{ article.updateAt }}</span>
    </div>
    <div class="content">
      {{ article.content }}
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

</style>
