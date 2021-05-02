<template>
<!-- ref如果是绑定在组件中的，通过this.$refs.refname 获取到的是一个组件对象
    ref如果是绑定在元素中的，通过this.$refs.refname 获取到的是一个元素对象 
 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name:'Scroll',
  props: {
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
      scroll:null
    }
  },
  mounted () {
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      //需要的时候在设置
      //probeType:3,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      //弹幕上看到的解决办法
      observeDOM: true,
      click: true
    })
    //2.监听滚动的位置
    //Better-Scroll再决定有多少区域可以滚动时，是根据scrollerHeight属性决定
    //scrollerHeight属性是根据放在Better-Scroll中子组件的高度决定的
    //但是我们的首页中一开始在计算scrollerHeight时，是没有将图片计算在内的
    //所以是错误的，后来图片加载进来有了新的高度 但是scrollerHeight没有更新
    //所以滚动出现了问题
    //如何解决？
    //监听每一张图片是否加载完成，有一张图片加载完成就执行一次refresh()
    //img.onload @load
    if(this.probeType == 2 || this.probeType == 3){
      this.scroll.on('scroll',(position) =>{
        this.$emit('scroll',position)
      })
    }

    //监听上拉事件
    if(this.pullUpLoad){
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    refresh(){
      console.log('---');
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style scoped>

</style>
