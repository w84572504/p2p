<template>
  <div>
    <nav-bar>
      <span slot="left" class="iconfont bc-back"> </span>
      <p slot="mid">欢迎回来</p>
    </nav-bar>
    <div class="login-type">
      <div class="login-btn" v-for="(v,i) in loginType" :key="i" @click="LoginType(i)" :class="changeA(i)">
        <span>
          {{v}}
        </span>
      </div>
    </div>
    <div class="pass">
      <input type="text" placeholder="请输入注册手机号" key="phone1" v-model="phone">
    </div>
    <keep-alive>
      <login-pass v-if="curIndex==0" ref="loginpass"></login-pass>
      <login-code v-else ref="logincode" :phone="phone" :type="login_type"></login-code>
    </keep-alive>
    <button class="loginBtn" @click="sendPass">立即登录</button>
    <login-bar>
      <span slot="loginLeft"><router-link to="/login/register">立即注册</router-link></span>
      <span slot="loginRight"><router-link to="/login/editpass">忘记密码</router-link></span>
    </login-bar>
  </div>
</template>

<script>
  import navBar from 'components/navBar/navBar';
  import loginCode from "./LoginItem/loginCode";
  import loginPass from "./LoginItem/loginPass";
  import loginBar from "./LoginItem/loginBar";

  import {getLogin} from "network/login"
  import { mapActions } from 'vuex'
  import Until from 'common/Until'
  export default {
    name: "Login",
    components:{
      navBar,
      loginCode,
      loginPass,
      loginBar,
    },
    data(){
      return{
        curIndex:0,
        loginType:['密码登录','验证码登录'],
        phone: '',
        password:'',
        login_type:1
      }
    },
    created(){
      if (this.$store.state.Us){
        this.$router.replace('/user')
      }
    },
    methods:{
      ...mapActions([ 'alogin', // 将 `this.alogin()` 映射为 `this.$store.dispatch('alogin')`
      ]),
      LoginType(i){
        this.curIndex = i;
      },
      changeA(i){
        return this.curIndex == i ? ['active'] : ''
      },
      sendPass(){
        if (this.curIndex == 0){
          this.password = this.$refs.loginpass.password
        }else{
          this.password = this.$refs.logincode.password
        }
        if (Until.checkPhone(this.phone) && this.password.length >= 6){
          getLogin(this.phone,this.password,this.curIndex+1).then(res=>{
            if (res.State == 200){
              this.alogin(res.Us)
              this.$router.replace('/user')
            }else{
              this.$toast.show(res.Msg)
            }
          })
        }else{
          this.$toast.show('手机号或密码有误')
        }

      }

    },
  }
</script>

<style scoped>
  .login-type{
    display: flex;
    text-align: center;
    padding-top: 50px;
    color: var(--color-text);
    padding-bottom: 50px;
  }
  .login-btn{
    flex: 1;
    height: 24px; line-height: 24px;
  }
  .active span{
    border-bottom: 3px solid #215eec;
    padding-bottom: 10px;
  }
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