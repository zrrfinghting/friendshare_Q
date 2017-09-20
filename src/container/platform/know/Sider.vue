<template>
	<el-row class="my-sider">
		 <el-menu default-active="$route.path" class="el-menu-vertical-demo" @select="handleSelect">
	        <el-menu-item index="aboutUs">关于我们</el-menu-item>
	        <el-menu-item index="contactUs">联系我们</el-menu-item>
	        <el-menu-item index="agreement">网站协议</el-menu-item>
		</el-menu>
	</el-row>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		methods:{
			handleSelect(key, keyPath){
				this.$router.push({ path: '/know/' + key });
			}
		},
		components: {
		}
	}

</script>

<style lang="scss">
.my-sider{
	li.el-menu-item{
		border-bottom: 1px solid #f2f5f9;
		background-color: white;
	}
	li.el-menu-item:hover,li.el-menu-item.is-active{
		background-color: #f2f5f9;
	}
}
</style>