<template>
  <div class="repay">
    <table class="tableDiv" cellspacing=0 cellpadding=0 ref="tableDiv">
      <tr>
        <td>期数</td>
      <td v-for="(v,i) in data" :key="i">第{{i+1}}期</td>
      </tr>
      <tr>
        <td>本金（元）</td>
        <td v-for="(v,i) in data" :key="i">{{v.benjin}}</td>
      </tr>
      <tr>
        <td>利息（元）</td>
        <td v-for="(v,i) in data" :key="i">{{v.lixi}}</td>
      </tr>
      <tr>
        <td>状态</td>
        <td v-for="(v,i) in data" :key="i">{{v.status}}</td>
      </tr>
      <tr>
        <td>应还时间</td>
        <td v-for="(v,i) in data" :key="i">{{v.expt_repay_time}}</td>
      </tr>
      <tr>
        <td>还款时间</td>
        <td v-for="(v,i) in data" :key="i">{{v.act_repay_time}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import {loanRepay} from "network/loan";
  export default {
    name: "LoanCon_4",
    components:{
    },
    props:{
      id:{
        type:String,
        default:0
      }
    },
    data(){
      return{
        data:[],
      }
    },
    created() {
      this._loanRepay()
    },
    methods:{
      _loanRepay(){
        loanRepay(this.id).then( res =>{
          console.log(res);
          if (res.State !== '200'){
            this.$toast.show(res.Msg)
          }else {
            this.data= res.Msg.List
            let wid = this.data.length *27
            this.$refs.tableDiv.width= wid+"%";
          }
        })
      },
    }
  }
</script>

<style scoped>
  .repay{
    width:100%;
    overflow:scroll;
  }
  .tableDiv{
    text-align:center;
    font-size: 14px;
  }
  .tableDiv td{
    height: 40px;
    text-align: center;
    border-bottom:#eaeaea solid 1px;
  }
</style>