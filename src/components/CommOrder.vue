<template>
	<section>
		<el-card class="order-info" v-for="(order,index) in dataList.list" :key="index">
			<el-row class="info-title">
				<strong>{{order.createDate}}</strong>&nbsp;&nbsp;&nbsp;订单号: {{order.orderId}}
				<span style="float: right;margin-right: 20px;" v-text="stateShow(order.state,order.payMode)"></span>
			</el-row>
			<el-row :gutter="20" class="info-detail" v-for="(book,index) in order.books" :key="index">
	    		<el-col :span="4">
	    			<a @click="toGoodsInfo(book.bookId)"><img :src="url+book.image_l"/></a>
	    		</el-col>
	    		<el-col :span="10">
	    			<p><strong :title="book.bookName"><a @click="toGoodsInfo(book.bookId)">{{book.bookName}}</a></strong></p>
					<p :title="book.author">{{book.author}}</p>
					<p>数量：{{book.bookNum}}</p>
					<p>单价：￥{{(book.price*book.discount).toFixed(2)}}(<s>￥{{book.price.toFixed(2)}}</s>)</p>
	    		</el-col>
	    		<el-col :span="5">
	    			<p><h2>总金额：￥{{(book.price*(book.discount)*book.bookNum).toFixed(2)}}</h2></p>
					<p>运费：￥0</p>
	    		</el-col>
	    		<el-col :span="5">
	    			<p><h2><span v-text="stateShow(book.state,order.payMode)"></span></h2></p>
					<p style="margin-top: -10px;"><a @click="backMoney(order.orderId,book.bookId,order.state)"><span v-text="operateShow(book.state,order.payMode)"></span></a></p>
					<p><a @click="goOrderInfo(order.orderId)">订单详情</a></p>
	    		</el-col>
			</el-row>
			<el-row class="info-result">
				<strong>合计：￥{{order.price.toFixed(2)}}</strong>
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
			stateShow(state,payMode){
				let st = "";
				if(state == -1){
					st = '已取消';
				}else if(state == 0){
					st = '交易成功';
				}else if(state == 1 && payMode ==0){//货到付款+待付款 = 待发货
					st = '待发货';
				}else if(state == 1 && payMode ==1){//在线支付+待付款 = 待付款
					st = '待付款';
				}else if(state == 2){
					st = '待发货';
				}else if(state == 3){
					st = '待收货';
				}else if(state == 4){
					st = '退款中';
				}else if(state == 5){
					st = '退款成功';
				}else if(state == 6){
					st = '退货中';
				}else if(state == 7){
					st = '退货成功';
				}else if(state == 9){
					st = '交易关闭';
				}
				return st;
			},
			//操作按钮文本显示
			operateShow(state,payMode){202
				let operate = '';
				if(state == 2 && payMode ==1){//在线支付已付款，显示退款
					operate = '申请退款';
				}else if(state == 1 && payMode ==0){//货到付款,未发货前可以取消订单
					operate = '取消订单';
				}else if(state == 3){//已发货，显示退货
					operate = '申请退货';
				}else if(state == 1){//待付款，显示取消订单
					operate = '取消订单';
				}
				return operate;
			},
			//退款退货
			backMoney(orderId,bookId,state){
				let para = '';
				let flag = '';
				if(state == 2){//已付款，显示退款
					flag = '申请退款';
					para = {orderId:orderId,bookId:bookId,state:4};//4 申请退款
				}else if(state == 3){//已发货，显示退货
					flag = '申请退货';
					para = {orderId:orderId,bookId:bookId,state:6};//6申请退货
				}else if(state == 1){//待付款，显示取消订单
					flag = '取消订单';
					para = {orderId:orderId,bookId:bookId,state:-1};//-1 取消订单
				}
				this.$store.dispatch('changeOrderState',para).then((res)=>{
					if(res.status == 200){
						this.$message({
							message:'您已成功'+flag,
							type:'success'
						});
						this.$store.dispatch('getMyOrderList',{userCode:this.user.userCode,pageSize:10,pageNum:1,state:-2});
					}else{
						this.$message({
							message:'您已成功'+flag,
							type:'error'
						});
					}
				});
			},
			//商品详情
		    toGoodsInfo(bookId){
		    	this.$router.push({ path: '/shopping', query: { bookId: bookId}});
		    },
		    //订单详情
		    goOrderInfo(orderId){
		    	this.$router.push({ path: '/person/orderDetail', query: { orderId: orderId}});
		    },
		    //分页
		    handleCurrentChange(val){
		        this.$store.dispatch(this.dispatch,{userCode:this.user.userCode,pageSize:10,pageNum:val,state:this.state});
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
.order-info{
	margin-bottom: 10px;
	padding: 10px;
	width: 95%;
	.info-detail{
		border-bottom: 1px solid #D1DBE5;
		padding: 10px 0;
		p{
			margin: 5px 0;
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
		margin-top: 10px;
		width: 80px;
		height: 100px;
	}
}
.page{
    text-align: center;
    margin: 30px 0;
}
</style>
