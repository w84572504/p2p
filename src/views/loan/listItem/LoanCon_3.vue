<template>
  <div>
    <scroll class="wrapper" ref="wrapper" :data="data.List" @pullingDown="pullingDown">
      <div class="content">
        <div class="table">
          <h3>安全保障</h3>
          <p>{{data.fengkong}}</p>
          <div class="tableDiv">
            <span class="tb-1">序号</span>
            <span class="tb-2">审核资料</span>
            <span class="tb-3">审核情况</span>
            <span class="tb-4">审核人</span>
          </div>
          <div class="tableDiv" v-for="(v,i) in data.List" :key="i">
            <span class="tb-1">{{i+1}}</span>
            <span class="tb-2">{{v.name}}</span>
            <span class="tb-3">通过</span>
            <span class="tb-4">{{v.user}}</span>
          </div>
        </div>
        <p class="bt-bg"></p>
      </div>
    </scroll>
  </div>
</template>

<script>
  import titleNav from "components/titleNav";
  import Scroll from "components/scroll/Scroll";

  import DetailList from "./DetailList";
  import {getLoanDetail_4} from "network/loan";
  export default {
    name: "LoanCon_3",
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
      this._getLoanDetail_4()
    },
    methods:{
      _getLoanDetail_4(){
        getLoanDetail_4(this.id).then( res =>{
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
  .bt-bg{
    height: 50px;
  }
  .count i {
    font-style: normal;
    color: #ed532e;
  }
  .table{
    padding:0 20px
  }
  .table h3{
    font-size: 13px;
    line-height: 30px;
  }
  .table p{
    font-size: 13px;
    line-height: 30px;
  }
  .tableDiv{
    display: flex;
    border-bottom: 1px solid #e6e6e6;
    font-size: 14px;
    color: #000;
    padding:10px 0;
    line-height: 30px;
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
  .bt-bg{
    height: 50px;
  }
</style>