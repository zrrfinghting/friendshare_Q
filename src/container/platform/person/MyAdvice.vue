<template>
	<section class="my-advice">
		<h2 ><strong class="title">{{$route.name}}</strong></h2>
		<div class="my-advice-detail">
			<el-card v-for="o in 5" :key="o" style="margin-bottom: 5px;">
			  	<div slot="header" style="line-height: 20px;height: 20px;">
			    	<strong style="font-size: 1.2em;">问题：xxxxxxxxxxxxxxxxxxxx</strong>
			  	</div>
			  	<div style="line-height: 60px;min-height: 60px;">
			    	xxxxxxxxxxxxxxxxxxxxxx
			  	</div>
			</el-card>
		</div>
		<el-row class="page">
			<el-col :span="24">
				<el-pagination
			      @current-change="handleCurrentChange"
			      :current-page="1"
			      :page-size="10"
			      layout="total,  prev, pager, next, jumper"
			      :total="12">
			    </el-pagination>
			</el-col>
		</el-row>
	</section>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			//分页
			handleCurrentChange(val){
			},
		},
		computed: {
	    },
		mounted() {
		},
		components: {
		}
	}

</script>

<style scoped lang="scss">
.my-advice{
	.title{
		padding:0 10px 0 30px;
		border-right: 3px solid #c7161c;
	}
	.my-advice-detail{
		padding-top: 10px;
		width: 95%;
		margin: auto;
	}
	.page{
        text-align: center;
        margin: 30px 0;
    }
}
</style>