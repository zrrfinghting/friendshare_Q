<template>
	<section class="platform-nav">
		<el-row class="nav">
			<el-col :span="5">
				<nav>
					<div class="all_box">
					    <div class="all"><a href="#">全部商品分类</a></div>
					    <ul v-bind:class="[specialFlag ? 'ul-class' : 'ul-class-no']" >
				    		<div v-for="(bookType,index) in bookTypeTree" :key="index">
					    		<li class="nav_item" ><a @click="doSearch(bookType.typeId)">{{bookType.typeName}}</a><span class="jt">&gt;</span>
								    <div class="sub_menu" >
							            <div class="leftmenu">
								            <dl>
								                <dt><a>{{bookType.typeName}}</a></dt>
								                <dd v-for="(child,index) in bookType.children" :key="index">
									                <a @click="doSearch(child.typeId)" >{{child.typeName}}</a>
								                </dd>
								            </dl>
							            </div>
							        </div>
							    </li>
						    </div>
						</ul>
					</div>
					
				</nav>
				<div class="right-pic" v-if="specialFlag">
					<a href=""><img src="../../image/newBook.png"/></a>
					<a href=""><img src="../../image/newBook.png"/></a>
					<a href=""><img src="../../image/newBook.png"/></a>
				</div>
			</el-col>
  			<el-col :span="13">
  				<div class="menu">
  					<el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
					  <el-menu-item index="main"><b>首页</b></el-menu-item>
					  <el-menu-item index="hotBook"><b>热门书籍</b></el-menu-item>
					  <el-menu-item index="cheapBook"><b>特价书籍</b></el-menu-item>
					  <el-menu-item index="onlineRetrieve"><b>在线回收</b></el-menu-item>
					</el-menu>
  				</div>
  			</el-col>
  			<el-col :span="6" style="float: right;">
  				<el-button type="danger" @click="toMyCart">购物车({{user?myCart.total:0}})</el-button>
  				<el-button @click="myOrder">我的订单</el-button>
  			</el-col>
		</el-row>
		<el-row class="picScroll" v-if="specialFlag">
  			<el-col :span="24">
  				<el-row class="pic">
  					<el-col :span="24">
					    <el-carousel height="450px">
					      <el-carousel-item >
							<img src="../../image/3.jpg"/>
					      </el-carousel-item>
					      <el-carousel-item >
							<img src="../../image/2.jpg"/>
					      </el-carousel-item>
					      <el-carousel-item >
							<img src="../../image/1.jpg"/>
					      </el-carousel-item>
					    </el-carousel>
  					</el-col>
  				</el-row>
  			</el-col>
		</el-row>
	</section>
</template>

<script>
import { mapGetters } from 'vuex';
	export default {
		data() {
		    return {
		    	user:'',//当前用户
		    	activeIndex:this.$route.path.substring(1,this.$route.path.length),
		    	flag:false,
		    	specialFlag:false,
		    }
		  },
		methods: {
			doSearch(typeId){
				//window.location.href='/search?typeId='+typeId;
				this.$router.push({ path: '/search',query:{typeId:typeId} });
			},
			handleSelect(key, keyPath) {
		        this.$router.push({ path: '/'+key });
		    },
		    //显示分类
		    handleCommand(){
		    	this.flag=true;
		    },
		    //控制隐藏分类
		    hiddenType(e){
		   		if(!e){
		        	this.flag=false;
		        }
		    },
		    //我的购物车
		    toMyCart(){
		    	this.$router.push({ path: '/shoppingCart' });
		    },
		    //我的订单
		    myOrder(){
		    	this.$router.push({ path: '/person/myOrder' });
		    }
  		},
  		mounted () {
  			this.user=sessionStorage.getItem('platformUser');
  			//区别模块
  			let path = this.$route.path.split("/")[this.$route.path.split("/").length-1];
			if(path=='main' || path == 'hotBook' || path == 'cheapBook'){
				this.specialFlag = true;
			}else{
				this.specialFlag = false;
			}
			
			//获取分类
			this.$store.dispatch('getBookTypeTree');
			//获取购物车信息
			this.$store.dispatch('getCartByUserCode',{pageNum:1,pageSize:9999});
  　　		},
  		computed:{
  			...mapGetters([
				'bookTypeTree',
				'myCart'
	   		 ]),
        },
		watch:{
			//监听路由区分模块
		  	"$route"(){
		  		let path = this.$route.path.split("/")[this.$route.path.split("/").length-1];
				if(path=='main' || path == 'hotBook' || path == 'cheapBook'){
					this.specialFlag = true;
				}else{
					this.specialFlag = false;
				}
		  	},
		}
		
	}

