<template>
	<section class="hot-book-main">
		<el-row class="tags" :gutter="30">
			<el-col :xs="20" :sm="20" :md="19" :lg="19" >
				<el-tabs v-model="defaultType" type="card" @tab-click="handleClick">
				    <el-tab-pane label="热门书籍" disabled name="index"></el-tab-pane>
				    <template v-for="(bookType,index) in bookTypeTree" >
				    	<el-tab-pane :label="bookType.typeName" :name="bookType.typeId" :key="bookType.typeId">
				    		<CommBookList :books="hotBook.list"/>
					    </el-tab-pane>
				    </template>
				</el-tabs>
			</el-col>
			<el-col :xs="4" :sm="4" :md="5" :lg="5" class="right_news">
				<strong style="line-height: 70px;">热门书籍</strong>
				<div class="right_news">
					<el-card class="box-card">
					  	<div v-for="(book,index) in hotAllBook.list" :key="index" class="text item">
						    <a @click="toGoodsInfo(book.bookId)">{{(index+1) +'. ' + book.bookName }}</a>
						</div>
					</el-card>
				</div>
			</el-col>
		</el-row>
	</section>
</template>

<script>
import { mapGetters } from 'vuex';
import CommBookList from '../../../components/CommBookList';
import CommCard from '../../../components/CommCard';
	export default {
		data() {
		    return {
		    }
		  },
		methods: {
		    handleClick(tab, event) {
		        this.$store.dispatch('getHotBook',{typeId:tab.name,pageNum:1,pageSize:10});
		    },
		    //商品详情
		    toGoodsInfo(bookId){
		    	this.$router.push({ path: '/shopping', query: { bookId: bookId}});
		    },
  		},
  		computed:{
  			...mapGetters([
				'hotBook',
				'hotAllBook',
				'bookTypeTree'
	   		 ]),
	   		defaultType(){
   				return this.bookTypeTree.length>0?this.bookTypeTree[0].typeId:'';
   			}
        },
  		mounted(){
  			this.$store.dispatch('getBookTypeTree');
  			this.$store.dispatch('getHotBook',{typeId:this.defaultType,pageNum:1,pageSize:10});
  			this.$store.dispatch('getAllHotBook',{typeId:'',pageNum:1,pageSize:10});//获取所有热门书籍，用于右边显示
  		},
  		components: {
  			CommBookList,
		},
	}

</script>
<style scoped lang="scss">
	
</style>
