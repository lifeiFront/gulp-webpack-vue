<template>
<br><br><br><br><br>
<div v-text="msg"></div>
<common></common>
<br><br><br><br><br>
</template>

<script>
var common = require('./common.vue');
module.exports = {
	data: function() {
		return {
			msg: '我是moduleB'
		}
	},
	components:{
      common
    }
};
</script>