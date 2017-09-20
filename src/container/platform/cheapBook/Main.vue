<template>
	<section class="cheap-book-main">
		<el-row class="tags" :gutter="30">
			<el-col :xs="20" :sm="20" :md="19" :lg="19" >
				<el-tabs v-model="defaultType" type="card" @tab-click="handleClick">
				    <el-tab-pane label="特价书籍" disabled name="index"></el-tab-pane>
				    <template v-for="(bookType,index) in bookTypeTree" >
				    	<el-tab-pane :label="bookType.typeName" :name="bookType.typeId" :key="bookType.typeId">
				    		<CommBookList :books="cheapBook.list"/>
					    </el-tab-pane>
				    </template>
				</el-tabs>
			</el-col>
			<el-col :xs="4" :sm="4" :md="5" :lg="5" class="right_news">
				<strong style="line-height: 70px;">特价书籍</strong>
				<div class="right_news">
					<el-card class="box-card">
					  	<div v-for="(book,index) in cheapAllBook.list" :key="index" class="text item">
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
		        this.$store.dispatch('getCheapBook',{typeId:tab.name,pageNum:1,pageSize:10});
		    },
		    //商品详情
		    toGoodsInfo(bookId){
		    	this.$router.push({ path: '/shopping', query: { bookId: bookId}});
		    },
  		},
  		mounted(){
  			this.$store.dispatch('getBookTypeTree');
  			this.$store.dispatch('getCheapBook',{typeId:this.defaultType,pageNum:1,pageSize:10});
  			//获取所有特价书籍，用于右边列表显示
  			this.$store.dispatch('getAllCheapBook',{typeId:'',pageNum:1,pageSize:10});
  		},
  		components: {
  			CommBookList,
		},
		computed:{
  			...mapGetters([
				'cheapBook',
				'cheapAllBook',
				'bookTypeTree'
	   		 ]),
	   		defaultType(){
   				return this.bookTypeTree.length>0?this.bookTypeTree[0].typeId:'';
   			}
        },
	}

</script>

<style  lang="scss">
</style>