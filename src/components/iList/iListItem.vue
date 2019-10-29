<template>
  <div class="item" @click="goDetail">
    <div class="title">
      {{content.title}}
    </div>
    <div class="midItem">
      <van-row gutter="20">
        <van-col span="10">
          <div class="left">
            <p>{{content.rate}}<span>{{sysRate}}</span></p>
            <i>年化利率</i>
          </div>
        </van-col>
        <van-col span="6"><div class="mid"><p>{{periodName}}</p><span>出借期限</span></div></van-col>
        <van-col span="8">
          <div class="right">
            <van-button :round="true" :color="statusColor" >{{buttonStatus}}</van-button>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="foot">
      <van-button disabled color="#d1d3d8" class="footbtn">
        <span class="btncl">项目总额：{{this.content.borrow_money}}万</span>
      </van-button>
      <van-button disabled color="#d1d3d8" class="footbtn">
        <span class="btncl">剩余可投：{{this.content.lavemoney}}万</span>
      </van-button>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "iListItem",
    data(){
      return{
        statusColor:" linear-gradient(to right, #d1d3d8, #d1d3d8)"
      }
    },
    props:{
      content:Object
    },
    methods:{
      goDetail(){
        this.$router.push("Invest/detail/"+this.content.id)
      }
    },
    computed:{
      sysRate(){
        return this.content.sys_up_rate === "" ? "" : "+"+this.content.sys_up_rate
      },
      periodName(){
        return this.content.period+this.content.period_unit
      },
      buttonStatus(){
        // "status": #标的状态(状态0-初发布 1-初审中 2-初审未通过 3-复审中 4-复审未通过 5-筹款中 6-满标待放款 7-还款中 8-已还完 9-提前结清 10-已流标),
        switch (this.content.status) {
          case 1:
          case 3:
            return "初审中";
            break;
          case 5:
            this.statusColor = "linear-gradient(to right, #2674f6, #1f4ce1)";
            return "筹款中";
            break;
          case 6:
            return "已满标";
            break;
          case 7:
            return "还款中";
            break;
          case 8:
            return "已还完";
            break;
        }
      },
      dteailUrl(){
        return "/Invest/detail/"+this.content.id
      }
    }
  }
</script>

<style scoped>
  .title{
    font-size: 15px;
    font-weight: 600;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item{
    padding:10px 0;
    border-bottom: 1px solid #e5e5e5;
  }
  .midItem{
    height: 50px;
  }
  .midItem .left{
    height: 32px;
  }
  .midItem .left p{
    font-weight: bold;
    color: #ed532e;
    font-size: 24px;
    font-family: '微软雅黑';
    padding-bottom: 5px;
  }
  .midItem .left p span{
    font-size: 12px;
  }
  .midItem .left i{
    font-style: normal;
    color: #737373;
    font-size: 12px;
    padding-top: 5px;
  }
  .mid{
    text-align: center;
  }
  .mid p{
    font-weight: 700;
    font-size: 15px;
    height: 32px;
    line-height: 32px;
  }
  .mid span{
    color: #737373;
    font-size: 12px;
  }
  .foot{
    padding: 10px 0;
  }
  .footbtn{
    height: 20px;
    line-height: 14px;
    margin-right:10px;
    padding:3px 5px;
  }
  .btncl{
    color: #737373;
  }
</style>