<template>
	<section>
		<el-card class="reclaim-info" v-for="(reclaim,index) in dataList.list" :key="index">
			<el-row class="info-title">
				<strong>{{reclaim.createDate}}</strong>&nbsp;&nbsp;&nbsp;回收单号: {{reclaim.reclaimId}}
			</el-row>
			<el-row :gutter="20" class="info-detail">
	    		<el-col :span="4">
	    			<img :src="url+reclaim.imgs[0]"/>
	    		</el-col>
	    		<el-col :span="8">
	    			<p><strong :title="reclaim.goodsDsc">{{reclaim.goodsDsc}}</strong></p>
					<p>货物数量：{{reclaim.number}}&nbsp;本</p>
					<p>期望价格：￥{{reclaim.tradPrice.toFixed(2)}} &nbsp;元</p>
					<p>备注: {{reclaim.notes}}</p>
	    		</el-col>
	    		<el-col :span="8">
	    			<p>回收人姓名：{{reclaim.sellerName}}</p>
					<p>回收人电话：{{reclaim.sellerPhone}}</p>
					<p>回收人地址：{{reclaim.sellerAddr}}</p>
	    		</el-col>
	    		<el-col :span="4">
	    			<p><h2>{{reclaim.state==0?'待查看':(reclaim.state==1?'同意回收':(reclaim.state==2?'交易成功':(reclaim.state==3?'拒绝回收':'未知')))}}</h2></p>
	    			<p style="margin-top: -20px;"><a @click="goReclaimInfo(reclaim.reclaimId)">回收单详情</a></p>
	    		</el-col>
			</el-row>
		</el-card>
		<el-row class="page">
			<el-col :span="24">
				<el-pagination
			      @current-change="handleCurrentChange"
			      :current-page="1"
			      :page-size="10"
			      layout="total,  prev, pager, next, jumper"
			      :total="dataList.total==undefined? 0: dataList.total">
			    </el-pagination>
			</el-col>
		</el-row>
	</section>
</template>

<script>
import {Host} from '../api/Host';
	export default {
		props: [
			'dataList',
			'state',
			'user',
			'dispatch',
		],
		data() {
			return {
			}
		},
		watch:{
		},
		methods: {
		    //订单详情
		    goReclaimInfo(reclaimId){
		    	this.$router.push({ path: '/person/reclaimDetail', query: { reclaimId: reclaimId}});
		    },
		    //分页
		    handleCurrentChange(val){
		        this.$store.dispatch(this.dispatch,{keyWord:'',pageSize:10,pageNum:val,state:this.state});
		    }
		},
		computed: {
   		 url(){
   		 	return Host+'bookpicture/';
   		 },
	    },
	}
</script>
<style scoped lang="scss">
.reclaim-info{
	margin-bottom: 10px;
	padding: 10px;
	width: 95%;
	.info-detail{
		border-bottom: 1px solid #D1DBE5;
		padding: 10px 0;
		p{
			margin: 15px 0;
			white-space:nowrap; 
            overflow:hidden;
            text-overflow:ellipsis;
		}
		
	}
	.info-title{
		padding-bottom: 10px;
		border-bottom: 1px solid #D1DBE5;
	}
	.info-result{
		padding: 10px 10px 0 0;
		text-align: right;
	}
	img{
		float: left;
		margin: 10px;
		width: 80px;
		height: 100px;
	}
}
.page{
    text-align: center;
    margin: 30px 0;
}
</style>
