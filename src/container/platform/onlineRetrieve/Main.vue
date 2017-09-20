<template>
	<section class="online-retrieve">
		<el-row class="retrieve-person">
			<el-col :span="24" >
				<h2>回收人信息</h2>
				<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
					<el-form-item label="姓名" prop="sellerName">
						<el-input v-model="addForm.sellerName" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="手机号" prop="sellerPhone">
						<el-input v-model="addForm.sellerPhone"></el-input>
					</el-form-item>
					<el-form-item label="常用地址" prop="sellerAddr">
						<el-input v-model="addForm.sellerAddr"></el-input>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-row class="retrieve-info">
			<el-col :span="24" >
				<h2>回收书籍信息</h2>
			</el-col>
			<el-form :model="addBook" label-width="100px" :rules="addBookRules" ref="addBook">
				<el-form-item label="货物描述" prop="goodsDsc">
					<el-input v-model="addBook.goodsDsc" auto-complete="off"></el-input><font color="red">(*可一次性添加多个货物，货物之间以逗号做分割符)</font>
				</el-form-item>
				<el-form-item label="货物数量" prop="number">
					<el-input type="number" min="0" v-model="addBook.number"></el-input>
				</el-form-item>
				<el-form-item label="期望价格" prop="tradPrice">
					<el-input type="number" min="0" v-model="addBook.tradPrice"></el-input>
				</el-form-item>
				<el-form-item label="货物细节图" prop="imgs">
					<el-upload
						  :action="url"
						  list-type="picture-card"
						  :on-preview="handlePictureCardPreview"
						  :on-success="handleSuccess"
						  :on-remove="handleRemove">
						  <i style="width: 50%;height: 50%;" class="el-icon-plus"></i>
						</el-upload>
						<el-dialog v-model="dialogVisible" size="tiny">
						  <img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
				</el-form-item>
			</el-form>
		</el-row>
		<div class="line"></div>
		<el-row class="retrieve-total">
			<el-col :span="24" >
				<div style="float: right; margin-bottom: 20px;">
				    <el-button @click="addRetrieve" type="info">提交</el-button>
				</div>
			</el-col>
		</el-row>
	</section>
</template>

<script>
import {Host} from '../../../api/Host';
	export default {
		data() {
		    return {
		    	dialogImageUrl: '',
        		dialogVisible: false,
		    	url:Host+`upload/uploadFile`,
		    	multipleSelection:[],
		    	addForm:{
		    		sellerName:'',
		    		sellerPhone:'',
		    		sellerAddr:'',
		    		state:0,
		    	},
		    	addBook:{
		    		imgs:[],
		    		goodsDsc:'',
		    		number:'',
		    		tradPrice:'',
		    	},
		    	addFormRules: {
					sellerName: [
						{ required: true, message: '请输入姓名', trigger: 'change' }
					],
					sellerPhone: [
						{ required: true, message: '请输入手机号', trigger: 'change' },
						{ pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '请输入正确的手机号（例如：13101030301）' , trigger: 'blur,change' }
					],
					sellerAddr: [
						{ required: true, message: '请输入地址', trigger: 'change' }
					],
				},
				addBookRules: {
					goodsDsc: [
						{ required: true, message: '请输入货物描述', trigger: 'change' }
					],
					number: [
						{ required: true, message: '请输入货物数量', trigger: 'change' },
						{ pattern: /^\d+$/, message: '请输入正确的货物数量' , trigger: 'change' }
					],
					tradPrice: [
						{ required: true, message: '请输入期望价格', trigger: 'change' },
						{ pattern: /^\d+$/, message: '请输入正确的期望价格' , trigger: 'change' }
					]
				},
				
		    }
		  },
		methods: {
			handleSelectionChange(val) {
		        this.multipleSelection = val;
		    },
		    //提交回收单
		    addRetrieve(){
		    	const platformUser = sessionStorage.getItem('platformUser');
		    	if(platformUser==null){
		    		this.$message({
	                  	message: '您还未登入,请先登入',
	                  	type: 'error'
	                });
		    		return;
		    	}
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$refs.addBook.validate((valid) => {
							if (valid) {
								let para = Object.assign(this.addBook,this.addForm);
								this.$store.dispatch('addRetrieve',para).then((res)=>{
									if(res.status == 200){
										this.$message({
						                  	message: res.msg,
						                  	type: 'success'
						                });
						                setTimeout(function(){window.location.reload();},1000);
									}else{
										this.$message({
						                  	message: res.msg,
						                  	type: 'error'
						                });
									}
								});
							}else {
					            console.log('error submit!!');
					            return false;
					        }
						});
			        } else {
			            console.log('error submit!!');
			            return false;
			        }
			    });
		    },
		    //图书展示处理
		    handlePictureCardPreview(file) {
		        this.dialogImageUrl = file.url;
		        this.dialogVisible = true;
	      	},
		    //图片上传移除
			handleRemove(file,fileList) {
				let index = this.addBook.imgs.indexOf(file.response.msg.fileName);
				this.addBook.imgs.splice(index,1) 
	      	},
	      	//图片上传中
	      	handleSuccess(response, file) {
	      		this.addBook.imgs.push(response.msg.fileName);
	      	},
  		},
  		destroyed() {
//	        console.log('destroyed 钩子执行...');
     	},	
  		computed:{
  		},
  		mounted(){
  		},
  		components: {
		}
	}

</script>
<style>
.el-upload-list--picture-card .el-upload-list__item-thumbnail{
    width: 100%;
	height: 100%;
}
.el-upload-list--picture-card .el-upload-list__item{
    width: 50px;
    height: 50px;
}
.el-upload--picture-card{
    width: 60px;
    height: 60px;
    line-height: 70px;
}
</style>
<style scoped lang="scss">
.online-retrieve{
	margin: 20px auto;
	width: 90%;
	.retrieve-person,.retrieve-info{
		margin-bottom: 10px;
		h2 {
			padding-bottom: 10px;
			border-bottom: 2px solid #c7161c;
		}
		.el-input{
			width:250px;
		}
	}
	.line{
		 height:2px;
		 width:100%;
		 background:#c7161c;
		 overflow:hidden;
		 margin-bottom: 10px;
		}
}
</style>