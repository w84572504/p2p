<template>
  <div class="fCon">
    <van-row justify="center" type="flex" >
      <van-col span="22" class="top-box">
        <p class="title">{{title}}</p>
        <div v-for="(item,i) in data" :key="i" class="Con">
          <div class="leftCon">
            {{item.name}}
          </div>
          <div class="rightCon" v-html="item.value">
            {{item.value}}
          </div>
          <div style="clear: both"></div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
  export default {
    name: "DetailList",
    components:{
    },
    props:{
      data:Array,
      title:String
    },
    created() {
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
    flex: 2;
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
  .title{
    border-left: 2px solid #2570f4;
    line-height: 12px;
    padding: 0 5px;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 14px;
  }
</style>