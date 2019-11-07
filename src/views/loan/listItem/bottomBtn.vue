<template>
  <div>
    <van-button type="info" :round="true" color="#2570f4" class="loanBtn btnW" @click="btnClick" v-if="status == 5">{{showtext}}</van-button>
    <van-button type="info" :round="true" color="#e5e9f2" class="loanBtn btnG" disabled v-else>{{showtext}}</van-button>
  </div>
</template>

<script>
  import Until from 'common/Until'
  export default {
    name: "bottomBtn",
    props:{
      status:Number
    },
    computed:{
      showtext(){
        return Until.btnText(this.status)
      }
    },
    methods:{
      btnClick(){
        this.$emit('btnClick')
      }

    }
  }
</script>

<style scoped>
  .loanBtn{
    position: fixed;
    bottom: 5px;
    width: 90%;
    left: 5%;
    height: 45px;
  }
  .btnW span{
    color: #fff;
  }
  .btnG span{
    color: #bfbfbf;
  }
</style>