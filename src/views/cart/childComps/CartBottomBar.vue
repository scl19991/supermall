<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" 
                    :is-checked="isSelectAll"
                    @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="totalPrice">
      合计:{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去计算 ({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'
export default {
  name:'CartBottomBar',
  components: {
    CheckButton,
  },
  data(){
    return {

    }
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice(){
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) =>{
        return preValue + item.price * item.count
      }, 0)
    },
    checkLength(){
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll(){
      //return !(this.cartList.filter(item => !item.checked).length)
      if(this.cartList.length == 0 ){
        return false
      }
      return !(this.cartList.filter(item => !item.checked).length)
      
    }
  },
  methods: {
    checkClick(){
      if(this.isSelectAll){
        this.cartList.forEach(item => item.checked = false)
      }else{
        this.cartList.forEach(item => item.checked = true)
      }
      //this.cartList.forEach(item => item.checked = !this.isSelectAll)
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择购买的商品',2000)
      }
    }
  }

}
</script>

<style scoped>
  .bottom-bar{
    position: relative;
    display: flex;
    height: 40px;
    background-color: #eee;
    line-height: 40px;
    font-size: 14px;
    
  }
  .check-content{
    display: flex;
    align-items: center;
    width: 80px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin: 0 5px 0 10px;
  }
  .totalPrice{
    margin-left:30px;
    flex: 1;
  }

  .calculate{
    background-color: pink;
    right: 0;
    text-align: center;
    width: 80px;
  }
</style>
