<template>
	<div class="platform-sys">
		<el-row class="sys-logo">
			<a @click="goHome"><img src="../../../image/logo.png" /></a>
		</el-row>
		<el-card class="box-card">
		  	<div slot="header">
		  		<strong class="title">{{$route.name}}</strong>
		  		<span>
			    	<el-steps class="regist-step" space="35%" :align-center="alignCenter" :center="center" :active="active" finish-status="success">
					  	<el-step title="基本信息"></el-step>
					 	<el-step title="邮箱验证"></el-step>
					 	<el-step title="注册成功"></el-step>
					</el-steps>
			    </span>
		  	</div>
		  
		  	<!--基本信息-->
		  	<div class="text item" style="width: 450px;text-align: center;margin: auto;" v-if="step1">
				<el-form :model="infoForm" :rules="infoFormRules" ref="infoForm">
					<el-form-item label="用户账号" prop="userCode" :label-width="formLabelWidth">
						<el-input v-model="infoForm.userCode" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="userPsw" :label-width="formLabelWidth">
						<el-input type="password" v-model="infoForm.userPsw">
							<template slot="append" v-if="showTexts">
								<font :color="colors">{{showTexts}}</font>
							</template>
						</el-input>
					</el-form-item>
					<el-form-item label="确认密码" prop="reUserPsw" :label-width="formLabelWidth">
						<el-input type="password" v-model="infoForm.reUserPsw"></el-input>
					</el-form-item>
					<el-form-item label="用户名称" prop="userName" :label-width="formLabelWidth">
						<el-input v-model="infoForm.userName"></el-input>
					</el-form-item>
					<el-form-item label="手机号" prop="phone" :label-width="formLabelWidth">
						<el-input v-model="infoForm.phone"></el-input>
					</el-form-item>
					<el-form-item label="常用地址" :label-width="formLabelWidth">
						<el-input type="textarea" v-model="infoForm.address"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="footer-button">
					<el-button type="primary" @click.native="nextStep" :loading="addLoading">下一步</el-button>
				</div>
		  	</div>
		  
		  	<!--邮箱验证 -->
		    <div class="text item" style="width: 450px;text-align: center;margin: auto;" v-if="step2">
			    <!--新增界面-->
				<el-form :model="validateEmailForm" :rules="validateEmailFormRules" ref="validateEmailForm">
					<el-form-item label="用户邮箱" prop="email" :label-width="formLabelWidth">
						<el-input v-model="validateEmailForm.email">
							<el-button slot="append" @click="toEmail" v-bind:disabled="valiState">{{valiText}}</el-button>
						</el-input>
					</el-form-item>
					<el-form-item label="验证码" prop="code" :label-width="formLabelWidth">
						<el-input v-model="validateEmailForm.code" v-bind:disabled="codeState"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="footer-button">
					<el-button type="primary" @click.native="PreStep" :loading="addLoading">上一步</el-button>
					<el-button type="primary" @click.native="addSubmit" :loading="addLoading">下一步</el-button>
				</div>
		  	</div>
		  	
		  	<!--注册成功 -->
		  	<div class="text item" style="width: 450px;text-align: center;margin: auto;" v-if="step3">
				<div style="height: 450px;width: 100%;">
					<h2 style="line-height:250px;height: 250px;width: 100%;text-align: center;">恭喜您注册成功！</h2>
					<div class="footer-button">
						<el-button  type="primary" @click="complete">返回首页</el-button>
					</div>
				</div>
			</div>
		</el-card>
		<MyFooter/>
	</div>
</template>

