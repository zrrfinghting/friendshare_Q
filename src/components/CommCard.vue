<template>
	<div class="right_news">
		<strong style="font-size: 1.5em;line-height: 70px;">{{title}}</strong>
		<span style="margin-left: 25%;" v-if="flag != 'allHotBook' || flag != 'allCheapBook' "><a @click="getMore">更多>></a></span>
		<div class="right_news">
			<el-card class="box-card">
			  <div v-for="(book,index) in books" :key="index" class="text item">
			    <a @click="toGoodsInfo(book.bookId)">{{(index+1) +'. ' + book.bookName }}</a>
			  </div>
			</el-card>
		</div>
	</div>
</template>

<script>
	export default {
		props: [
			'books',
			'title',
			'flag',
		],
		data() {
			return {
			}
		},
		watch:{
		},
		methods: {
			//商品详情
		    toGoodsInfo(bookId){
		    	this.$router.push({ path: '/shopping', query: { bookId: bookId}});
		    },
		    //更多
		    getMore(){
		    	if(this.flag == 'hotBook'){
		    		this.$router.push({ path: '/hotBook'});
		    	}else if(this.flag == "cheapBook"){
		    		this.$router.push({ path: '/cheapBook'});
		    	}else if(this.flag == "allBook"){
		    		this.$router.push({ path: '/search'});
		    	}
		    },
		    
		}
	}
</script>
<style scoped lang="scss">
.right_news{
    max-height: 500px;
    .item {
    	text-align: left !important;
        padding: 9% 0;
        border-bottom: 1px dashed #BFCBD9;
        white-space:nowrap; 
        overflow:hidden;
        text-overflow:ellipsis;
    }
    .clearfix:before,.clearfix:after {
        display: table;
        content: "";
      }
    .clearfix:after {
        clear: both
    }
    .box-card {
        width: 85%;
        height: 100%;
    }
}
</style>
