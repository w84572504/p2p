<template>
  <div id="home">
    <div v-if="Object.keys(banner).length !==0">
      <nav-bar><span slot="left">首页</span></nav-bar>
      <van-row type="flex" justify="center">
        <van-loading type="spinner" class="refurbish">下拉刷新</van-loading>
      </van-row>
      <scroll class="wrapper" ref="wrapper" :data="recommLoan"  @pullingDown="pullingDown" :pullUpLoad="false">
        <div class="content">
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
          <van-row type="flex" justify="center" >
            <van-col span="18" align="center" >
              <van-button class="phone" disabled round  plain color="#818181" hairline icon="audio" >联系客服{{phone}}</van-button>
            </van-col>
          </van-row>
          <div class="bot"></div>
        </div>
      </scroll>
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
  import Scroll from "components/scroll/Scroll";
  import Steps from "./homeItem/Steps";

 //network
 import {getHomeData} from 'network/home';
 //插件

export default {
  name: 'home',
  components: {
    tabBar,
    navBar,
    Swiper,
    Steps,
    iList,
    titleNav,
    Scroll
  },
  data(){
    return {
      banner:[],
      bottomMenu:{},
      learnLoan:[],
      loandata:{},
      menu:[],
      notice:[],
      noviceLoan:[],
      recommLoan:[],
      searchConditionVersion:4,
      tips:{},
      phone:"",
      guide:0,// 1=[显示]未登录,默认显示 #2=[显示]未实名 #3=[显示]未首次出借 #0=[不显示]已实名,已出借
    }
  },
  created() {
    this._getHomeData()
  },
  methods:{
    _getHomeData(){
      getHomeData().then(res => {
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
    pullingDown(){
      this._getHomeData();
      this.$refs.wrapper.finishPullDown();
    },
  }
}
</script>
<style scoped>
  #home{
    background-color: #f5f6fa;
  }
  .wrapper{
    height: calc(100vh - 98px);
    overflow: hidden;
  }
  .content{
    background-color: #f5f6fa;
  }
  .refurbish{
    height: 40px;
    line-height: 49px;
    text-align: center;
    color: #737373;
    position: fixed;
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
  .bot{
    height: 60px;
  }
  .phone{
    height: 30px;
    line-height: 30px;background-color: #f5f6fa;
    margin: 10px 0;
  }
  .moreBtn button{
    line-height: 40px;
    height: 40px;
    margin: 15px 3px;
  }
</style>
