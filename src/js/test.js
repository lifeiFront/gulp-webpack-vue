var Vue = require('vue');
var App = require('../components/testApp.vue');
var vm = new Vue({
	el: '#testApp',
	components: {
		app: App
	}
});

require.ensure(['../components/A.vue'], function(require){
    new Vue({
        el: '#A',
        components: {
            'module-a': require('../components/A.vue')
        }
    });
}, 'moduleA');//可以指定异步加载通过webpack打包后的js文件名