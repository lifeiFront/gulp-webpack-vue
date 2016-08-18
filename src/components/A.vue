<style>
.container {
  border: 1px solid #00f;
  background: url(../images/checkbox.png) center center no-repeat
}
.red {
  color: #f00;
}
</style>

<template>
  <div class="container">
    <h2 class="red">{{msg}}</h2>
    <img src="../images/ico.jpg">
  </div>
  <input type="text"  v-model="msg" debounce="500">
  <common></common>

</template>

<script>
var common = require('./common.vue');
module.exports={
  data:function(){
    return {
      msg:'红色文字'
    }
  },
  components:{
      common
    }
}

</script>