<script>
import MyFooter from '../Footer';
import { mapGetters } from 'vuex';
  export default {
		computed: {
		 ...mapGetters([
		 		'userList',
		 		'recordTime'
   			]),
			valiText() {
                return this.time > 0 && this.time < 60? this.time + 's 后重新获取验证码' : '获取验证码';
            } 
	    },
		data() {
			//用户名重复校验
			const validateUserCode = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请输入用户账号'));
		        } else {
		        	let isPass = false;
		        	this.$store.dispatch('existsUserCode',{userCode:value}).then((res)=>{
	        			isPass =res;
		        	});
		        	isPass? callback(new Error('用户账号已存在！')): callback();
		        }
		    };
		    //密码校验
			const validatePass = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请输入密码'));
		        } else {
		        	this.passwordStrong(value);
		        if (this.infoForm.reUserPsw !== '') {
		            this.$refs.infoForm.validateField('reUserPsw');
		        }
		          	callback();
		        }
		    };
		    //确认密码校验
		    const validatePass2 = (rule, value, callback) => {
		        if (value === '') {
		          	callback(new Error('请再次输入密码'));
		        } else if (value !== this.infoForm.userPsw) {
		          	callback(new Error('两次输入密码不一致!'));
		        } else {
		          	callback();
		        }
		    };
		    //邮箱验证码超时校验
		    const validateEmailCode = (rule, value, callback) => {
		    	if (value === '') {
		          callback(new Error('请输入验证码'));
		        }else if(new Date().getTime() - this.recordTime > 300000){//五分钟
	      			callback(new Error('验证码超时，请重新获取验证码'));
	      		}else if(value === this.rightCode){
	      			callback();
	      		}else{
	      			callback(new Error('验证码输入错误'));
	      		}
		    };
		    //邮箱校验
		    const validateEmail = (rule, value, callback) => {
		    	if (value === '') {
		          callback(new Error('请输入邮箱'));
		        }else{
		        	this.valiState = false;
		        	callback();
		        }
		    };
		    
			return {
				codeState:true,
				valiState:true,//校验状态
				rightCode:'123',
				time:60,
				step1:true,//步骤一
				step2:false,//步骤二
				step3:false,//步骤三
				alignCenter:true,//步骤条居中
				center:true,//步骤条居中
				active:1,//默认第一个步骤
				formLabelWidth: '120px',
				addLoading:false,
				showTexts:'',//密码强度校验文字
				colors:'',//密码强度校验文字
				infoFormRules: {
					userCode: [
						{ required: true, validator: validateUserCode, trigger: 'blur' }
					],
					userName: [
						{ required: true, message: '请输入用户名', trigger: 'change' }
					],
					userPsw: [
						{ required: true, validator: validatePass, trigger: 'change' },
						{ min: 6, max: 16, message: '请输入6 到 16位密码'}
					],
					reUserPsw: [
						{ required: true, validator: validatePass2, trigger: 'change' },
						{ min: 6, max: 16, message: '请输入6 到 16位确认密码'}
					],
					phone: [
						{ required: true, message: '请输入手机号', trigger: 'change' },
						{ pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '请输入正确的手机号（例如：13101030301）' , trigger: 'blur,change' }
					],
					state: [
						{ required: true, message: '请选择状态', trigger: 'change' }
					]
				},
				//邮箱验证规则
				validateEmailFormRules: {
					email: [
						{ required: true, validator: validateEmail, trigger: 'change' },
						{ type: 'email', message: '请输入正确的邮箱地址（例如：123456@163.com）', trigger: 'blur,change' }
					],
					code: [
						{ required: true, validator: validateEmailCode, trigger: 'change' }
					]
				},
				//新增界面数据
				infoForm: {
					userCode:'',
					userPsw: '',
					reUserPsw:'',
					userName:'',
					phone: '',
					address: '',
					state:1,
				},
				//邮箱验证数据
				validateEmailForm:{
					email:'',
					code:'',
				}
			}
		},
		methods: {
			/**
			 * 密码强度校验
			 * param value 密码
			 */
			passwordStrong(value){
				//密码为八位及以上并且字母数字特殊字符三项都包括
		     	const strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
		   		//密码为七位及以上并且字母、数字、特殊字符三项中有两项，强度是中等
		     	const mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
		     	const enoughRegex = new RegExp("(?=.{6,}).*", "g");
		     	this.password_length = value.length;
		     	if(value && value.length>5 && value.length<17){
		     		if (strongRegex.test(value)) {
			        	this.showTexts='强';
			        	this.colors='green'
		     		} else if (mediumRegex.test(value)) {
			        	this.showTexts='中';
			        	this.colors='blue'
				     } else {
			        	this.showTexts='弱';
			        	this.colors='red'
				    }
				     
		     	}else{
		        	this.showTexts='';
		     	}
			},
			//新增
			addSubmit() {
				this.$refs.validateEmailForm.validate((valid) => {
					if (valid) {
						this.addLoading = true;
						let para = Object.assign({}, this.infoForm,this.validateEmailForm);
						this.$store.dispatch('addUser',para).then((res) => {
							if(res.status == 200){
								this.addLoading = false;
								this.$refs['infoForm','validateEmailForm'].resetFields();
								this.active++;
								this.step1=false;
								this.step2=false;
								this.step3=true;
							}else{
								this.$message({
									message: res.msg,
									type: 'error'
								});
							}
				        });  
					}
				});
			},
			//下一步
			nextStep(){
				this.$refs.infoForm.validate((valid) => {
					if (valid) {
						this.active++;
						this.step1=false;
						this.step2=true;
						this.step3=false;
					}
				});
			},
			//上一步
			PreStep(){
				this.active--;
				this.step1=true;
				this.step2=false;
				this.step3=false;
			},
			//倒计时
			timing(){
				if (this.time > 0) {
					this.time--
                	setTimeout(this.timing, 1000);
                }
			},
			//发送验证码
			toEmail(){
				this.valiState=true;
				this.codeState=false;
				//记录发送验证码时间，用于超时验证
				this.$store.dispatch('addRecordTime',new Date().getTime());
				//发送验证码
				this.$store.dispatch('sendVerifyCode',{userCode:this.infoForm.userCode,emailAddress:this.validateEmailForm.email}).then((res)=>{
					console.log(res);
					if(res.status == 200){//发送成功
						this.rightCode = res.verifyCode;
					}else{
						this.$message({
							message: res.msg,
							type: 'error'
						});
					}
				});
				if (this.time > 0) {
					this.timing();
                }else{
                	this.valiState=false;
					this.$message('发送验证码');
                }
			},
			//完成，返回首页
			complete(){
				sessionStorage.setItem('platformUser', JSON.stringify(Object.assign({}, this.infoForm,this.validateEmailForm)));
				this.$router.push({ path: '/main' });
			},
			//点击logo返回首页
			goHome(){
				this.$router.push({ path: '/main' });
			},
		},
		mounted() {
			//this.$store.dispatch('getUserList',{pageNum:1,pageSize:9999,keyWord:''});
		},
		components: {
			MyFooter
		}
	}
</script>

<style lang="scss" scoped>
.platform-sys{
	margin: auto;
	.sys-logo{
			padding: 20px 80px;
			border-bottom: 2px solid #c7161c;
	}
	.box-card{
		margin: 30px auto;
		width:80%;
		.title{
			padding:0 10px 0 30px;
			border-right: 3px solid #c7161c;
			margin-bottom: 30px;
		}
	}
	
  .footer-info{
  	text-align: center;
  	border-top: 2px solid #c7161c;
        span{
            margin-right: 25px;
            margin-left:25px;
        }
        a{
            color: #7d7d7d;
            text-decoration: none;
        }
        a:hover{
            color: #c7161c;
            text-decoration: none;
        }
    } 
}
  
</style>