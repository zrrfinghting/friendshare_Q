<template>
	<section class="my-reclaim">
		<h2 ><strong class="title">{{$route.name}}</strong></h2>
		<div class="my-reclaim-detail">
			<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			    <el-tab-pane label="全部回收单" name="-2">
			    	<CommReclaim :dataList="myReclaimList" :state="state" :dispatch="dispatch"/>
			    </el-tab-pane>
			    <el-tab-pane label="待查看" name="0">
			    	<CommReclaim :dataList="myReclaimList" :state="state" :dispatch="dispatch"/>
			    </el-tab-pane>
			    <el-tab-pane label="待回收" name="1">
			    	<CommReclaim :dataList="myReclaimList" :state="state" :dispatch="dispatch"/>
			    </el-tab-pane>
			    <!--<el-tab-pane label="回收成功" name="2">
			    	<CommReclaim :dataList="myReclaimList" :state="state" :dispatch="dispatch"/>
			    </el-tab-pane>-->
			</el-tabs>
		</div>
	</section>
</template>

<script>
	import { mapGetters } from 'vuex';
	import CommReclaim from '../../../components/CommReclaim';
	export default {
		data() {
			return {
				user:'',//当前用户
				state:-2,//分类状态(//类别  -2获取所有, 0待商家查看，1达成交易，2交易完成)
				activeName:'-2',
				dispatch:'getMyReclaimList'
			}
		},
		methods: {
			//标签切换
		    handleClick(tab, event) {
		        this.state = Number(tab.name);
		        this.$store.dispatch('getMyReclaimList',{pageSize:10,pageNum:1,keyWord:'',state:this.state});
		    },
		},
		computed: {
		 ...mapGetters([
		 		'myReclaimList',
   			]),
	    },
		mounted() {
			this.$store.dispatch('getMyReclaimList',{pageSize:10,pageNum:1,keyWord:'',state:-2});
		},
		components: {
			CommReclaim,
		},
	}

</script>

<style scoped lang="scss">
.my-reclaim{
	.title{
		padding:0 10px 0 30px;
		border-right: 3px solid #c7161c;
	}
	.my-reclaim-detail{
		padding-top: 10px;
		width: 90%;
		margin: auto;
	}
}
</style>