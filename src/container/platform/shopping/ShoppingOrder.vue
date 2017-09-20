<template>
	<section class="shopping-order">
		<h1 ><strong class="title">{{$route.name}}</strong></h1>
		<el-steps class="regist-step" :space="300" :align-center="alignCenter" :center="center" :active="2">
		  	<el-step title="我的购物车"></el-step>
		 	<el-step title="我的订单"></el-step>
		 	<el-step title="完成订单"></el-step>
		</el-steps>
		<el-row style="margin-bottom: 30px;">
			<h2>收货人信息</h2>
			<el-card class="box-card" style="width: 40%;float: left;">
			  	<div class="text item">
			    	<p>收货人姓名：{{orderForm.receiver}}</p>
			    	<p>收货人电话：{{orderForm.phone}}</p>
			    	<p>收货人地址：{{orderForm.address}}</p>
			  	</div>
			</el-card>
			<el-button style="float: left;margin:100px 0 0 20px;" size="small" type="danger" @click="dialogFormVisible=true">新增收货人信息</el-button>
		</el-row>
		<el-row style="margin-bottom: 10px;">
			<h2>支付方式</h2>
			<el-card class="box-card" style="width: 40%;float: left;">
			  	<div>
			    	<p>支付方式：
			    		<el-radio-group v-model="orderForm.payMode">
						    <el-radio :label="0">货到付款</el-radio>
						    <el-radio :label="1" disabled>在线支付</el-radio>
						</el-radio-group>
			    	</p>
			  	</div>
			</el-card>
		</el-row>
		<el-row style="margin-bottom: 30px;">
			<h2>送货清单</h2>
			<el-table :data="orderBookList?orderBookList:[]" tooltip-effect="dark" style="width: 100%;margin-bottom: 30px;" class="order-goods">
			    <el-table-column label="书籍信息" show-overflow-tooltip>
			      	<template scope="scope">
				      	<img :src="url+scope.row.image_l"/>
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
			      		{{originFlag == 0 ? totalNum : scope.row.bookNum}}
			      	</template>
			    </el-table-column>
			    <el-table-column label="总价" width="130">
			      	<template scope="scope">
			      		￥{{ originFlag == 0 ? (scope.row.price*scope.row.discount*totalNum).toFixed(2) : (scope.row.price*scope.row.discount*scope.row.bookNum).toFixed(2)}}
			      	</template>
			    </el-table-column>
			</el-table>
		</el-row>
		<a @click="goBack()"> &nbsp;&nbsp;>>&nbsp;返回购物车</a>
		<hr />
		<!-- 统计 -->
		<el-row class="statistics">
			<el-col :span="24">
					<table>
						<tr>
							<td>商品数量：</td>
							<td>{{totalNum?totalNum:0}}</td>
						</tr>
						<tr>
							<td>商品金额：</td>
							<td>￥{{sumPrice.toFixed(2)}}</td>
						</tr>
						<tr>
							<td>运费：</td>
							<td>￥0.00</td>
						</tr>
						<tr>
							<td>应付金额：</td>
							<td><span class="price-font">￥{{sumPrice.toFixed(2)}}</span></td>
						</tr>
					</table>
			</el-col>
		</el-row>
		
		
		<el-row class="settlement">
			<span>
				<span style="float: left;padding-right: 30px;">本网站目前支付方式仅支持<strong color="red">货到付款</strong></span>
				寄送至：{{orderForm.address}} &nbsp;&nbsp;&nbsp;{{orderForm.receiver}}&nbsp;&nbsp;{{orderForm.phone}}
				<el-button style="margin-left: 20px;width: 100px;" size="small" type="danger" @click="addOrder">提交订单</el-button>
			</span>
		</el-row>
		<!--新增收货人信息-->
		<el-dialog title="收货地址" :visible.sync="dialogFormVisible" >
		  	<el-form :model="orderForm" :rules="orderFormRules" ref="orderForm">
		    	<el-form-item label="收货人姓名：" :label-width="formLabelWidth" prop="receiver">
		      		<el-input v-model="orderForm.receiver" auto-complete="off"></el-input>
	    		</el-form-item>
	    		<el-form-item label="收货人电话：" :label-width="formLabelWidth" prop="phone">
		      		<el-input v-model="orderForm.phone" auto-complete="off"></el-input>
	    		</el-form-item>
	    		<el-form-item label="收货人地址：" :label-width="formLabelWidth" prop="address">
		      		<el-input v-model="orderForm.address" auto-complete="off"></el-input>
	    		</el-form-item>
		  	</el-form>
		  	<div slot="footer" class="dialog-footer">
		    	<el-button @click="dialogFormVisible = false">取 消</el-button>
		    	<el-button type="primary" @click="addInfo">确 定</el-button>
		  	</div>
		</el-dialog>
	</section>
</template>

