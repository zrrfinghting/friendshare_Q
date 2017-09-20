<template>
	<section class="my-order-detail">
		<h2 ><strong class="title">{{$route.name}}</strong></h2>
		<div class="order-detail">
			<el-card>
				<el-row>
					<strong class="label-text">回收人信息:</strong>
				</el-row>
				<el-row>
					<el-col :span="8">
						<span class="tab-label-text"> 回收人姓名:</span><span>{{reclaimInfo.sellerPhone}}</span>
					</el-col>
					<el-col :span="8">
						<span class="tab-label-text">回收人电话:</span><span>{{reclaimInfo.sellerName}}</span>
					</el-col>
					<el-col :span="8">
						<span class="tab-label-text">回收人地址:</span><span>{{reclaimInfo.sellerAddr}}</span>
					</el-col>
				</el-row>
				<hr/>
				<el-row>
					<strong class="label-text">回收单信息:</strong>
				</el-row>
				<el-row>
					<el-col :span="8">
						<span class="tab-label-text">回收单编号:</span><span>{{reclaimInfo.reclaimId}}</span>
					</el-col>
					<el-col :span="8">
						<span class="tab-label-text">创建时间:</span><span>{{reclaimInfo.createDate}}</span>
					</el-col>
				</el-row>
				<el-row>
					<span class="tab-label-text">备注:</span><span>{{reclaimInfo.notes}}</span>
				</el-row>
				<hr/>
				<el-row>
					<strong class="label-text">货物信息:</strong>
				</el-row>
				<el-row>
					<span class="tab-label-text">货物描述:</span><span>{{reclaimInfo.goodsDsc}}</span>
				</el-row>
				<el-row>
					<span class="tab-label-text">货物数量:</span><span>{{reclaimInfo.number}}</span>
				</el-row>
				<el-row>
					<span class="tab-label-text">期望价格:</span><span>{{reclaimInfo.tradPrice}}</span>
				</el-row>
				<el-row>
					<span style="display: list-item;">货物展示:</span>
						<template v-for="(img,index) in reclaimInfo.imgs">
							<img :src="url+img" @click="openDialog(url+img)"></img>
						</template>
					</span>
				</el-row>
			</el-card>
		</div>
		<el-dialog size="tiny"  :visible.sync="imgVisible" >
		  <div align="center">
		  	 <img :src="imgUrl"></img>
		  </div>
		</el-dialog>
	</section>
</template>

<script>
import {mapGetters} from 'vuex'; 
import {Host} from '../../../api/Host';
import util from '../../../util/util';
	export default {
		data() {
			return {
				imgVisible:false,
				imgUrl:'',
			}
		},
		methods: {
			//图片详情
			openDialog(url){
				this.imgUrl = url;
				this.imgVisible = true;
			},
		},
		computed: {
			...mapGetters([
				'reclaimInfo',
			]),
	   		url(){
	   		 	return Host+'bookpicture/';
	   		},
	    },
		mounted() {
			const {reclaimId} = this.$route.query;
			this.$store.dispatch('getReclaimById',{reclaimId:reclaimId});
		},
		components: {
		}
	}

</script>

<style scoped lang="scss">
.my-order-detail{
	.title{
		padding:0 10px 0 30px;
		border-right: 3px solid #c7161c;
	}
	.order-detail{
		padding-top: 10px;
		width: 90%;
		margin: auto;
		.label-text{
			padding-right: 20px;
		}
		.tab-label-text{
			padding-right: 10px;
		}
		.el-row{
			padding: 10px;
		}
		img{
			width: 50px;
			height: 50px;
			margin: 10px;
		}
	}
}
</style>