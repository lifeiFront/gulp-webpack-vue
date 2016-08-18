<template>
	<div @click="tapE">点击我，我是公共模块</div>
</template>
<script>
	module.exports={
		methods:{
			tapE:function(){
				alert('公共模块');
			}
		}
	}
</script>