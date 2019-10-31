<template>
  <div>
    <van-row justify="center" type="flex" v-if="data.length !== 0">
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
  .Con{
    width: 100%;
  }
  .leftCon{
    float: left;
    padding:10px 30px 0px 0px;
    font-size: 14px;
    color: #737373;
  }
  .rightCon{
    float: left;
    font-size: 14px;
    padding:10px 0px 10px 0px
  }
</style>