<template>
	<section class="platform-home">
		<!-- 新书上架 -->
		<div class="new-book">
			<el-row class="tags" :gutter="30">
				<el-col :xs="20" :sm="20" :md="19" :lg="19" >
					<el-tabs v-model="activeName1" type="card" @tab-click="handleClick1">
					    <el-tab-pane label="新书上架" disabled name="index"></el-tab-pane>
					    <template v-for="bookType in bookTypeTree" >
					    	<el-tab-pane :label="bookType.typeName" :name="bookType.typeId" :key="bookType.typeId">
					    		<CommBookList :books="bookListByType.list"/>
						    </el-tab-pane>
					    </template>
					</el-tabs>
				</el-col>
				<el-col :xs="4" :sm="4" :md="5" :lg="5" class="right_news">
					<CommCard :books="hotBook.list" title="热销图书" flag="hotBook"/>
				</el-col>
			</el-row>
			
		</div>
		<!-- 读者推荐 -->
		<div class="people-like">
			<el-row class="tags" :gutter="30">
				<el-col :xs="20" :sm="20" :md="19" :lg="19" >
					<el-tabs v-model="activeName1" type="card" @tab-click="handleClick2">
					    <el-tab-pane label="读者推荐" disabled name="index"></el-tab-pane>
					    <template v-for="bookType in bookTypeTree" >
					    	<el-tab-pane :label="bookType.typeName" :name="bookType.typeId" :key="bookType.typeId">
					    		<CommBookList :books="peopleLike.list" />
						    </el-tab-pane>
					    </template>
					</el-tabs>
				</el-col>
				<el-col :xs="4" :sm="4" :md="5" :lg="5" class="right_news">
					<CommCard :books="cheapBook.list" title="特价书籍" flag="cheapBook"/>
				</el-col>
			</el-row>
		</div>
		<!-- 猜您喜欢 -->
		<div class="you-like">
			<el-row class="tags" :gutter="30">
				<el-col :xs="20" :sm="20" :md="19" :lg="19" class="like-box">
					<span class="like-title">猜您喜欢</span>
					<span class="like-next"><a @click="changeYouLike">换一批</a></span>
					<div style="width: 100%;border-bottom: 1px solid #C7161C;"></div>
					<CommBookList :books="hotBook.list"/>
				</el-col>
				<el-col :xs="4" :sm="4" :md="5" :lg="5" class="right_news">
					<CommCard :books="bookList.list" title="图书汇" flag="allBook"/>
				</el-col>
			</el-row>
		</div>
	</section>
</template>

<script>
import CommBookList from '../../components/CommBookList';
import CommCard from '../../components/CommCard';
import { mapGetters } from 'vuex';
	export default {
		data() {
		    return {
		    }
		  },
		methods: {
			//换一批
			changeYouLike(){
				let num = Math.floor(Math.random()*3+1);  
				this.$store.dispatch('getYouLike',{pageNum:num,pageSize:5,typeId:''});
			},
			//新书推荐
		    handleClick1(tab, event) {
		    	//根据分类获取前五本书
  				this.$store.dispatch('getBookListByTypeId',{pageNum:1,pageSize:5,typeId:tab.name});
		    },
		    //读者推荐
		    handleClick2(tab, event) {
		    	//根据分类获取前五本书
  				this.$store.dispatch('getPeopleLike',{pageNum:1,pageSize:5,typeId:tab.name});
		    },
  		},
  		mounted(){
  			//获取分类树
  			this.$store.dispatch('getBookTypeTree').then((res) => {
  				//新书推荐
  				this.$store.dispatch('getBookListByTypeId',{pageNum:1,pageSize:5,typeId:res[0].typeId});
  				//读者推荐
  				this.$store.dispatch('getPeopleLike',{pageNum:2,pageSize:5,typeId:res[0].typeId});
  			});
  			
  			//获取书籍列表(图书汇)
  			this.$store.dispatch('getBookList',{pageNum:1,pageSize:5,keyWord:''});
  			//猜您喜欢
  			this.$store.dispatch('getYouLike',{pageNum:1,pageSize:5,typeId:''});
  			//图书风云榜
  			this.$store.dispatch('getHotBook',{pageNum:1,pageSize:5,typeId:''});
  			//图书活动区
  			this.$store.dispatch('getCheapBook',{pageNum:1,pageSize:5,typeId:''});
  		},
  		computed: {
		 ...mapGetters([
		 		'bookTypeTree',//获取分类
		 		'bookListByType',//根据分类获取图书列表
		 		'bookList',//随机获取图书列表
		 		'peopleLike',//读者推荐
		 		'youLike',//猜您喜欢
		 		'hotBook',//图书风云榜
		 		'cheapBook',//特价（活动）
   			]),
   			activeName1(){
	         	return this.bookTypeTree.length>0?this.bookTypeTree[0].typeId:'';
   			}
	    },
  		components: {
  			CommBookList,
  			CommCard,
		}
	}

</script>
<style scoped lang="scss">

</style>