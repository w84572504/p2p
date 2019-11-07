<template>
  <div>
    <nav-bar>
      <span slot="left" class="iconfont bc-back"> </span>
      <span slot="mid">出借详情</span>
    </nav-bar>
    <van-tabs class="tabss" v-model="active" color="#2570f4" title-active-color="#2570f4" sticky >
      <van-divider />
      <van-tab title="项目概述" name="a"> <loan-con_1 :id="id"></loan-con_1> </van-tab>
      <van-tab title="出借记录" name="b"><loan-con_2 :id="id"></loan-con_2></van-tab>
      <van-tab title="风控审核" name="c"><loan-con_3 :id="id"></loan-con_3></van-tab>
      <van-tab title="还款详情" name="d" v-if="hkShow"><loan-con_4 :id="id"></loan-con_4></van-tab>
    </van-tabs>
    <bottom-btn :status="status" @btnClick="goInvest"></bottom-btn>
  </div>
</template>

<script>
  import navBar from "components/navBar/navBar";
  import Scroll from "components/scroll/Scroll";
  import LoanCon_1 from "./listItem/LoanCon_1";
  import LoanCon_2 from "./listItem/LoanCon_2";
  import LoanCon_3 from "./listItem/LoanCon_3";
  import LoanCon_4 from "./listItem/LoanCon_4";
  import bottomBtn from "./listItem/bottomBtn";
  export default {
    name: "Detail_1",
    components:{
      navBar,
      Scroll,
      LoanCon_1,
      LoanCon_2,
      LoanCon_3,
      LoanCon_4,
      bottomBtn

    },
    data(){
      return{
        active:0,
        id:0,
        status:0
      }
    },
    created() {
      this.id = this.$route.params.id
      this.status = Number(this.$route.params.status)
    },
    computed:{
      hkShow(){
        return (this.status == 7 || this.status == 8)
      }
    },
    methods:{
      goInvest(){
        console.log(1);
        if (this.status === 5){
          this.$router.push("/loan/invest/"+this.id)
        }
      }
    }
  }
</script>

<style scoped>
  .loanBtn{
    position: fixed;
    bottom: 5px;
    width: 90%;
    left: 5%;
    height: 45px;
  }
  .tabss{
    height: calc(100vh - 100px);
    overflow: hidden;
  }
</style>