<template>
	<div class="platform-sys">
		<el-row class="sys-logo">
			<a @click="goHome"><img src="../../../image/logo.png" /></a>
		</el-row>
		<el-row>
			<el-col :xs="11" :sm="11" :md="16" :lg="16" class="sys-img">
				<div align="center">
					<img src="../../../image/login.png" />
				</div>
			</el-col>
			<el-col :xs="13" :sm="13" :md="8" :lg="8">
				<el-form :model="loginForm" :rules="ruleLogin" ref="loginForm" label-position="left" label-width="0px" class="platform-login">
				    <h3 class="title">系统登录</h3>
				    <el-form-item prop="userCode">
				      <el-input type="text" v-model="loginForm.userCode" auto-complete="off" placeholder="账号" @keyup.enter.native="login">
				      	<template slot="prepend">
									<i class="fa fa-user-o" aria-hidden="true"></i>
								</template>
				      </el-input>
				    </el-form-item>
				    <el-form-item prop="userPsw">
				      <el-input type="password" v-model="loginForm.userPsw" auto-complete="off" placeholder="密码" @keyup.enter.native="login">
				      	<template slot="prepend">
									<i class="fa fa-lock" aria-hidden="true"></i>
								</template>
				      </el-input>
				    </el-form-item>
				    <el-form-item prop="valResult">
				      <el-input v-model="loginForm.valResult" auto-complete="off" placeholder="验证码" @keyup.enter.native="login">
				      	<template slot="prepend">
									<i class="fa fa-qrcode" aria-hidden="true"></i>
								</template>
				      	<template slot="append">
									<el-button type="primary" style="width:80px;" @click.native.prevent="renderCode" >{{expression}}</el-button>
								</template>
				      </el-input>
				    </el-form-item>
				    <el-form-item >
				    	<a href="/forget">忘记密码?</a>
				    </el-form-item>
				    <el-form-item style="width:100%;">
				      <el-button type="danger" style="width:100%;" @click.native.prevent="login" :loading="logining">登录</el-button>
				    </el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<MyFooter/>
	</div>
  
</template>

<script>
import MyFooter from '../Footer';
  export default {
    data() {
    	const valResultFunc = (rule, value, callback) => {
		    const validateCode = this.validate;
		    if(value == ''){
		    	callback(new Error('请输入验证码'));
		    }
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
      return { 
        logining: false,  
        expression: '',
	    validate: '',
        loginForm: {
          	userCode: '',
          	userPsw: '',
          	valResult:'',
        },
        ruleLogin: {
          userCode: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          userPsw: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          valResult: [
            { required: true, validator: valResultFunc,trigger: 'blur' },
          ]
        },
      };
    },
    methods: {
    	//点击logo返回首页
		goHome(){
			this.$router.push({ path: '/main' });
		},
      	login(ev) {
        var _this = this;
	        this.$refs.loginForm.validate((valid) => {
	          	if (valid) {
	            	this.logining = true;
	            	var loginParams = { userCode: this.loginForm.userCode, userPsw: this.loginForm.userPsw};
	            	this.$store.dispatch('requestLogin',loginParams).then((data) => {  
		              	this.logining = false;
		              	if (data.status == 200) {
	                		sessionStorage.setItem('platformUser', JSON.stringify(data.user));
	                		window.location.href='/main';
		              	} else {
		              		this.renderCode();//登入失败，重新获取验证码
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
			}
		},
		mounted() {
			this.renderCode();
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
			margin: 20px 80px;
	}
	.sys-img{
		padding-left: 20px;
	}
	.platform-login {
	    -webkit-border-radius: 5px;
	    border-radius: 5px;
	    -moz-border-radius: 5px;
	    background-clip: padding-box;
	    margin-top: 80px;
	    width: 350px;
	    padding: 35px 35px 15px 35px;
	    background: #fff;
	    border: 1px solid #eaeaea;
	    box-shadow: 0 0 25px #cac6c6;
	    .title {
	      margin: 0px auto 40px auto;
	      text-align: center;
	      color: #505458;
	    }
    }
}
  
</style>