<template>
	<el-row class="book-list">
		<el-card :key="index" v-for="(book,index) in books" class="col">
			<div align="center"><a @click="toGoodsInfo(book.bookId)"><img :src="url+`bookpicture/`+book.image_l"/></a></div>
			<span :title="book.bookName"><a @click="toGoodsInfo(book.bookId)">{{book.bookName}}</a></span>
			<span :title="book.author">{{book.author}}</span>
			<span><strong  class="price-font">￥{{(book.price*book.discount).toFixed(2)}}</strong>&nbsp;&nbsp;(<s>￥{{book.price.toFixed(2)}}</s>)</span>
		</el-card>
	</el-row>
</template>

<script>
import {Host} from '../api/Host';
	export default {
		props: [
			'books',
		],
		data() {
			return {
			}
		},
		watch:{
		},
		computed: {
			url(){
				return Host;
			}
	    },
		methods: {
			//商品详情
		    toGoodsInfo(bookId){
		    	this.$router.push({ path: '/shopping', query: { bookId: bookId}});
		    }
		},
		mounted(){
		}
	}
</script>
<style scoped lang="scss">
.book-list{
    max-height: 500px;
    margin-bottom: 50px;
    .col{
        width: 18%;
        height: 20%;
        margin:5px;
        float:left;
        span{
        	height: 20px;
            margin-top: 5px;
            display:block;
            white-space:nowrap; 
            overflow:hidden;
            text-overflow:ellipsis;
            text-align: center;
        }
        img{
            width:80px;
            height:100px;
        }
    }
    .col:hover{
        border: 1px solid #C7161C
    }
}
</style>
