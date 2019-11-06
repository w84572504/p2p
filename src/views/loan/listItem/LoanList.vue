<template>
  <div>
    <scroll class="wrapper" ref="wrapper" :data="list"  @pullingDown="pullingDown" @pullingUp="pullingUp" :pullUpLoad="finished">
      <div class="content">
        <van-row type="flex" justify="center">
          <van-loading type="spinner" class="refurbish top-refurbish">下拉刷新</van-loading>
        </van-row>
        <i-list :data="list" class="list"></i-list>
        <up-loding :show="refurbish" ></up-loding>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/scroll/Scroll";
  import iList from "components/iList/iList";
  import upLoding from "components/Loding/upLoding";
  import {getLoanList} from 'network/loan'
  import {getAssList} from 'network/assignment'
  export default {
    name: "LoanList",
    props:{
      prams:Object,
      types:{ //0直投 1 债转
        type:Number,
        default:0
      }
    },
    components:{
      iList,
      Scroll,
      upLoding
    },
    data() {
      return {
        list:[],
        finished:true,
        refurbish:0, //0隐藏 1显示 2 完成
      }
    },
    created(){
      if (this.types== 1 ){
        this._getAssList()
      }else{
        this._getLoanList()
      }
    },
    methods: {
      doData(res){
        this.refurbish = 0
        this.prams.page++
        if (res.State !== '200'){
          this.$toast.show(res.Msg)
        }else {
          if (res.Msg.list.length === 0){
            this.finished=false
            this.refurbish = 3
          }else{
            res.Msg.list.forEach(e => this.list.push(e) )
          }
        }
      },
      _getLoanList(){
        this.refurbish = 1
        getLoanList(this.prams).then(res=>{
          this.doData(res)
        })
      },
      _getAssList(){
        this.refurbish = 1
        getAssList(this.prams).then(res=>{
          this.doData(res)
        })
      },
      clearData(){
        this.prams.page=1
        this.finished = true
        this.list.splice(0,this.list.length);
        this.$refs.wrapper._initScroll()
        if (this.types== 1 ){
          this._getAssList();
        }else{
          this._getLoanList()
        }

      },
      //上拉刷新返回
      pullingDown(){
        this.clearData();
        this.$refs.wrapper.finishPullDown();
      },
      //加载更多返回
      pullingUp(res){
        console.log(res);
        if (res){
          if (this.types== 1){
            this._getAssList();
          }else{
            this._getLoanList()
          }
          this.$refs.wrapper.finishPullUp();
        }
      }
    }
  }
</script>

<style scoped>
  .wrapper{
    height: calc(100vh - 300px);
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
    top:-40px;
  }
</style>