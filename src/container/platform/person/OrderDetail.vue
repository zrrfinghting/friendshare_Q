<template>
	<section class="my-order-detail">
		<h2 ><strong class="title">{{$route.name}}</strong></h2>
		<div class="order-detail">
			<el-card>
				<el-row>
					<strong class="label-text">收货地址:</strong>
					<span>{{orderInfo.address}}</span>
				</el-row>
				<el-row>
					<strong class="label-text">运送方式:</strong>
					<span>送货上门</span>
				</el-row>
				<el-row>
					<strong class="label-text">支付方式:</strong>
					<span>{{orderInfo.payMode==0?'货到付款':'在线支付'}}</span>
				</el-row>
				<hr/>
				<el-row>
					<strong class="label-text">卖家信息:</strong>
				</el-row>
				<el-row>
					<el-col :span="8">
						<span class="tab-label-text">店铺名称:</span><span >{{orderInfo.sellerInfo?orderInfo.sellerInfo.sellerName:''}}</span>
					</el-col>
					<el-col :span="8">
						<span class="tab-label-text">店铺地址:</span><span >{{orderInfo.sellerInfo?orderInfo.sellerInfo.sellerAddr:''}}</span>
					</el-col>
					<el-col :span="8">
						<span class="tab-label-text">卖家电话:</span><span >{{orderInfo.sellerInfo?orderInfo.sellerInfo.phone:''}}</span>
					</el-col>
				</el-row>
				<hr/>
				<el-row>
					<strong class="label-text">订单信息:</strong>
				</el-row>
				<el-row>
					<el-col :span="8">
						<span class="tab-label-text">订单编号:</span><span >{{orderInfo.orderId}}</span>
					</el-col>
					<el-col :span="8">
						<span class="tab-label-text">创建时间:</span><span >{{orderInfo.createDate}}</span>
					</el-col>
					<el-col :span="8">
						<span class="tab-label-text">订单状态:</span><span v-text="stateShow(orderInfo.state,orderInfo.payMode)"></span>
					</el-col>
				</el-row>
				<hr/>
					<el-table :data="orderInfo.books?orderInfo.books:[]" tooltip-effect="dark" style="width: 100%;margin-bottom: 30px;" class="order-goods">
					    <el-table-column label="书籍信息" show-overflow-tooltip>
					      	<template scope="scope">
						      	<a @click="toGoodsInfo(book.bookId)"><img :src="url+scope.row.img_l"/></a>
						      	<p><h3>{{ scope.row.bookName }}</h3></p>
								<p>{{ scope.row.author }}</p>
					      	</template>
					    </el-table-column>
					    <el-table-column label="单价" width="200">
					      	<template scope="scope">
					      		￥{{ (scope.row.price*scope.row.discount).toFixed(2) }}&nbsp;(<s>原价:￥{{scope.row.price.toFixed(2)}}</s>)
					      	</template>
					    </el-table-column>
					    <el-table-column label="数量" width="130">
					    	<template scope="scope">
					      		{{scope.row.bookNum}}
					      	</template>
					    </el-table-column>
					    <el-table-column label="总价" width="130">
					      	<template scope="scope">
					      		￥{{(scope.row.price*scope.row.discount*scope.row.bookNum).toFixed(2)}}
					      	</template>
					    </el-table-column>
					     <el-table-column label="状态" width="130" prop="state">
					      	<template scope="scope">
					      		<h2><span v-text="stateShow(scope.row.state,orderInfo.payMode)"></span></h2>
					      	</template>
					    </el-table-column>
					</el-table>
					<el-row class="info-result">
						<strong>合计：￥{{sumPrice}}</strong>
					</el-row>
			</el-card>
		</div>
	</section>
</template>

<script>
import {mapGetters} from 'vuex'; 
import {Host} from '../../../api/Host';
import util from '../../../util/util';
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			//商品详情
		    toGoodsInfo(bookId){
		    	this.$router.push({ path: '/shopping', query: { bookId: bookId}});
		    },
		    //状态显示
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
		},
		computed: {
			...mapGetters([
				'orderInfo',
			]),
	   		url(){
	   		 	return Host+'bookpicture/';
	   		},
   		 	//价格计算统计
	        sumPrice(){
	            let sum = 0 ;
	            if(this.orderInfo.books){
	            	for(var i=0;i< this.orderInfo.books.length;i++){
		                sum += parseFloat((this.orderInfo.books[i].price*this.orderInfo.books[i].discount*this.orderInfo.books[i].bookNum).toFixed(2));
	                }
	            }
	            return sum;
	        }
	    },
		mounted() {
			const {orderId} = this.$route.query;
			this.$store.dispatch('getOrderByOrderId',{orderId:orderId});
		},
		components: {
		}
	}

</script>

<style scoped lang="scss">
.my-order-detail{
	.title{
		padding:0 10px 0 30px;
		border-right: 3px solid #c7161c;
	}
	.order-detail{
		padding-top: 10px;
		width: 90%;
		margin: auto;
		.label-text{
			padding-right: 20px;
		}
		.tab-label-text{
			padding-right: 10px;
		}
		.el-row{
			padding: 10px;
		}
		img{
			float: left;
			width: 80px;
			height: 100px;
			margin: 10px;
		}
	}
}
</style>