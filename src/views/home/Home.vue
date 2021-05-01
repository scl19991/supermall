<template>
<div id="home">
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  <scroll class="content" 
          ref="scroll" 
          :probe-type="3" 
          :pull-up-load="true" 
          @scroll="contentScroll" 
          @pullingUp="pullingUp">
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend-view :recommends="recommends"></home-recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control" 
                 :titles="['流行','新款','精选']" 
                 @tabClick="tabClick"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
  </scroll>
  <!-- 组件监听 加native -->
  <back-top @click.native="backClick" v-show="isplay"></back-top>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import FeatureView from './childComps/FeatureView'

import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'
import {getHomeMultidata,
        getHomeGoods} from "network/home"



export default {
  name:'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
    data(){
    return{
      result:null,
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',
      isplay:false
    }
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    /* 
    事件监听相关
    */
    tabClick(index){
      console.log(index);
      if(index == 0){
        this.currentType = 'pop'
      }else if(index == 1){
        this.currentType = 'new'
      }else{
        this.currentType = 'sell'
      }
    },
    backClick(){
      //回到顶部
     this.$refs.scroll.scrollTo(0,0,500)
    },
    contentScroll(position){
      if(position.y < -1000){
        this.isplay =true
      }else{
        this.isplay =false
      }
    },
    //上拉获取更多事件
    pullingUp(){
     this.getHomeGoods(this.currentType)
    }, 
    /* 
    网络请求相关
    */
    getHomeMultidata(){
      getHomeMultidata().then(res => {
      //this.result = res;
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
    },
    getHomeGoods(type){
      let page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res =>{
      this.goods[type].list.push(...res.data.list) 
      this.goods[type].page++
      this.$refs.scroll.finishPullUp()
    })
    },
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  }
}
</script>

<style scoped>
#home{
  /* padding-top :44px; */
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color:#fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index:9;
  height: 44px;
}

.tab-control{
  /* position: sticky; */
  top:44px;
  z-index:9;
}
.content{
  position:absolute;
  overflow: hidden;
  top:44px;
  bottom: 49px;
}
/* .content{
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top:44px;
} */
</style>
