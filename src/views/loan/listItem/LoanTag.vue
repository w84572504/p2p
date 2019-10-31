<template>
  <div class="tags">
    <div :class="isActive(i)" class="tagsItem" v-for="(v,i) in tags" :key="i" @click="changTag(i)"><span>{{v}}</span></div>
    <div class="tagline" ref="line"></div>
  </div>
</template>

<script>
  export default {
    name: "LoanTag",
    data(){
      return{
        active:this.on
      }
    },
    props:{
      tags:Array,
      on:Number
    },
    mounted(){
      let wid = 100/(this.tags.length*2 ) //一份大小
      let movew = wid+wid*2*this.active
      this.$refs.line.style.width =wid+'vw';
      this.$refs.line.style.transform ='translateX('+movew+'vw) translateX(-50%)';
    },
    methods:{
      changTag(i){
        this.active = i
        let wid = 100/(this.tags.length*2 )
        let movew = wid+wid*2*i
        this.$refs.line.style.width =wid+'vw';
        this.$refs.line.style.transform ='translateX('+movew+'vw) translateX(-50%)';
        this.$emit('changeActive',i)
      },
      isActive(i){
        return this.active ===i ? ['chose'] :''
      }
    },
    computed:{
    }
  }
</script>

<style scoped>
.tags{
  display: flex;
  height: 44px;
  overflow: hidden;
  padding-bottom: 15px;
  position: relative;
  background-color: #fff;

}
  .tagsItem{
    position: relative;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    box-sizing: border-box;
    min-width: 0;
    padding: 0 5px;
    color: #7d7e80;
    font-size: 14px;
    line-height: 44px;
    text-align: center;
    cursor: pointer;
    height: 44px;
  }
  .chose{
    color: #2054e5;
  }
  .tagline{
    transition-duration: 0.3s;
    position: absolute;
    bottom: 0px;
    left: 0;
    z-index: 1;
    height: 3px;
    background-color: #2054e5;
    border-radius: 3px;
  }
</style>