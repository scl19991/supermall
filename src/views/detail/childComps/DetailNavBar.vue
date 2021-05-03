<template>
  <div class="detail-navbar">
    <nav-bar>
      <div slot="left" class="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" 
             :key="index" 
             class="title-item"
             @click="currentItem(index)"
             :class="{active:index == currentIndex}">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name:'DetailNavBar',
  components: {
    NavBar
  },
  data(){
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0,
    }
  },
  methods: {
    currentItem(index){
      this.currentIndex = index;
      this.$emit('titleClick',index); 
    },
    backClick(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.left img{
  padding: 12px 12px 0 0;
}
.active{
  color: var(--color-high-text)
}
.title{
  display: flex;
}
.title-item{
  flex: 1;
  text-align: center;
  font-size: 13px;
}
</style>
