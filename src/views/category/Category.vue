<template>
<div class="wrapper">
  <ul class="content">
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
    <li i="">分类列表</li>
  </ul>
</div>
  
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name:'Category',
  data(){
    return {
      scroll: null
    }
  },
  mounted () {
    this.scroll = new BScroll(document.querySelector('.wrapper'),{

    })
  }
}
</script>

<style scoped>
  .wrapper{
    height: 160px;
    background-color: red;
    /* overflow: hidden; */
    /* overflow-y:scroll; */
  }
</style>
