<template>
  <div>
    <nav-bar>
      <span slot="left" class="iconfont bc-back"> </span>
      <span slot="mid">立即出借</span>
    </nav-bar>
    <van-row type="flex" justify="center">
      <van-col span="8">
        {{data.rate}}%+{{data.sys_up_rate}}%<br>
        年华利率
      </van-col>
      <van-col span="8">期限{{data.period}}</van-col>
      <van-col span="8">剩余{{data.loanMoney}}</van-col>
    </van-row>
    <p>账户余额{{avl_money}}</p>
  </div>
</template>

<script>
  import navBar from "components/navBar/navBar"
  import {investShow} from "network/loan"
  export default {
    name: "LoanInvest",
    components:{
      navBar
    },
    data(){
      return{
        avl_money:0,
        data:{}
      }
    },
    created(){
      this._investShow()
    },
    methods:{
      _investShow(){
        investShow(this.$route.params.id).then(res=>{
          console.log(res);
          if (res.State !== '200'){
            this.$toast.show(res.Msg)
          }else {
            this.avl_money = res.Msg.avl_money
            this.data = res.Msg.data
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>