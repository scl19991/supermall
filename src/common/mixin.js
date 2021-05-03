import { debounce } from './utils'
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    //1.监听图片加载完成 不要放在created 可能拿不到
    const refresh = debounce(this.$refs.scroll.refresh, 500)
      //对监听的事件进行保存
    this.ItemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImgLoad', this.ItemImgListener)
  }
}
import BackTop from 'components/content/backTop/BackTop'
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isplay: false
    }
  },
  methods: {
    backClick() {
      //回到顶部
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
  }
}