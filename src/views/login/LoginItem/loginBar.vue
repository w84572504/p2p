<template>
  <div class="loginbar">
    <i><slot name="loginLeft"></slot></i>
    |
    <i><slot name="loginRight"></slot></i>
  </div>
</template>

<script>
  export default {
    name: "loginBar"
  }
</script>

<style scoped>
.loginbar{
  text-align: center;
  color: #737373;
  padding-top: 50px;
}
.loginbar i {
  font-style: normal;
  padding: 0 10px;
}
  .loginbar i span a{color: #737373;}
</style>