<script>
import {Host} from '../../../api/Host';
import { mapGetters } from 'vuex';
	export default {
		data() {
		    return {
		    	personForm:'',//收货人信息
		    	originFlag:0,//0来自立即购买，1来自购物车结算
		    	totalNum:0,//商品总数
		    	formLabelWidth: '120px',
		    	dialogFormVisible:false,
		    	alignCenter:true,
		    	center:true,
		    	//订单信息
		    	orderForm:{
		    		orderId:'',
		    		state:'',//取消订单-1，交易成功0，待付款1，待商家发货2，商家已经发货3，申请退款待商家确认4,退款成功5，申请退货待商家确认6，退货成功7，完成交易8，关闭交易9
		    		receiver:'',//收货人
		    		phone:'',//收货人电话
		    		address:'',
		    		delivery:'',//送货人
		    		deliveryDate:'',//送货时间
		    		receviverDate:'',//收货时间
		    		payMode:0,
		    	},
		    	orderFormRules: {
					receiver: [
						{ required: true, message: '请输入收货人姓名', trigger: 'change' }
					],
					phone: [
						{ required: true, message: '请输入收货人电话', trigger: 'change' },
						{ pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '请输入正确的手机号（例如：13101030301）' , trigger: 'blur,change' }
					],
					address: [
						{ required: true, message: '请输入收货人地址', trigger: 'change' },
					]
				},
				orderBookList: [],
		    }
		},
		methods: {
			//增加收货人信息
			addInfo(){
				this.$refs.orderForm.validate((valid) => {
					if (valid) {
						//this.$refs['orderForm'].resetFields();
						this.dialogFormVisible = false;
					}
				});
			},
			//提交订单 
			addOrder(){
				//收货人为空时
				if(this.orderForm.receiver=='' || this.orderForm.phone=='' || this.orderForm.address==''){
					this.$message({
						message:'请填写收货人信息',
						type:'warning'
					});
					return;
				}
				let orderBooks = [];
				//书籍数量和书籍号
				if(this.originFlag == 0){//立即购买来的
					this.orderBookList.map(item=>{
						let orderBook = {
							bookId : item.bookId,
							bookNum : this.totalNum
						};
						orderBooks.push(orderBook);
					});
				}else if(this.originFlag == 1){//购物车来的
					this.orderBookList.map(item=>{
						let orderBook = {
							bookId : item.bookId,
							bookNum : item.bookNum
						};
						orderBooks.push(orderBook);
					});
				}
				
				//书籍号（提交订单时用于删除购物车中已购买的书籍）
				let bookIds = this.orderBookList.map((item)=>item.bookId).toString();
				let para = Object.assign(this.orderForm,{orderBookList:orderBooks});
				if(this.orderForm.payMode == 0){//货到付款
					para.state = 1;//待付款
				}else if(this.orderForm.payMode == 1){//在线支付
					//以后做，若在线支付，点提交订单跳转至支付页面，选择支付方式，支付成功修改订单状态,现在默认是待付款
					para.state = 2;//待发货
				}
				this.$store.dispatch('addOrder',para).then((res)=>{
					if(res.status == 200){
						if(this.originFlag == 1){//购物车来的，删除购物车
							this.$store.dispatch('deleteShopCart',{bookIds:bookIds}).then((res)=>{
								if(res.status == 200){
									this.$router.push({path:'/shoppingSuccess'});
									this.$store.dispatch('getCartByUserCode',{pageNum:1,pageSize:9999});
								}
							});
						}else if(this.originFlag == 0){//立即购买来的
							this.$router.push({path:'/shoppingSuccess'});
							this.$store.dispatch('getCartByUserCode',{pageNum:1,pageSize:9999});
						}
					}else{
						this.$message({
							message: res.msg,
							type: 'error'
						});
					}
				});
			},
			//返回
			goBack(){
				this.$router.go(-1);
			},
			refresh(event){
				event.returnValue = "我在这写点东西...";
				event.preventDefault();
				
			},
  		},
  		computed:{
  			...mapGetters([
		 		'orderGoods',
		 		'cartGoods',
		 		'buyGoods',
		 		'bookInfo',//当前书籍
   			]),
   			url(){
	   		 	return Host+'bookpicture/';
	 		},
   			//价格计算统计
	        sumPrice(){
	            let sum = 0 ;
	            if(this.orderBookList[0]){
	            	if(this.originFlag == 0){//立即购买
		            	sum += parseFloat((this.orderBookList[0].price*this.orderBookList[0].discount*this.totalNum).toFixed(2));
		            }else{//购物车购买
		            	for(var i=0;i< this.orderBookList.length;i++){
			                sum += parseFloat((this.orderBookList[i].price*this.orderBookList[i].discount*this.orderBookList[i].bookNum).toFixed(2));
		                }
		            }
	            }
	            return sum;
            }
        },
  		mounted(){
  			const {flag,books}=this.$route.query;
  			if(flag == 'fromBuy' && typeof(books) == 'object'){//立即购买
  				//获取当前书籍
				this.$store.dispatch('getBook',{bookId:books.bookId}).then((res)=>{
					this.orderBookList.push(res); 
				});
				this.totalNum = books.bookNum;
				this.originFlag=0;
  			}
  			if(flag == 'fromCart' && typeof(books) == 'object'){//购物车结算
  				this.orderBookList= books; 
  				this.originFlag=1;
				for(var i=0;i< books.length;i++){
	                this.totalNum+=books[i].bookNum;
	            }
  			}
  			//监听刷新事件
  			addEventListener("beforeunload",this.refresh,false);
			
  		},
  		watch:{
  			orderBookList(){
  				if(typeof(this.orderBookList[0])=='string'){
  					this.orderBookList=[];
  				}
  			}
  		},
  		components: {
		},
		destroyed(){
			removeEventListener('beforeunload',this.refresh,false);
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
	.order-goods{
		margin-top: 30px;
		img{
			padding: 10px;
			float:left;
		  	width:65px;
      		height:85px;
		}
	}
	
	h2 {
		padding-bottom: 10px;
		border-bottom: 2px solid #c7161c;
	}
	.statistics{
		float: right;
		margin:10px 10px 10px 0;
		table td:first-child{
			text-align: right;
		}
		table td{
			text-align: left;
		}
	}
	.line{
		width: 100%;
		float: right;
		border-bottom: 2px solid #eef1f6;
	}
	.settlement{
		width: 100%;
		margin-bottom: 30px;
		float: right;
		background-color: #eef1f6;
		height: 50px;
		line-height: 50px;
		span{
			line-height: 50px;
			float: right;
			margin-right: 10px;
		}
	}
	.el-input{
		width: 90%;
	}
	
}
</style>