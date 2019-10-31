<template>
  <div>
    <van-list
            van-clearfix
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
    >
      <i-list :data="list"></i-list>
    </van-list>
  </div>
</template>

<script>
  import iList from "components/iList/iList";
  import {getAssList} from 'network/assignment'
  export default {
    name: "LoanList",
    props:{
      prams:Object,
    },
    components:{
      iList,
    },
    data() {
      return {
        list:[],
        loading: false,
        finished: false,
      }
    },
    methods: {
      onLoad(){
        this._getAssList()
        this.prams.page++
        this.loading=false
      },
      clearData(){
        this.prams.page=1
        this.finished = false;
        this.list.splice(0,this.list.length);
      },
      _getAssList(){
        getAssList(this.prams).then(res=>{
          console.log(res);
          if (res.State !== '200'){
            this.$toast.show(res.Msg)
          }else {
            if (res.Msg.list.length === 0){
              this.finished = true
            }else{
              res.Msg.list.forEach(e => this.list.push(e) )
            }
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>