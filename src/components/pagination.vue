<template>
    <nav class="pagination">
      <span @click="goToPrePage" :class="['pre-btn', { hide: hide==='pre' }]">&lt</span>
      <span @click="go(n)" v-for="n in range" :key="n" :class="['page-btn', { selected: n===currentPage }]">
        {{ n }}
      </span>
      <span @click="goToNextPage" :class="['next-btn', { hide: hide==='next' }]">&gt</span>
    </nav>
</template>

<script>
export default {
  props: ['start', 'totalSize', 'pageSize', 'current'],
  data () {
    return {
      currentPage: 0,
      range: []
    }
  },
  watch: {
    totalSize: function () {
      this.init()
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    hide: function () {
      if (parseInt(this.$props.start) === this.$data.currentPage) {
        return 'pre'
      }
      if (parseInt(this.$props.start) + parseInt(this.$props.totalSize) - 1 === this.$data.currentPage){
        return 'next'
      }
      return ''
    }
  },
  methods: {
    init() {
      let totalSize = this.$props.totalSize
      let pageSize = this.$props.pageSize
      this.$data.currentPage = this.$props.current ? this.$props.current : this.$props.start
      let start, range, index = totalSize - pageSize + 1
      if (this.$data.currentPage > index && index >= 1) { // 以currentPage为起点时超出范围
        start = index
      } else {
        start = this.$data.currentPage
      }
      this.$data.range = Array(pageSize).fill('n').map((v, i) => {return i + start})
    },
    goToPrePage () {
      let current = this.$data.currentPage--
      let range = this.$data.range
      if (current === this.$data.range[0] && current !== this.$props.start) {
        range.pop()
        range.unshift(current - 1)
      }
      this.$emit('toPage', current - 1)
    },
    go (page) {
      this.$data.currentPage = page
      this.$emit('toPage', page)
    },
    goToNextPage () {
      let _props = this.$props, _data = this.$data
      let current = _data.currentPage++
      let range = _data.range
      if (current === _data.range[range.length - 1] && current !== _props.totalSize + _props.start - 1) {
        range.shift()
        range.push(current + 1)
      }
      this.$emit('toPage', current + 1)
    },
    inRange (totalSize, curent) {
      return 1 <= current && current <= totalSize
    }
  }
}
</script>

<style scoped lang="less">
  .pagination {
    max-width: 100%;
    margin: 20px;
    padding: 20px;
    border-radius: 5px;
    background-color: #FFF;
    text-align: center;
    span.pre-btn, span.page-btn, span.next-btn {
      margin: 10px;
      padding: 5px 10px;
    }
    span.page-btn{
      border: 1px solid #97dffd;
      border-radius: 5px;
    }
    span.page-btn:hover {
      background-color: #97dffd;
    }
    span:hover {
      cursor: pointer;
    }
    span.selected {
      background-color: #97dffd;
    }
  }
</style>

