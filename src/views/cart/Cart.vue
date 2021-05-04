<template>
  <div class="cart">
    <nav-bar class="cart-nav"><div slot="center">购物车({{length}})</div></nav-bar>
    <!-- 商品的列表 -->
    <scroll class="content" ref="scroll">
    <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
    <!-- 底部汇总 -->
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {mapGetters} from 'vuex'
import CartList from './childComps/CartList'
import Scroll from 'components/common/scroll/Scroll'
import CartBottomBar from './childComps/CartBottomBar'
export default {
  name:'Cart',
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar
  },
  computed: {
    //鸡肋
    //...mapGetters(['cartLength','cartList'])
    ...mapGetters({
      length: 'cartLength',
      list: 'cartList'
    })
  },
  activated () {
    //解决购物车莫名其妙不能滑动的问题： 购物车有了新的数据要刷新scroll才知道！！！
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  .cart-nav{
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
  .cart{
    height: 100vh;
  }

  .content{
    height: calc(100% - 133px);
    overflow: hidden;
  }
</style>
