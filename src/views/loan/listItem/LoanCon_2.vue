<template>
  <div>
    <scroll class="wrapper" ref="wrapper" :data="data.List" @pullingDown="pullingDown">
      <div class="content">
      <p class="count">出借人数：<i>{{data.Count.count}}</i> 出借金额：<i>{{data.Count.count}}</i>元</p>
        <div class="table">
          <div class="tableDiv">
            <span class="tb-1">序号</span>
            <span class="tb-2">出借人</span>
            <span class="tb-3">出借金额</span>
            <span class="tb-4 noline">出借时间</span>
          </div>
          <div class="tableDiv" v-for="(v,i) in data.List" :key="i">
            <span class="tb-1">{{i+1}}</span>
            <span class="tb-2">{{v.phone}}</span>
            <span class="tb-3">{{v.invest_amount}}</span>
            <span class="tb-4">{{v.invest_time}}</span>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import titleNav from "components/titleNav";
  import Scroll from "components/scroll/Scroll";

  import DetailList from "./DetailList";
  import {getLoanDetail_3} from "network/loan";
  export default {
    name: "LoanCon_2",
    components:{
      titleNav,
      DetailList,
      Scroll
    },
    props:{
      id:{
        type:String,
        default:0
      }
    },
    data(){
      return{
        data:{},
      }
    },
    created() {
      this._getLoanDetail_3()
    },
    methods:{
      _getLoanDetail_3(){
        getLoanDetail_3(this.id).then( res =>{
          console.log(res);
          if (res.State !== '200'){
            this.$toast.show(res.Msg)
          }else {
            this.data= res.Msg
          }
        })
      },
      pullingDown(){
        this.$router.replace("/loan/Detail/"+this.$route.params.id)
      },
    }
  }
</script>

<style scoped>
  .wrapper{
    height: calc(100vh - 125px);
    overflow: hidden;
  }
  .info-swiper{
    height: 200px;
  }
  .bt-bg{
    height: 50px;
  }
  .count{
    padding:0px 20px 20px 20px
  }
  .count i {
    font-style: normal;
    color: #ed532e;
  }
  .table{
    padding:0 20px
  }
  .tableDiv{
    display: flex;
    border-bottom: 1px solid #e6e6e6;
    font-size: 14px;
    color: #000;
    padding:10px 0;
    line-height: 40px;
  }
  .tableDiv span{
    text-align: center;
  }
  .tb-1{
    flex: 1;
  }
  .tb-2,.tb-3,.tb-4{
    flex: 3;
  }
  .tb-4{
    line-height: 20px;
  }
  .noline{
    line-height: 40px;
  }
</style>