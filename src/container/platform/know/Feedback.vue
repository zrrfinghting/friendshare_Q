<template>
	<section class="my-feedback">
		<!--<el-form :model="problemForm" label-width="150px" :rules="problemFormRules" ref="problemForm">
			<el-form-item label="您的问题" prop="problem">
				<el-input type="textarea" style="width: 80%;" :autosize="{ minRows: 5, maxRows: 10}" v-model="problemForm.problem"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="footer-button">
			<el-button type="primary" @click.native="addProblem" >提交</el-button>
		</div>-->
		<h2>常见问题</h2>
		<el-row class="problem-exp" v-for="o in 5" :key="o">
			<h3>问题{{o}}</h3>
			答案{{o}}
		</el-row>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				problemForm:{
					problem:'',
				},
				problemFormRules: {
					problem: [
						{ required: true, message: '请写下您的问题', trigger: 'change' }
					],
				},
			}
		},
		methods: {
			addProblem(){
				this.$refs.editForm.validate((valid) => {
					if(valid){
						this.$message("提问成功");
					}
				});
			}
		},
		computed: {
	    },
		mounted() {
		},
		components: {
		}
	}

</script>

<style scoped lang="scss">
.my-feedback{
	margin: 30px auto;
	width: 90%;
	h2 {
		padding-bottom: 10px;
		border-bottom: 2px solid #c7161c;
	}
	.problem-exp{
		height:130px;
		padding-bottom: 10px;
		border-bottom: 1px solid #BFCBD9;
		
	}
	.my-feedback-detail{
		padding-top: 50px;
		width: 60%;
		margin: auto;
	}
}
</style>