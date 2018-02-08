<template>
    <nav class="pagination">
      <span @click="goToPrePage" :class="['pre-btn', { hide: hidePreBtn }]">&lt</span>
      <span @click="go(n)" v-for="n in range" :key="n" :class="['page-btn', { selected: n===currentPage }]">
        {{ n }}
      </span>
      <span @click="goToNextPage" :class="['next-btn', { hide: hideNextBtn }]">&gt</span>
    </nav>
</template>

<script>
export default {
  props: {
    totalItems: { // 总条目数，必选，整数
      type: Number, required: true
    },
    itemsPerPage: { // 每页显示的条目数，可选，默认5
      type: Number, default: 5
    },
    displayNum: { // 分页组件显示的分页选项数，可选，默认5
      type: Number, default: 5
    },
    startPage: { // 初始选中的页面,可选，默认1，表示第一页
      type: Number, default: 1
    }
  },
  data () {
    return {
      currentPage: 1, // 当前选中的页面
      range: [] // 分页组件显示的分页选项
    }
  },
  watch: {
    totalItems: function () {
      this.init()
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    hidePreBtn: function () { return this.$data.currentPage === 1 },
    hideNextBtn: function () { return  Math.ceil(this.$props.totalItems/this.$props.itemsPerPage) === this.$data.currentPage }
  },
  methods: {
    init() {
      let { totalItems, itemsPerPage, displayNum, startPage } = this.$props
      let range = this.$data.range
      // 检查参数是否越界
      let totalPage = Math.ceil(totalItems/itemsPerPage)
      if (totalItems!==0 && (startPage < 1 || startPage > totalPage)) {
        this.$emit('error', 'pagination组件： props中的startPage参数超出范围')
        return
      }
      // 清空分页选项
      range.splice(0)
      // 确定分页组件显示的分页选项
      if (totalItems <= itemsPerPage) { // 只有一页
        range.push(1)
      } else { // 多页
        let rangeStart = (Math.ceil(startPage/displayNum) - 1) * displayNum + 1
        range.push(...Array(displayNum).fill('n').map((v, i) => {return i + rangeStart}))
      }
      // 确定当前选中页
      this.$data.currentPage = startPage
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
    }
  }
}
</script>

<style scoped lang="less">
  .pagination {
    margin: 2rem 0;
    padding: 2rem;
    border-radius: .5rem;
    background-color: #FFF;
    text-align: center;
    span.pre-btn, span.page-btn, span.next-btn {
      margin: 1rem;
      padding: .5rem 1rem;
    }
    span.page-btn{
      border: 1px solid #97dffd;
      border-radius: .5rem;
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

