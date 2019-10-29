<template>
  <div class="pass">
    <div class="inputPass">
      <input type="text" placeholder="请输入验证码"  key="code" v-model="password">
      <button class="getcode" :class="{'codeClass': !this.isCode}" @click="getCode" :disabled="!isCode">获取验证码 <i v-if="!isCode">{{timer}}</i></button>
    </div>
  </div>
</template>
<script>
  import {getCode} from "network/login"
  import { mapActions } from 'vuex'
  import Until from 'common/Until'

  export default {
    name: "loginCode",
    data(){
      return{
        isCode:true,
        password:'',
        timer:59
      }
    },
    props:{
      phone:String,
      type:Number
    },
    methods:{
      ...mapActions([ 'alogin', 'auscode'
      ]),
      getCode(){
        if (Until.checkPhone(this.phone)){
          getCode(this.phone,this.type).then(res=>{
            if (res.State == 200){
              this.auscode(res.Us) //获取返回的us 用于下次请求
              this.isCode =false
              let times = setInterval(()=>{
                if (this.timer>1){
                  this.timer--
                }else{
                  this.isCode =true
                  this.timer=59
                  clearTimeout(times);
                }
              },1000)
              this.$toast.show('验证码已发送')
            }else{
              this.$toast.show(res.Msg)
            }
          })
        }else{
          this.$toast.show('手机号错误!')
        }
      },
    }
  }
</script>

<style scoped>
  input{
    border: none;
    border-bottom: 1px solid #ddd;
    width: 100%;
    padding: 10px 0px;
  }
  .inputPass{
    position: relative;
  }
  .getcode{
    position: absolute;
    right: 10px;
    top: 12px;
    font-size: 15px;
    color: #2360ec;
    border: none ;
    background-color: #fff;
  }
  .getcode i {
    font-style: normal;
  }

  .codeClass{
    color: #737373;
  }
</style>