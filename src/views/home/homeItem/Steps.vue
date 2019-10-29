<template>
  <div class="steps">
    <van-steps
            :active="active"
            active-icon="cross"
            active-color="#38f" >
      <van-step><router-link to="login/register"> {{messageA}}</router-link></van-step>
      <van-step><router-link to="user/Freg"> {{messageB}}</router-link></van-step>
      <van-step><router-link to="invest/Index"> {{messageC}}</router-link></van-step>
    </van-steps>
  </div>
</template>

<script>
  export default {
    name: "Steps",
    data(){
      return{
        active: -1,
        messageA:'立即注册',
        messageB:'立即开通',
        messageC:'首次出借'
      }
    },
    props:{
      guide:Number
    },
    created(){
      switch (this.guide) {
        case 1:{
          this.active =-1
          break
        }
        case 2:{
          this.active =0
          this.messageA ='已注册'
          break
        }
        case 3:{
          this.active =1
          this.messageA ='已注册'
          this.messageA ='已开通'
          break
        }
      }
    },
  }
</script>

<style scoped>
.steps{
  padding:0 20px;
  background-color: #fff;
}
</style>