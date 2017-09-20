<template>
	<section class="shopping-container">
		<el-row class="shop-info">
			<el-col :xs="4" :sm="4" :md="5" :lg="5">
				<img :src='url+bookInfo.image_l'/>
			</el-col>
			<el-col :xs="12" :sm="12" :md="10" :lg="10">
				<span><strong class="title">{{bookInfo.bookName}}</strong></span>
				<span>{{bookInfo.author}}</span>
				<span style="height: 50px;overflow:hidden;display:block;text-overflow:ellipsis;">{{bookInfo.bookDesc}}</span>
				<span class="price">
					<p>价格 ：&nbsp;&nbsp;&nbsp;<del>￥{{(bookInfo.price*1).toFixed(2)}}</del></p>
					<p>促销价：&nbsp;&nbsp;&nbsp;<strong class="price-font">￥{{(bookInfo.price*bookInfo.discount).toFixed(2)}}</strong></p>
				</span>
				<span>
					数量：&nbsp;&nbsp;
					<el-input-number size="small" @change="handleChange" :disabled="bookInfo.bookNum<1" v-model="buyNum" :min="1" :max="bookInfo.bookNum"></el-input-number>
					&nbsp;&nbsp;库存{{bookInfo.bookNum}}件
				</span>
				<span>
					<el-button type="danger" @click="toCart" :disabled="bookInfo.bookNum<1">加入购物车</el-button>
					<el-button type="warning" @click="toBuy" :disabled="bookInfo.bookNum<1">立即购买</el-button>
				</span>
			</el-col>
			<el-col :xs="8" :sm="8" :md="9" :lg="9">
				<!--<img src="../../../image/xiaowangzi.png"/>-->
			</el-col>
		</el-row>
		<div class="line"></div>
		<!-- 详情页 -->
		<el-row class="other-buy">
			<div class="other-title">购买过该商品的人还买了</div>
			<el-card v-for="(book,index) in cheapBook.list" :key="index" class="buy-last">
				<div align="center"><a  @click="toGoodsInfo(book.bookId)"><img :src="url+book.image_l"/></a></div>
		      	<div class="buy-intro">
			        <div><span class="price-font">￥{{(book.price*book.discount).toFixed(2)}}</span>&nbsp;(<s>￥{{(book.price*1).toFixed(2)}}</s>)</div>
			        <div><span><a @click="toGoodsInfo(book.bookId)">{{book.bookName}}</a></span></div>
			        <div><span>{{book.author}}</span></div>
		      	</div>
		    </el-card>
		</el-row>
		<el-row class="goods-box">
			<el-col :xs="4" :sm="4" :md="4" :lg="4" class="goods-advice">
				<h2 style="height: 42px;line-height: 60px;font-size: 13px;font-weight: bold;margin-bottom: 30px;">同类商品推荐</h2>
				<el-card class="goods-advice-card" :key="index" v-for="(book,index) in bookList.list">
					<div align="center">
						<a  @click="toGoodsInfo(book.bookId)"><img :src="url+book.image_l"/></a>
					</div>
			      <div>
			        <span class="price-font">￥{{(book.price*book.discount).toFixed(2)}} &nbsp;<s style="color: black;font-size: 12px;">(￥{{(book.price*1).toFixed(2)}})</s></span>
			        <span><a  @click="toGoodsInfo(book.bookId)">{{book.bookName}}</a></span>
			        <span>{{book.author}}</span>
			      </div>
			    </el-card>
			</el-col>
			<el-col :xs="20" :sm="20" :md="20" :lg="20" >
				<el-row class="buy">
					<div class="goods-info">
			    		<p><h3 style="font-size: 13px;font-weight: bold;margin-bottom: 30px;">基本信息</h3></p>
			    		<p>图书名称: {{bookInfo.bookName}}</p>
			    		<p>图书作者: {{bookInfo.author}}</p>
			    		<p>图书简介: {{bookInfo.bookDesc}}</p>
						<p>精装: {{bookInfo.pageNum}}页</p>
						<p>开本: {{bookInfo.bookSize}}</p>
						<p>纸质: {{bookInfo.paper}}</p>
						<p>出版社: {{bookInfo.press}}; 第{{bookInfo.edition}}版 </p>
						<p>出版时间: {{bookInfo.publishTime}}</p>
						<p>印刷时间: {{bookInfo.printtime}}</p>
			    	</div>
				</el-row>
			</el-col>
		</el-row>
	</section>
</template>

