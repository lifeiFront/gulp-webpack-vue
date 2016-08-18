<template>
	<div class="app">
		<component-b></component-b>
		<component-c></component-c>
	</div>
</template>

<script>
	var ComponentB = require('./B.vue');
	var ComponentC = require('./C.vue');
	module.exports = {
		components:{
			ComponentB,ComponentC
		}
	}
</script>