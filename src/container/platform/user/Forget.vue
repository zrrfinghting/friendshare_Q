<template>
	<div class="platform-forget">
		<el-row class="sys-logo">
			<a @click="goHome"><img src="../../../image/logo.png" /></a>
		</el-row>
		<section class="forget">
			<el-card class="box-card">
			  	<div slot="header">
			  		<strong class="title">{{$route.name}}</strong>
			  		<span>
				    	<el-steps class="regist-step" space="30%" :align-center="alignCenter" :center="center" :active="active">
						  	<el-step title="用户账号验证" ></el-step>
						  	<el-step title="邮箱验证" ></el-step>
						 	<el-step title="重设密码"></el-step>
						 	<el-step title="重设密码成功"></el-step>
						</el-steps>
				    </span>
			  	</div>
			  	<div class="box-main" style="width: 450px;text-align: center;margin: auto;margin-top: 60px;" v-show="step1">
				    <!--邮箱验证-->
					<el-form :model="validateUserForm" :rules="validateUserFormRules" ref="validateUserForm">
						<el-form-item label="用户账号：" prop="userCode" :label-width="formLabelWidth">
							<el-input v-model="validateUserForm.userCode"></el-input>
						</el-form-item>
						<el-form-item label="验证码：" prop="valResult" :label-width="formLabelWidth">
					      	<el-input v-model="validateUserForm.valResult" auto-complete="off" placeholder="验证码">
					      		<template slot="append">
									<el-button type="primary" style="width:80px;" @click.native.prevent="renderCode" >{{expression}}</el-button>
								</template>
					      </el-input>
					    </el-form-item>
					</el-form>
					<div slot="footer" class="footer-button" style="margin-top: 30px;">
						<el-button type="primary" @click.native="nextStep(1)">下一步</el-button>
					</div>
			  	</div>
			  	
			  	<div class="box-main" style="width: 450px;text-align: center;margin: auto;margin-top: 60px;" v-show="step2">
				    <!--邮箱验证-->
					<el-form :model="validateEmailForm" :rules="validateEmailFormRules" ref="validateEmailForm">
						<el-form-item label="用户账号" :label-width="formLabelWidth">
							{{validateUserForm.userCode}}
						</el-form-item>
						<el-form-item label="用户邮箱" :label-width="formLabelWidth">
							{{email}}
						</el-form-item>
						<el-form-item label="邮箱验证码" prop="code" :label-width="formLabelWidth">
							<el-input v-model="validateEmailForm.code" >
								<el-button slot="append" @click="toEmail" v-bind:disabled="valiState">{{valiText}}</el-button>
							</el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="footer-button" style="margin-top: 30px;">
						<el-button type="primary" @click.native="PreStep(2)">上一步</el-button>
						<el-button type="primary" @click.native="nextStep(2)">下一步</el-button>
					</div>
			  	</div>
			  
			  	<!--修改密码 -->
			    <div class="text item" style="width: 450px;text-align: center;margin: auto;" v-show="step3">
				    <el-form :model="pswForm" :rules="pswRule" ref="pswForm">
					    <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPsw">
					      	<el-input type="password" v-model="pswForm.newPsw" auto-complete="off">
						      	<template slot="append" v-if="showTexts">
									<font :color="colors">{{showTexts}}</font>
								</template>
					      	</el-input>
					    </el-form-item>
					    <el-form-item label="确认密码" :label-width="formLabelWidth" prop="reNewPsw">
					      	<el-input type="password" v-model="pswForm.reNewPsw" auto-complete="off"></el-input>
					    </el-form-item>
					</el-form>
					<div slot="footer" class="footer-button">
						<el-button type="primary" @click.native="PreStep(3)">上一步</el-button>
						<el-button type="primary" @click.native="changePsw">下一步</el-button>
					</div>
			  	</div>
			  	
			  	<!--密码修改成功 -->
			  	<div class="text item" style="width: 450px;text-align: center;margin: auto;" v-show="step4">
					<div style="height: 450px;width: 100%;">
						<h2 style="line-height:250px;height: 250px;width: 100%;text-align: center;">密码修改成功，请牢记您的密码！</h2>
						<div class="footer-button">
							<el-button  type="primary" @click="complete">返回首页</el-button>
						</div>
					</div>
				</div>
			</el-card>
		</section>
		<MyFooter/>
	</div>
  
</template>

