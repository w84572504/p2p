<template>
  <div>
    <van-tabs v-model="active" color="#2570f4" title-active-color="#2570f4" sticky swipeable>
      <van-divider />
      <van-tab title="项目概述" name="a"> <loan-con_1 :id="id"></loan-con_1> </van-tab>
      <van-tab title="出借记录" name="b"><loan-con_2 :id="id"></loan-con_2></van-tab>
      <van-tab title="风控审核" name="c"><loan-con_1 :id="id"></loan-con_1></van-tab>
    </van-tabs>
    <van-row type="flex" justify="center">
      <van-col span="20"><van-button type="info" :round="true" color="#2570f4" class="loanBtn">立即出借</van-button></van-col>
    </van-row>
  </div>
</template>

<script>
  import Scroll from "components/scroll/Scroll";
  import LoanCon_1 from "./listItem/LoanCon_1";
  import LoanCon_2 from "./listItem/LoanCon_2";
  export default {
    name: "Detail_1",
    components:{
      Scroll,
      LoanCon_1,
      LoanCon_2
    },
    data(){
      return{
        active:0,
      }
    },
    created() {
      this.id = this.$route.params.id
    },
  }
</script>

<style scoped>
  .loanBtn{
    width: 100%;
  }
</style>