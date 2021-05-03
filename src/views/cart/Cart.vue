<template>
  <div>
    <nav-bar class="cart-nav"><div slot="center">购物车({{length}})</div></nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {mapGetters} from 'vuex'
export default {
  name:'Cart',
  components: {
    NavBar
  },
  computed: {
    //鸡肋
    //...mapGetters(['cartLength','cartList'])
    ...mapGetters({
      length: 'cartLength',
      list: 'cartList'
    })
  }
}
</script>

<style scoped>
  .cart-nav{
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>
