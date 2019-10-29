<template>
  <div>
    <nav-bar>
      <span slot="left" class="iconfont bc-back"> </span>
      <p slot="mid">欢迎注册新用户</p>
    </nav-bar>
    <div class="pass">
      <input type="text" placeholder="请输入注册手机号" key="phone1" v-model="phone">
    </div>
    <login-pass ref="pass" ></login-pass>
    <login-code ref="code" :phone="phone" :type="reg_type"></login-code>
    <div class="pass">
      <input type="text" placeholder="请输入邀约人号码" key="password2" v-model="invite_user">
    </div>
    <button class="loginBtn" @click="Reg">立即注册</button>
    <login-bar>
      <span slot="loginLeft"><router-link to="/login/login">立即登录</router-link></span>
      <span slot="loginRight"><router-link to="/login/editpass">忘记密码</router-link></span>
    </login-bar>
  </div>
</template>

<script>
  import navBar from 'components/navBar/navBar';
  import loginCode from "./LoginItem/loginCode";
  import loginPass from "./LoginItem/loginPass";
  import loginBar from "./LoginItem/loginBar";

  import {getReg} from "network/login"
  import Until from 'common/Until'
  export default {
    name: "Register",
    data(){
      return{
        phone:'',
        user_role:'',
        invite_user:'',
        reg_type:2
      }
    },
    components:{
      navBar,
      loginCode,
      loginPass,
      loginBar,
    },
    methods:{
      Reg(){
        if (Until.checkPhone(this.phone) && this.$refs.code.password.length ==6 && this.$refs.pass.password.length >=6){
          let data = {
            phone:this.phone,
            code:this.$refs.code.password,
            password:this.$refs.pass.password,
            user_role:1,
            invite_user:this.invite_user,
          }
          console.log(data);
          getReg(data).then(res=>{
            console.log(res);
            this.$toast.show(res.Msg,2000)
            if (res.State == 200){
              setTimeout(()=>{
                this.$router.replace('/login/login')
              },2000)
            }
          })
        }else{
          this.$toast.show('手机号或密码填写错误')
        }
      }
    }
  }
</script>

<style scoped>
  .pass{
    padding: 20px;
  }
  .pass input{
    border: none;
    border-bottom: 1px solid #ddd;
    width: 100%;
    padding: 10px 0px;
  }
  .loginBtn{
    background-color: #2360ec;
    border:none;
    width: 80%;
    border-radius: 20px;
    height: 40px;
    color: #fff;
    margin-top: 50px;
    box-shadow: 0px 0px 5px #2360ec;
    transform: translate(10%,10%);
  }

</style>