<template>
  <div>
    <nav-bar><span slot="left">出借</span></nav-bar>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <van-row justify="center" type="flex" class="banner">
      <van-col span="20"><van-image :src="banner.filepath" /></van-col>
    </van-row>
    <van-tabs v-model="active" color="#2570f4" title-active-color="#2570f4" :offset-top="48" sticky >
      <van-tab title="直投专区">
        <div>
          <loan-type :data="investment" @changeVal="getLaonType"></loan-type>
          <loan-list ref="loanlist" :active="active" :prams="loanType"></loan-list>
        </div>
      </van-tab>
      <van-tab title="债转专区">
        <div>
          <loan-type  :data="claim" @changeVal="getAssType"></loan-type>
          <ass-list ref="asslist" :active="active" :prams="assType"></ass-list>
        </div>
      </van-tab>
    </van-tabs>
      <div class="bot"></div>
    <tab-bar></tab-bar>
    </van-pull-refresh>
  </div>
</template>

<script>
  import tabBar from "components/tabBar/tabBar"
  import navBar from "components/navBar/navBar"

  import {getLoanList,getLoanType} from 'network/loan'
  import LoanType from "./listItem/LoanType";
  import LoanList from "./listItem/LoanList";
  import AssList from "./listItem/AssList";
  export default {
    name: "List",
    components: {
      tabBar,
      navBar,
      LoanType,
      LoanList,
      AssList,
    },
    data(){
      return{
        banner:{},
        tags:['直投专区','债转专区'],
        loanType:{'productid':0,'status':0,'page':1}, //请求信息
        assType:{'rate':0,'status':0,'page':1}, //请求信息
        claim:[], //债转筛选
        investment:[], //直投筛选
        active:0,
        isLoading:false
      }
    },
    created() {
      getLoanType().then(res=>{
        if (res.State !== '200'){
          this.$toast.show(res.Msg)
        }else {
          this.claim= res.Msg.list.claim
          this.investment= res.Msg.list.investment
        }
      })
      getLoanList(this.loanType).then(res=>{
        if (res.State !== '200'){
          this.$toast.show(list.Msg)
        }else {
            this.banner = res.Msg.banner
        }
      })
    },
    methods:{
      getLaonType(type,val){
        if (type === 0){
          this.loanType.productid=val
        }else{
          this.loanType.status=val
        }
        this.$refs.loanlist.clearData()
        this.$refs.loanlist.onLoad()
      },
      getAssType(type,val){
        if (type === 0){
          this.assType.rate=val
        }else{
          this.assType.status=val
        }
        this.$refs.asslist.clearData()
        this.$refs.asslist.onLoad()
      },
      onRefresh() {
        this.$refs.loanlist.clearData()
        this.$refs.loanlist.onLoad()
        this.isLoading = false;
      },
    },
  }
</script>

<style scoped>
  .banner{
    padding-top: 10px;
  }
  .bot{
    height: 60px;
  }
</style>