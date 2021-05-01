<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name:'HomeRecommendView',
  props: {
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.recommend{
  display: flex;
}
.recommend>div{
  flex:1;
  text-align: center ;
  font-size: 12px;
  padding-bottom: 16px;
  border-bottom: 8px solid #eee;
}
.recommend img{
  width: 70px;
  height: 70px;
  margin: 8px 0 8px 0;
}
</style>
