var Vue = require('vue');
var App = require('../components/App.vue');
var Home = require('../components/Home.vue');
var TimeEntries = require('../components/TimeEntries.vue');
var LogTime = require('../components/LogTime.vue');
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');
//注册两个插件
Vue.use(VueResource);
Vue.use(VueRouter);
var router = new VueRouter();

//路由map
router.map({
  '/Home': {
    component: Home
  },
  '/time-entries': {
    component: TimeEntries,
    subRoutes:{
    	'/log-time':{
    		component:LogTime
    	}
    }
  }
});


router.redirect({
  '*': '/Home'
});
router.start(App, '#app');

