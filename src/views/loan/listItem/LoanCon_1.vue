<template>
  <div>
    <scroll class="wrapper" ref="wrapper" :data="data.zhanshi" @pullingDown="pullingDown">
      <div class="content">
        <van-row justify="center" type="flex" class="banner">
          <van-col span="20"><van-image :src="data.img" /></van-col>
        </van-row>
        <detail-list :data="data.xiangqing" title="项目详情"></detail-list>
        <detail-list :data="data.loanUser" title="借款人信息"></detail-list>
        <van-swipe class="info-swiper">
          <van-swipe-item v-for="(v, index) in data.zhanshi" :key="index">
            <van-image :src="v.image" @click="showImg(data.zhanshi)"/>
          </van-swipe-item>
        </van-swipe>
        <detail-list :data="data.collateral" title="抵押物信息"></detail-list>
        <van-row justify="center" type="flex" >
          <van-col span="22" class="top-box">
            <van-swipe class="info-swiper">
              <van-swipe-item v-for="(v, index) in data.ziliao" :key="index">
                <van-image :src="v.image" @click="showImg(data.ziliao)"/>
              </van-swipe-item>
            </van-swipe>
          </van-col>
        </van-row>
        <p class="bt-bg"></p>
      </div>
    </scroll>
    <van-image-preview v-model="show" :images="images" @change="onChange" />
  </div>
</template>

<script>
  import titleNav from "components/titleNav";
  import Scroll from "components/scroll/Scroll";

  import DetailList from "./DetailList";
  import {getLoanDetail_2} from "network/loan";
  export default {
    name: "LoanCon_1",
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
        show: false,
        images:[],
      }
    },
    created() {
      this._getLoanDetail_2()
    },
    methods:{
      _getLoanDetail_2(){
        getLoanDetail_2(this.id).then( res =>{
          console.log(res);
          if (res.State !== '200'){
            this.$toast.show(res.Msg)
          }else {
            this.data= res.Msg.List
          }
        })
      },
      showImg(data){
        let datas = data.map(res=>res.image);
        this.images = datas
        this.show=true
      },
      onChange(index) {
        this.index = index;
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
</style>