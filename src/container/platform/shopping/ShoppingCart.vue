<template>
	<section class="shopping-cat">
		<h1 ><strong class="title">{{$route.name}}</strong></h1>
		<el-steps class="regist-step" :space="300" :align-center="alignCenter" :center="center" :active="1">
		  	<el-step title="我的购物车"></el-step>
		 	<el-step title="我的订单"></el-step>
		 	<el-step title="完成订单"></el-step>
		</el-steps>
		<el-table
			v-loading="loading"
    		element-loading-text="拼命加载中"
		    ref="multipleTable"
		    :data="myCart?myCart.list:[]"
		    tooltip-effect="dark"
		    style="width: 90%;margin-bottom: 30px;"
		    @selection-change="handleSelectionChange"
		    class="cart-goods">
		    <el-table-column
		      	type="selection"
		      	width="55">
		    </el-table-column>
		    <el-table-column
		      	label="书籍信息"
		      	show-overflow-tooltip>
		      	<template scope="scope">
			      	<a @click="toGoodsInfo(scope.row.bookId)"><img :src="url+scope.row.image_l"/></a>
			      	<a @click="toGoodsInfo(scope.row.bookId)"><p><h2>{{ scope.row.bookName }}</h2></p></a>
					<p>{{ scope.row.author }}</p>
		      	</template>
		    </el-table-column>
		    <el-table-column
		      	label="单价"
		      	width="150">
		      	<template scope="scope">
					￥{{ (scope.row.price*scope.row.discount).toFixed(2)  }}&nbsp;&nbsp;(<s>￥{{scope.row.price.toFixed(2)}}</s>)
		      	</template>
		    </el-table-column>
		    <el-table-column
		      	prop="num"
		      	label="数量"
		      	width="170">
		      	<template scope="scope">
			      	<el-input-number size="small" @change="handleChange" v-model="scope.row.bookNum" :min="1" :max="10"></el-input-number>
		      	</template>
		      	
		    </el-table-column>
		    <el-table-column
		    	prop="totalPrice"
		      	label="总价"
		      	width="100">
		      	<template scope="scope">
		      		￥{{ (scope.row.price*scope.row.discount*scope.row.bookNum).toFixed(2) }}
		      	</template>
		    </el-table-column>
		    <el-table-column label="操作" width="100">
		      	<template scope="scope">
		        	<el-button
		          		size="small"
		          		type="danger"
		          		@click="handleDelete(scope.$index, scope.row)">删除</el-button>
		      	</template>
		    </el-table-column>
		</el-table>
		<el-row class="settlement">
			<el-col :span="5">
				<a @click="batchDel"  style="cursor:pointer;padding-left: 20px;"> 批量删除 </a>
			</el-col>
			<el-col :span="5">
				已选择<span style="color: red;">{{this.multipleSelection.length}}</span>件商品
			</el-col>
			<el-col :span="14">
				<span  style="float: right;margin-right: 30px;">
					总计（不含运费）：<span style="color: red;">￥{{sumPrice}}</span>
					<el-button style="margin-left: 20px;width: 100px;" size="small" type="danger" @click="handleSettlement">结算</el-button>
				</span>
			</el-col>
		</el-row>
	</section>
</template>

<script>
import { mapGetters } from 'vuex';
import {Host} from '../../../api/Host';
	export default {
		data() {
		    return {
		    	loading:false,
		    	user:'',//当前用户
		    	alignCenter:true,
		    	center:true,
		        multipleSelection: []
		    }
		},
		methods: {
			//计数器
			handleChange(value){
				//console.log(value);
			},
			//复选框
			handleSelectionChange(val) {
		        this.multipleSelection = val;
		    },
		    //单个删除
		    handleDelete(index,row){
		    	this.$store.dispatch('deleteShopCart',{bookIds:row.bookId}).then((res)=>{
		    		if(res.status ==200){
		    			//重新获取用户购物车信息
						this.$store.dispatch('getCartByUserCode',{pageNum:1,pageSize:9999});
		    		}else{
		    			this.$message({
				          	message: '删除商品失败',
				          	type: 'error'
				        });
		    		}
		    	});
		    },
		    //商品详情
		    toGoodsInfo(bookId){
		    	this.$router.push({ path: '/shopping', query: { bookId: bookId}});
		    },
		    //结算
		    handleSettlement(){
		    	if(this.multipleSelection.length == 0){
		    		this.$message({
		    			message:'请选择要结算的商品',
		    			type:'warning'
		    		});
		    		return;
		    	}
		    	this.$router.push({ path: '/shoppingOrder', query: { flag: 'fromCart',books : this.multipleSelection  } });
		    },
		    //批量删除
		    batchDel(){
		    	this.multipleSelection.map((item)=>{
		    		item.bookId
		    	})
		    	let bookIds = this.multipleSelection.map((item)=>
		    		item.bookId
		    	).toString();
		    	this.$store.dispatch('deleteShopCart',{bookIds:bookIds}).then((res)=>{
		    		if(res.status ==200){
		    			//重新获取用户购物车信息
						this.$store.dispatch('getCartByUserCode',{pageNum:1,pageSize:9999});
		    		}else{
		    			this.$message({
				          	message: '删除商品失败',
				          	type: 'error'
				        });
		    		}
		    	});
		    },
  		},
  		computed:{
  			...mapGetters([
				'myCart'
	   		 ]),
	        sumPrice(){
	            let sum = 0 ;
	            for(var i=0;i< this.multipleSelection.length;i++){
	                sum = (sum *1 + this.multipleSelection[i].price*this.multipleSelection[i].discount*this.multipleSelection[i].bookNum ).toFixed(2);
                }
	            return sum;
           	},
           	url(){
   		 		return Host+'bookpicture/';
   		 	},
        },
  		mounted(){
			//当前用户
  			const platformUser = JSON.parse(sessionStorage.getItem('platformUser'));
  			if(platformUser){
  				this.user = platformUser;
	  			//获取用户购物车
	  			this.loading = true; 
				this.$store.dispatch('getCartByUserCode',{createUser:platformUser.userCode,pageNum:1,pageSize:9999}).then((res)=>{
					this.loading = false; 
				});
  			}
  		},
  		components: {
		}
	}

</script>

<style scoped lang="scss">
.shopping-cat{
	width:90%;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 30px;
    .title{
		padding:0 10px 0 30px;
		border-right: 3px solid #c7161c;
	}
	.cart-goods{
		margin-top: 30px;
		margin-left: 30px;
	}
	img{
		padding: 10px;
		float:left;
      	width:65px;
      	height:85px;
	}
	.settlement{
		background-color: #eef1f6;
		height: 40px;
		line-height: 40px;
	}
}
</style>