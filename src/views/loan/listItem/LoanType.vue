<template>
  <div class="loantypes">
    <van-dropdown-menu>
      <van-dropdown-item v-for="(v,i) in data" :title="v.title" :key="i" :options="getlist(i)" @change="emitVal($event,i)">
      </van-dropdown-item>
    </van-dropdown-menu>
  </div>
</template>

<script>
  export default {
    name: "LoanType",
    props:{
      data:Array
    },
    data(){
      return{
        a:0
      }
    },
    methods:{
      getlist(i){
        let arrs = [];
        this.data[i].list.forEach(e=>{
          let arr = {}
          arr.text = e.name
          arr.value = e.id
          arrs.push(arr)
        })
        return arrs
      },
      emitVal(key,val){
        this.$emit('changeVal',val,key)
      }
    }
  }
</script>

<style scoped>
.loantypes{
  width: 100%;
}
</style>