import Vue from 'vue'
import Nav from './components/nav'
import Article from './components/article'
import ArticleList from './components/articleList'
import App from './App'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

new Vue({
  el: '#app',
  render: h => h(App),
  router: new VueRouter({
    mode: 'history',
    routes: [
      { path: '/', name: 'index', component: Nav },
      { path: '/articleList', name: 'articleList', component: ArticleList },
      { path: '/article/*', name: 'article', component: Article }
    ]
  })
})
