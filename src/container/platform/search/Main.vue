<template>
	<section class="search-container">
		<el-row class="result">
			<el-row class="result-count">
				<el-col :span="16"> 
					<span style="margin-left: 30px;">显示： {{searchBook.list?(searchBook.list.length>0?1:0):0}}-{{searchBook.list?(searchBook.list.length>15?15:searchBook.list.length):0}}条， 共{{searchBook.total}}条 	</span>
					&nbsp;&nbsp;&nbsp;{{params.keyWord?'关键字：':''}}<strong style="color: red;"> {{params.keyWord}} </strong>
				</el-col>
				<el-col :span="4">
					价格:&nbsp;&nbsp;<input type="text" v-model="startPrice" style="width: 30px;"/>&nbsp;~&nbsp;<input type="text" v-model="endPrice" style="width: 30px;"/>
					<button @click="search">go</button>
				</el-col>
				<el-col :span="4">
					排序：
						<select v-model="order">
							<option value="ASC" >价格由低到高</option>	
							<option value="DESC" >价格由高到低</option>	
						</select>
				</el-col>
			</el-row>
			<el-row   class="result-book">
				<CommBookList :books="searchBook.list"/>
			</el-row>
			<el-row class="page">
				<el-col :span="24">
					<el-pagination
				      @current-change="handleCurrentChange"
				      :current-page="1"
				      :page-size="15"
				      layout="total,  prev, pager, next, jumper"
				      :total="searchBook?searchBook.total:0">
				    </el-pagination>
				</el-col>
			</el-row>
		</el-row>
	</section>
</template>

<script>
import CommBookList from '../../../components/CommBookList';
import { mapGetters } from 'vuex'
	export default {
		data() {
		    return {
		    	params:'',
		    	startPrice:'',
		    	endPrice:'',
		    	order:'ASC',
		    	bookList1:[],
		    }
		},
		methods: {
			search(){
				let para = Object.assign(this.params,{startPrice:this.startPrice,endPrice:this.endPrice,sort:this.order});
				this.$store.dispatch('searchBook',para);
			},
			handleCurrentChange(val) {
		        let para = Object.assign(this.params,{pageNum:val});
				this.$store.dispatch('searchBook',para);
		  	},
  		},
  		computed: {
		 ...mapGetters([
			'searchBook',
			'bookTypeInfo',
   		 ]),
	    },
  		mounted(){
  			const {typeId,keyWord}=this.$route.query;
  			let para={
  				keyWord:keyWord==undefined?'':keyWord,
  				typeId:typeId==undefined?'':typeId,
  				sort:'ASC',
  				startPrice:'',
  				endPrice:'',
  				pageNum:1,
  				pageSize:10,
  			};
  			this.params = para;
  			this.$store.dispatch('searchBook',para).then((res)=>{
			});
  		},
  		components: {
  			CommBookList,
		},
		watch:{
			"$route"(){
				let {typeId,keyWord}=this.$route.query;
				if(keyWord == undefined){
					keyWord = '';
				}
				let para = Object.assign(this.params,{typeId:typeId,keyWord:keyWord});
				this.params = para;
				this.$store.dispatch('searchBook',para);
				this.$store.dispatch('getBookTypeById',{typeId:typeId});
			},
			order(){
				let para = Object.assign(this.params,{sort:this.order});
				this.params = para;
				this.$store.dispatch('searchBook',para);
			}
		}
	}

</script>

<style scoped lang="scss">
/*搜索*/
.search-container{
    width:90%;
    margin: auto;
    margin-top: 20px;
    .result-count{
        height: 40px;
        line-height: 40px;
        background-color: #f5f5f5;
    }
    .result-book{
        margin:20px 0 30px 30px;
    }
    .page{
        text-align: center;
        margin-bottom: 30px;
    }
}
</style>