<template>
  <div class="fCon">
    <van-row justify="center" type="flex" >
      <van-col span="22" class="top-box">
        <slot name="title"></slot>
        <div v-for="(item,i) in data" :key="i" class="Con">
          <div class="leftCon">
            {{item[0]}}
          </div>
          <div class="rightCon" v-html="item[1]">
            {{item[1]}}
          </div>
          <div style="clear: both"></div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
  import titleNav from "components/titleNav";
  export default {
    name: "LoanCon",
    components:{
      titleNav
    },
    props:{
      data:Array
    }
  }
</script>

<style scoped>
  .fCon{
    padding-top: 20px
  }
  .Con{
    width: 100%;
    display: flex;
  }
  .leftCon{
    flex: 1;
    font-size: 13px;
    color: #737373;
    padding:10px 0px 10px 0px
  }
  .rightCon{
    flex: 4;
    float: left;
    font-size: 13px;
    padding:10px 0px 10px 0px
  }
</style>