<script>
import MyFooter from '../Footer';
import { mapGetters } from 'vuex'
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
			//验证码校验
			const valResultFunc = (rule, value, callback) => {
			    const validateCode = this.validate;
			    if(value!= undefined){
			    	if (value.toString().toLowerCase() == validateCode.toString().toLowerCase()) {
			    		callback();
				    } else if (value != ''){
				    	callback(new Error('验证码输入错误，请重新输入'));
				    }
			    }else{
			    	callback();
			    }
			}
			//用户名是否存在
			const validateUserCode = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请输入用户账号'));
		        } else {
		        	let isPass = false;
		        	this.userList.list.map(item=>{
						if(item.userCode == value.trim()){
							let ema = item.email;
							ema = ema.substring(0,3) + '***' + ema.substring(ema.indexOf('@')-2,ema.length);
							this.email = ema;
							isPass = true;
							return;
						}
					})
		        	isPass? callback() : callback(new Error('用户账号不存在！'));
		        }
		    };
		    //密码校验
		 	const validatePass = (rule, value, callback) => {
		        if (value === '') {
		          	callback(new Error('请输入密码'));
		        } else {
		        	this.passwordStrong(value);
		          	if (this.pswForm.reNewPsw !== '') {
			            this.$refs.pswForm.validateField('reNewPsw');
		          	}
		          callback();
		        }
	      	};
		    //确认密码校验
		    const validatePass2 = (rule, value, callback) => {
		        if (value === '') {
		          	callback(new Error('请再次输入密码'));
		        } else if (value !== this.pswForm.newPsw) {
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
			return {
				expression: '',//验证码
	    		validate: '',//验证码
				email:'',//用户对应邮箱
				codeState:true,
				valiState:false,//校验状态
				rightCode:'8528',
				time:60,
				step1:true,//步骤一
				step2:false,//步骤二
				step3:false,//步骤三
				step4:false,//步骤四
				alignCenter:true,//步骤条居中
				center:true,//步骤条居中
				active:1,//默认第一个步骤
				formLabelWidth: '120px',
				addLoading:false,
				showTexts:'',//密码强度校验文字
				colors:'',//密码强度校验文字
				//用户验证
				validateUserFormRules: {
					userCode: [
						{ required: true, validator: validateUserCode, trigger: 'blur' },
					],
					valResult: [
						{ required: true, validator: valResultFunc, trigger: 'blur' }
					]
				},
				//邮箱验证规则
				validateEmailFormRules: {
					code: [
						{ required: true, validator: validateEmailCode, trigger: 'blur' }
					]
				},
				pswRule: {
			        newPsw: [
			            { required: true, validator: validatePass, trigger: 'blur' },
						{ min: 6, max: 16, message: '请输入6 到 16位新密码'}
			        ],
			        reNewPsw: [
			            { required: true, validator: validatePass2, trigger: 'blur' },
						{ min: 6, max: 16, message: '请输入6 到 16位确认密码'}
			        ]
		        },
		        //用户验证数据
		        validateUserForm:{
		        	userCode:'',
		        	valResult:'',
		        },
				//邮箱验证数据
				validateEmailForm:{
					code:'123',
				},
				pswForm: {
					newPsw: '',
					reNewPsw: '',
				},
			}
		},
		methods: {
			//点击logo返回首页
			goHome(){
				this.$router.push({ path: '/main' });
			},
			//验证码
    		renderCode() {
			    //定义expression和result，expression是字符串，result可能是字符串也可能是数字
			    let expression = '';
			    let  result = '';
		        let codeNormal = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';//字母库
		        for (var i =0; i < 4; i ++) {
		            result = result + codeNormal[Math.round(Math.random()*(codeNormal.length-1))];
		        }//随机获取字母四个
		        expression = result.toLowerCase();//忽略大小写
	    		//设置更新状态
		        this.expression= expression;
		        this.validate= result;
			},
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
			nextStep(step){
				if(step == 1){
					this.$refs.validateUserForm.validate((valid) => {
						if (valid) {
							this.active++;
							this.step1=false;
							this.step2=true;
							this.step3=false;
							this.step4=false;
						}
					});
				}
				if(step == 2){
					this.$refs.validateEmailForm.validate((valid) => {
						if (valid) {
							this.active++;
							this.step1=false;
							this.step2=false;
							this.step3=true;
							this.step4=false;
						}
					});
				}
			},
			PreStep(step){
				this.active--;
				if(step == 2){
					this.step1=true;
					this.step2=false;
					this.step3=false;
					this.step4=false;
					return ;
				}
				if(step == 3){
					this.step1=false;
					this.step2=true;
					this.step3=false;
					this.step4=false;
					return ;
				}
			},
			//倒计时
			timing(){
				if (this.time > 0) {
					this.time--
                	setTimeout(this.timing, 1000);
                }
			},
			//获取验证码
			toEmail(){
				this.valiState=true;
				this.codeState=false;
				//记录发送验证码时间，用于超时验证
				this.$store.dispatch('addRecordTime',new Date().getTime());
				//获取验证码
				this.$store.dispatch('sendVerifyCode',{userCode:this.validateUserForm.userCode,emailAddress:''}).then((res)=>{
					if(res.status == 200){//发送成功
						this.rightCode = res.verifyCode;
					}else{
						this.valiState=false;
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
                }
			},
			complete(){
				this.$router.push({ path: '/main' });
			},
			//修改密码
			changePsw(){
				const _this = this;
				this.$refs.pswForm.validate((valid) => {
					if (valid) {
			            const para = {userCode:_this.validateUserForm.userCode,userPsw:_this.pswForm.newPsw,verifyCode:this.validateEmailForm.code};
			            this.$store.dispatch('resetPsw',para).then((data) => {  
				            if (data.status == 200) {
				            	this.$refs['validateUserForm','pswForm','validateEmailForm'].resetFields();
								this.active++;
								this.step1=false;
								this.step2=false;
								this.step3=false;
								this.step4=true;
				            } else {
				              	this.$message({
				                  message: data.msg,
				                  type: 'error'
				                });
				            }
					    });  
			        } else {
			            console.log('error submit!!');
			            return false;
			        }
			    });
			},
		},
		mounted() {
			//获取验证码
			this.renderCode();
			//获取所有用户
			this.$store.dispatch('getUserList',{pageNum:1,pageSize:9999,keyWord:''});
		},
		components: {
			MyFooter
		}
	}
</script>

<style lang="scss" scoped>
.platform-forget{
	margin: auto;
	.sys-logo{
			padding: 20px 80px;
			border-bottom: 2px solid #c7161c;
	}
	.sys-img{
		padding-left: 20px;
	}
	.forget{
		min-height: 500px;
		width:80%;
	    margin: 20px auto;
	    .box-card{
	    	min-height: 450px;
	    	.box-main{
	    		margin-top: 100px;
	    	}
	    }
	    .title{
			padding:0 10px 0 30px;
			border-right: 3px solid #c7161c;
			margin-bottom: 30px;
		}
	}
	.clearfix{
		text-align: center;
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