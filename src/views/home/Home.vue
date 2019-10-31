<template>
  <div id="home">
    <div v-if="Object.keys(banner).length !==0">
      <nav-bar><span slot="left">首页</span></nav-bar>
      <Swiper  :banner="banner" />
      <div class="notice">
        <img src="~assets/img/notice.jpg"/>
        <van-swipe class="notice-wiper" vertical :autoplay="3000" indicator-color="white" :show-indicators="false" >
          <van-swipe-item v-for="(item,index) in notice" :key="index">{{item.title}}</van-swipe-item>
        </van-swipe>
      </div>
      <van-grid :border="false" icon-size="40px">
        <van-grid-item  v-for="(item,index) in menu" :key="index" :icon="item.filepath" :text="item.title" :url="item.andurl"/>
      </van-grid>
      <title-nav :isright="false" :title="'新手引导'" ></title-nav>
      <steps :guide="guide" v-if="guide > 0"></steps>
      <title-nav :link="'Loan/index'" :title="'产品列表'"></title-nav>
      <i-list :data="recommLoan"></i-list>
<!--      <title-nav :isright="false" :title="'信息披露'" :lable="'实施披露 透明公开'"></title-nav>-->
<!--      <van-row type="flex" justify="center">-->
<!--        <van-col span="12" align="center">-->
<!--          <van-cell :title="loandata.tradeAmountTotal"  label="累计借贷金额(万)" title-class="allMoney"/>-->
<!--        </van-col>-->
<!--        <van-col span="12" align="center">-->
<!--          <van-cell :title="loandata.creditBalance"  label="累计收益(万)" title-class="allMoney"/>-->
<!--        </van-col>-->
<!--      </van-row>-->
<!--      <div class="moreBtn">-->
<!--        <van-button v-for="(v,i) in pilu" :key="i" :color="v.color">{{v.name}}</van-button>-->
<!--      </div>-->
      <van-row type="flex" justify="center" >
        <van-col span="18" align="center" >
          <van-button class="phone" disabled round  plain color="#818181" hairline icon="audio" >联系客服{{phone}}</van-button>
        </van-col>
      </van-row>
      <div class="bot"></div>
      <tab-bar ></tab-bar>
    </div>
  </div>
</template>

<script>
  //组件
  import tabBar from "components/tabBar/tabBar";
  import navBar from "components/navBar/navBar";
  import Swiper from "components/swiper/Swiper";
  import iList from "components/iList/iList";
  import titleNav from "components/titleNav";
  import Steps from "./homeItem/Steps";

 //network
 import {getHomeData} from 'network/home'
 //插件

export default {
  name: 'home',
  data(){
    return {
      banner:[],
      bottomMenu:{},
      learnLoan:[],
      loandata:{},
      menu:[],
      notice:[],
      noviceLoan:[],
      phone:{},
      recommLoan:[],
      searchConditionVersion:4,
      tips:{},
      phone:"",
      guide:0,// 1=[显示]未登录,默认显示 #2=[显示]未实名 #3=[显示]未首次出借 #0=[不显示]已实名,已出借
      pilu:[
        {'name':"存管银行",'color':"#2570f4"},
        {'name':"备案信息",'color':"#f49025"},
        {'name':"合规报告",'color':"#a242ec"},
        {'name':"企业概览",'color':"#e9c34f"},
        {'name':"承诺函",'color':"#2570f4"},
        {'name':"治理信息",'color':"#f49025"},
      ]
    }
  },
  components: {
    tabBar,
    navBar,
    Swiper,
    Steps,
    iList,
    titleNav
  },
  created() {
    getHomeData().then(res=>{
      console.log(res);
      if (res.State !== '200'){
        this.$toast.show(res.Msg)
      }else {
        this.banner = res.Msg.banner
        this.notice = res.Msg.notice
        this.menu = res.Msg.menu
        this.guide = res.Msg.guide
        this.recommLoan = res.Msg.recommLoan
        this.phone = res.Msg.phone
        this.loandata= res.Msg.loandata
      }
    })
  },
  methods:{
  }
}
</script>
<style scoped>
  .titleClass{
    font-size: 16px;
  }
  .notice{
    background-color: #fff;
    height: 30px;
    padding-left: 25px;
    padding-top: 10px;
    display: flex;
  }
  .notice img{
    flex: .1;
  }
.notice-wiper{
  height: 20px;
  background-color: #fff;
  line-height: 20px;
  flex: 1;
  padding-left: 5px;
  color: #737373;

}
#home{
  background-color: #f5f6fa;
}
  .more{
    color: #737373;
  }
  .loding{
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }
  .bot{
    height: 60px;
  }
  .phoneDiv{
    display: flex;
  }
  .phone{
    height: 30px;
    line-height: 30px;background-color: #f5f6fa;
    margin: 10px 0;
  }
  .allMoney{
    font-size: 22px;
  }
  .moreBtn{
    height: 90px;
    width: auto;
    overflow-x: auto;
    white-space: nowrap;
    background-color: #fff;
    padding:10px 20px;
  }
  .moreBtn button{
    line-height: 40px;
    height: 40px;
    margin: 15px 3px;
  }
</style>