<script>
import {Host} from '../../../api/Host';
import { mapGetters } from 'vuex';
	export default {
		data() {
		    return {
		    	buyNum:1,
		    }
		},
		methods: {
			handleClick(e){
				
			},
			//商品详情
		    toGoodsInfo(bookId){
		    	this.$router.push({ path: '/shopping', query: { bookId: bookId}});
		    },
			//计数器
			handleChange(value) {
				this.buyNum=value;
		    },
		    //加入购物车
		    toCart(){
		    	let userCode = '';
		    	const platformUser = sessionStorage.getItem('platformUser')?JSON.parse(sessionStorage.getItem('platformUser')):'';
				if(platformUser==''){
		    		this.$message({
			          	message: '您还未登入，请先登入！',
			          	type: 'error'
			        });
		    		//未登入，跳转至登入界面
		    		this.$router.push({ path: '/platFormLogin'});
		    		return;
		    	}else{
		    		userCode = platformUser.userCode;
		    	}
		    	let param = {
		    		bookId:this.bookInfo.bookId,
		    		bookNum:this.buyNum,
		    		userCode:userCode,
		    	};
		    	this.$store.dispatch('addToShopCart',param).then((res)=>{
		    		if(res.status == 200){
		    			this.$message({
				          	message: '成功加入购物车',
				          	type: 'success'
				        });
				        this.$store.dispatch('getCartByUserCode',{pageNum:1,pageSize:9999});
		    		}else{
		    			this.$message({
				          	message: '加入购物车失败',
				          	type: 'error'
				        });
		    		}
		    	});
		    },
		    //立即购买
		    toBuy(){
		    	this.$router.push({ path: '/shoppingOrder', query: { flag: 'fromBuy',books : {bookId:this.bookInfo.bookId,bookNum:this.buyNum}}});
		    },
  		},
  		computed: {
		 ...mapGetters([
			'bookInfo',//当前书籍信息
			'bookListByType',//分类书籍列表
			'bookList',//随机获取图书列表
			'cheapBook',
   		 ]),
   		 url(){
   		 	return Host+'bookpicture/';
   		 },
	    },
  		mounted(){
  			const {bookId}=this.$route.query;
  			//获取当前书籍
			this.$store.dispatch('getBook',{bookId:bookId});
			//获取同类书籍
			this.$store.dispatch('getCheapBook',{pageNum:1,pageSize:6,typeId:''});
			//获取推荐书籍（目前是随机推荐）
  			this.$store.dispatch('getBookList',{pageNum:1,pageSize:5,keyWord:''});
  		},
  		components: {
		},
  		watch:{
  			//监听路由区分模块
		  	"$route"(){
		  		const {bookId}=this.$route.query;
		  		//获取当前书籍
				this.$store.dispatch('getBook',{bookId:bookId});
		  	},
  		}	
	}

</script>

<style scoped lang="scss">
.shopping-container{
    width:90%;
    margin: auto;
    margin-top: 20px;
    .shop-info{
        margin-bottom:30px;
        img{
            margin-top: 40px;
            width: 220px;
            height: 250px;
        }
        .price{
            width: 100%;
            padding: 10px;
            font-size: 15px;
            background-color: #ebebeb;
        }
        span{
            display: block;
            margin: 20px 0 0 30px;
            
        }
    }
    .line{
        border-bottom: 2px solid #bfcbd9;
    }
    .other-buy{
    	width: 100%;
    	.other-title{
            text-align: center;
            margin: 20px 0;
        }
        .other-title:before,.other-title:after{
            margin-left: 20px;
            margin-right: 20px;
            color: #EBEBEB;
            content: "————————————————————————————";
        }
        .buy-last{
            float: left;
            width: 15%;
            margin-left: 15px;
            img{
                width: 80px;
                height: 100px;
            }
            .buy-intro{
                width: 100%;
                div{
                	height: 20px;
		            margin-top: 5px;
		            display:block;
		            white-space:nowrap; 
		            overflow:hidden;
		            text-overflow:ellipsis;
		            text-align: center;
                }
            }
        }
	}
    .goods-box{
        .goods-advice{
            padding:0px;
            .goods-advice-card{
            	width: 85%;
            	margin: 10px;
            }
            img{
                width: 80px;
                height: 100px;
            }
            span{
                height: 20px;
	            margin-top: 5px;
	            display:block;
	            white-space:nowrap; 
	            overflow:hidden;
	            text-overflow:ellipsis;
	            text-align: center;
            }
            .price-font{
                color: red;
            }
        }
        .buy{
            width: 95%;
            margin: 20px auto;
            .goods-info{
            	margin-left: 20px;
            }
        }
    }
    .page{
    	text-align: right;
        margin-bottom: 30px;
    }
}
</style>