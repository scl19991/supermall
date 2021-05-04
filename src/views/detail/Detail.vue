<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="navbar"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comments"/>
      <goods-list :goods="recommends" ref="recommends"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isplay"></back-top>
    <detail-bottom-bar @addToCart="addToCart"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
import {itemListenerMixin, backTopMixin} from 'common/mixin'
import GoodsList from 'components/content/goods/GoodsList'

export default {
  name:'Detail',
  data(){
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTops: [],
      currentIndex: 0
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll
    
  },
  mixins: [itemListenerMixin, backTopMixin],
  created () {
    //1.保存传入的iid
    this.iid = this.$route.params.iid

    //2.根据iid请求详情数据
    getDetail(this.iid).then(res =>{
      //1.获取顶部的图片轮播数据
      const data = res.result
      this.topImages = res.result.itemInfo.topImages

      //2.获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      //3.创建店铺信息对象
      this.shop = new Shop(data.shopInfo)

      //4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      //5.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      //6.去除评论的信息
      if(data.rate.cRate !== 0 ){
        this.commentInfo = data.rate.list[0]
      }
      //渲染完成后调用  图片加载！！！！死坑
      //渲染出了DOM 但是图片并没有渲染出来
      // this.$nextTick(()=>{
      //   this.themeTops= []
      //   this.themeTops.push(0)
      //   this.themeTops.push(this.$refs.params.$el.offsetTop-44)
      //   this.themeTops.push(this.$refs.comments.$el.offsetTop-44)
      //   this.themeTops.push(this.$refs.recommends.$el.offsetTop-44)
      // })
    })
  
    //3.请求推荐数据
    getRecommend().then(res =>{
      this.recommends = res.data.list
    })
  
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
      this.themeTops= []
      this.themeTops.push(0)
      this.themeTops.push(this.$refs.params.$el.offsetTop-44)
      this.themeTops.push(this.$refs.comments.$el.offsetTop-44)
      this.themeTops.push(this.$refs.recommends.$el.offsetTop-44)
      this.themeTops.push(Number.MAX_VALUE)
      console.log(this.themeTops);
    },
    titleClick(index){
      console.log(index);
      this.$refs.scroll.scrollTo(0,-this.themeTops[index],300)
    },
    contentScroll(position){
      //1.获取y值
      const positionY = -position.y
      if(positionY > 1000){
        this.isplay =true
      }else{
        this.isplay =false
      }
      //2.和this.themeTops元素做对比
      let length = this.themeTops.length
      for(let i = 0;i < length; i++){
        if(this.currentIndex != i && ( positionY >= this.themeTops[i] && positionY < this.themeTops[i+1])){
          this.currentIndex = i
          this.$refs.navbar.currentIndex = this.currentIndex
        }
      }
    },
    addToCart(){
      //1.获取购物车想展示的信息 放到vuex中共享
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title;
      product.desc = this.detailInfo.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //2.将商品添加到购物车里
      //this.$store.commit('addCart', product)
      //dispath可以返回一个promise对象
      this.$store.dispatch('addCart', product).then(res => {
        this.$toast.show(res)
      })
    }
  },
  destroyed () {
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  }
}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .content {
    /* 44 + 49 */
    height: calc(100% - 93px);
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
