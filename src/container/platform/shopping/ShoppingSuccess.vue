<template>
	<section class="shopping-order">
		<h1 ><strong class="title">{{$route.name}}</strong></h1>
		<el-steps class="regist-step" :space="300" :align-center="alignCenter" :center="center" :active="3" finish-status="success">
		  	<el-step title="我的购物车"></el-step>
		 	<el-step title="我的订单"></el-step>
		 	<el-step title="完成订单"></el-step>
		</el-steps>
		<div style="height: 450px;width: 100%;">
			<h1 style="line-height:250px;height: 250px;width: 100%;text-align: center;">购买成功，我们将尽快为您发货！</h1>
			<div class="footer-button">
				<el-button  type="primary" @click="goHome">返回首页</el-button>
			</div>
		</div>
	</section>
</template>

<script>
import { mapGetters } from 'vuex'
	export default {
		data() {
		    return {
		    	alignCenter:true,
		    	center:true,
		    }
		},
		methods: {
			goHome(){
				this.$router.push({path:'/main'});
			}
  		},
  		computed:{
  			...mapGetters([
   			]),
        },
  		mounted(){
  			
  		},
  		components: {
		}
	}

</script>

<style scoped lang="scss">
.shopping-order{
	width:90%;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 30px;
    .title{
		padding:0 10px 0 0;
		border-right: 3px solid #c7161c;
	}
}
</style>