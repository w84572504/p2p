<template>
  <div>
    <nav-bar>
      <span slot="left" class="iconfont bc-back"> </span>
      <span slot="mid">出借详情</span>
    </nav-bar>
    <scroll class="wrapper" ref="wrapper" :data="dataCon" @pullingDown="pullingDown" @pullup="pullup" :pullup="true">
      <div class="content">
        <van-row type="flex" justify="center">
          <van-loading type="spinner" class="refurbish top-refurbish">下拉刷新</van-loading>
        </van-row>
        <van-row justify="center" type="flex" v-if="Object.keys(data).length !== 0">
          <van-col span="22" class="top-box">
            <van-row type="flex" justify="center">
              <div class="rate">{{htmlRate}}<span>{{htmlSysRate}}</span></div>
            </van-row>
            <van-row type="flex" justify="center"> <span class="rateText">年化利率</span> </van-row>
            <van-row type="flex" justify="center" >
              <van-col span="6" align="center">
                <p class="top-num">{{data.period}}</p>
                <p class="top-txt">项目期限</p>
              </van-col>
              <van-col span="6" align="center">
                <p class="top-num">{{(data.borrow_money/10000).toFixed(2) }}万</p>
                <p class="top-txt">项目总额</p>
              </van-col>
              <van-col span="6" align="center">
                <p class="top-num">{{(data.order_money/10000).toFixed(2)}}万</p>
                <p class="top-txt">剩余金额</p>
              </van-col>
            </van-row>
            <van-row justify="center" type="flex">
              <van-col span="22" class="slider">
                <div class="slider-bg"></div>
                <div class="slider-line" :style="showLine"></div>
                <span class="slider-text" :style="showLineText">已加入{{slider}}%</span>
              </van-col>
            </van-row>
          </van-col>
        </van-row>
        <loan-con :data="dataCon"></loan-con>
        <van-notice-bar v-if="showcePing" :scrollable="false" left-icon="info-o" mode="link" @click="goPingce">
          {{ceping}}
        </van-notice-bar>
        <van-divider class="info-text" icon="arrow-up">上拉查看更多信息</van-divider>
        <van-divider class="info-text" icon="arrow-up">白菜金融提醒您：出借有风险 出借需谨慎</van-divider>
      </div>
    </scroll>
    <bottom-btn :status="data.status" @btnClick="goInvest"></bottom-btn>
  </div>
</template>

<script>
  import navBar from "components/navBar/navBar"
  import Scroll from "components/scroll/Scroll"

  import {getLoanDetail_1} from 'network/loan'
  import LoanCon from "./listItem/LoanCon"
  import bottomBtn from "./listItem/bottomBtn";
  export default {
    name: "Detail",
    components:{
      navBar,
      LoanCon,
      Scroll,
      bottomBtn
    },
    data(){
      return {
        data:{},
        dataCon:[],
        slider:0,
        ceping:"您尚未进行风险评估，请先去评估",
        curHeight:0,
      }
    },
    created() {
      this._getLoanDetail_1()
    },
    methods:{
      _getLoanDetail_1(){
        getLoanDetail_1(this.$route.params.id).then(res=>{
          console.log(res);
          if (res.State !== '200'){
            this.$toast.show(res.Msg)
          }else {
            this.data= res.Msg.List
            this.slider = (1-(this.data.order_money/this.data.borrow_money).toFixed(2))*100
            this.dataCon=[
              ['项目名称',this.data.title],
              ['还款方式',this.data.huantype],
              ['起投金额',this.data.min_inmoney],
              ['募集期限',this.data.chouji],
              ['起息日期',this.data.lend_time],
              ['出借建议',this.data.jianyi],
              ['相关协议',"<a href= '"+this.data.jkxyUrl+"'>《借款协议》</a>"],
              ['风险揭示',"<a href= '"+this.data.fxgzUrl+"'>《风险告知书》</a>"],
            ]
          }
        })
      },
      goPingce(){
        window.location.href=this.data.cepingUrl
      },
      pullingDown(){
        this._getLoanDetail_1()
        this.$refs.wrapper.finishPullDown();
      },
      pullup(){
        this.$router.push("/loan/Detail_1/"+this.$route.params.id+"/"+this.data.status)
      },
      goInvest(){
        if (this.data.status === 5){
          this.$router.push("/loan/invest/"+this.$route.params.id)
        }
      }
    },
    computed:{
      htmlRate(){
        return this.data.rate+"%"
      },
      htmlSysRate(){
        return this.data.sys_up_rate === '' ? '': '+'+this.data.sys_up_rate+'%'
      },
      showLine(){
        return {width:this.slider+'%'}
      },
      showLineText(){
        let sliderLeft =  76/100 *this.slider
        return {left:sliderLeft+'%'}
      },
      showcePing(){
        if(this.data.userScore ===1 && this.data.yearScore===1){
          return false
        }else if(this.data.userScore ===1 && this.data.yearScore===0 ){
          this.ceping = "您的风险评估已过期,请重新评估"
          return  true
        }else{
          return  true
        }
      },
    },

  }
</script>

<style scoped>
  .wrapper{
    height: calc(100vh - 95px);
    overflow: hidden;
  }
  .refurbish{
    height: 40px;
    line-height: 49px;
    text-align: center;
    color: #737373;
    position: fixed;
  }
  .top-refurbish{
    top:-45px;
  }
  .top-box{
    margin-top:20px ;
    padding-top: 20px;
    box-shadow: 0 0px 4px #dae6fa;
  }
  .rate{
    color: #ed532e;
    font-size: 32px;
    font-weight: 600;
  }
  .rate span{
    font-size: 16px;
  }
  .rateText{
    color: #737373;
    padding:5px 0;
    font-size: 13px;
  }
  .top-num{
    font-size: 15px;
    font-weight: 600;
    padding-top:15px;
  }
  .top-txt{
    font-size: 13px;
    color: #737373;
    padding:5px 0 ;
  }
  .slider{
    margin-bottom:30px ;
    margin-top:10px ;
    position: relative;
  }
  .slider-bg{
    height: 2px;
    width: 100%;
    background-color: #f2f2f2;
  }
  .slider-line{
    background-color: #2352e3;
    height: 2px;
    position: absolute;
    top: 0;
    transition: width 1s
  }
  .slider-text{
    font-size: 13px;
    color: #2352e3;
    position: absolute;
    transition: left 1s;
    padding-top: 5px;
  }
  .info-text{
    font-size: 12px;
  }

</style>