</script>
<style scoped lang="scss">
ol,ul{
    list-style: none;
    padding: 0;
    margin: 0;
}
.el-dropdown-menu.type-list{
	filter:alpha(Opacity=90);-moz-opacity:0.9;opacity: 0.9;
	text-align: center;
    width: 190px;
    height: 440px;
    display: block;
}
.type-detail{
	margin-top: -7px;
	background-color: #fff;
	min-width:490px;
	height:450px;
	margin-left:190px;
	position:absolute;
	transform-origin: center top 0px;
}
.right-pic{
	margin-top: 44px;
	position:absolute;
	z-index:3;
	height: 450px !important;
	margin-left:75%;
    img{
        display:block;
        height: 150px;
        margin-bottom: 1px;
    }
    img:hover{
        -webkit-transform:translateX(2px);/*Safari or Chrome*/
        -moz-transform:  translateX(2px);/*Firefox*/
        -ms-transform:  translate(2px);/*IE9*/
        -o-transform:  translateX(2px);/*Opera*/
        transform:  translateX(2px);/*默认w3c*/
    }
}
.nav{
    width: 90%;
    margin: 0 auto;
    border-bottom:3px solid #c7161c;
    nav{
    	max-height: 450px;
    	position:absolute;
    	z-index: 111;
    	.all_box{
    		.all{
	    		width: 220px;
			    height:44px;
			    line-height:44px;
			    background:#b1191a;
			    text-align: center;
		    }
		    .all a{
	            color:white;
	            font-size:16px;
	        }
    	}
        .all_box:hover .ul-class-no{display:block;}
        .ul-class{
        	display: block;
        }
        .ul-class-no{
        	display: none;
        }
        ul {
		    height: 450px;
		    background-color: #b61d1d;
		}
        .nav_item{
        	text-align: center;
        	width: 200px;
		    height:40px;
		    line-height:40px;
		    color:white;
		    background:#b61d1d;
		    padding:0 10px;
		}
		.nav_box{
			display:block;
		}
		.nav_box_no{
			display:none;
		}

		ul li a{color:white;}
		.jt{
		    color:white;
		    float:right;
		    width:12px;
		    padding-top:10px;
		    font: 13px consolas;
		    }
	    /*hover*/
		ul li:hover {
	    	background:white;
	    }
		ul li:hover a{
	        color:#b61d1d;
        }
        /*submenu*/
		.sub_menu{
		    display:none;
		    width:650px;
		    height:400px;
		    position:absolute;
		    left:220px;
		    top:44px;
		    background:#f7f7f7;
		}
		ul li:hover .sub_menu{display:block;}
		.leftmenu{
		   width: 550px;
		   overflow:hidden;
		   float:left;
		}
		.leftmenu dl{
		    overflow:hidden;
		    display:block;
		    margin: 20px 0;
		
	    }
		.leftmenu dl dt{
		    float:left;
		    font-weight:bold;
		    color:#737373;
		    padding:0 8px;
		
		}
		.leftmenu dl  dd  a{
		    color: #737373;
		    float:left;
		    height:20px;
		    line-height:20px;
		    padding:0 10px;
		    border-left: 1px solid #e0e0e0;
		    font-size:12px;
		    margin-top:10px;
		}
		.leftmenu dl  dd  a:hover{
		    color: #c7161c;
		    float:left;
		    height:20px;
		    line-height:20px;
		    padding:0 10px;
		    border-left: 1px solid #e0e0e0;
		    font-size:12px;
		    margin-top:10px;
		}
    }
    .menu{
    	width: 90%;
    	margin-left: 250px;
        .el-menu{
            background-color: white;
            padding-left:50px;
            height: 40px;
        }
        .el-menu-item{
            height: 40px;
            line-height: 40px;
        }
        .el-menu--horizontal>.el-menu-item:hover, .el-menu--horizontal>.el-submenu.is-active .el-submenu__title, .el-menu--horizontal>.el-submenu:hover .el-submenu__title {
            border-bottom: 3px solid #c7161c;
            color: #c7161c;
            background-color: white;
        }
        .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active{
            border-bottom: 3px solid #c7161c;
            color: #c7161c;
            background-color: white;
        }
    }
}
.picScroll{
    width: 100%;
    height: 450px;
    margin-bottom: 50px;
    img{
    	width: 100%;
    	height: 450px;
    }
}
</style>