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
    this.scroll.on('scroll',(position) =>{
      this.$emit('scroll',position)
    })

    //监听上拉事件
    this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp')
    })
  },
  methods: {
    scrollTo(x,y,time=300){
      this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    }
  }
}
</script>

<style scoped>

</style>
