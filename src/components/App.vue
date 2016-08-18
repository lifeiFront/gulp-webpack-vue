<style>

  .bounce-transition {
    display: block; /* 否则 scale 动画不起作用 */
  }
  .bounce-enter {
    animation: bounce-in 2s;
  }
  .bounce-leave {
    animation: bounce-out 2s;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes bounce-out {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(0);
    }
  } 
 /*  @keyframes bounce-in {
   0% {
     transform: translateX(-100%);
   }
   50% {
     transform: translateX(-50%);
   }
   100% {
     transform: translateX(0);
   }
 }
 @keyframes bounce-out {
   0% {
     transform: translateX(0);
   }
   50% {
     transform: translateX(50%);
   }
   100% {
     transform: translateX(100%);
   }
 } */
</style>
<template>
  <div id="wrapper">
    <nav class="navbar navbar-default">
      <div class="container">
        <a class="navbar-brand" href="#">
          <i class="glyphicon glyphicon-time"></i>
          计划表
        </a>
        <ul class="nav navbar-nav">
          <li><a v-link="'/home'">首页</a></li>
          <li><a v-link="'/time-entries'">计划列表</a></li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <div class="col-sm-3">
          <sidebar :time="totalTime"></sidebar>
      </div>
      <div class="col-sm-9">
        <!--route单页应用出入场动画 transition-mode="out-in"表示先进行出厂动画，再入场。入场组件，出厂组件同在div容器中切换-->
        <router-view 
      transition="bounce" 
      transition-mode="out-in"
      ></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  var  Sidebar = require('./Sidebar.vue');
  module.exports = {
    components: { 'sidebar': Sidebar },
    data:function(){
      return {
        totalTime: 1.5
      }
    },
    events: {
      timeUpdate:function (timeEntry) {
        this.totalTime += parseFloat(timeEntry.totalTime)
      },
      deleteTime:function (timeEntry) {
        this.totalTime -= parseFloat(timeEntry.totalTime)
      }
    }
  }
  
</script>