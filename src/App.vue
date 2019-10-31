<template>
  <div id="app">
<!--    <keep-alive>-->
      <router-view/>
      <loading />
<!--    </keep-alive>-->
  </div>
</template>

<script>
  import Home from "views/home/Home";
  import Loading from "components/Loding/Loding";
  export default {
    name: 'home',
    components: {
      Home,
      Loading
    },
  }
</script>
<style>
  @import url('assets/css/base.css');

</style>
