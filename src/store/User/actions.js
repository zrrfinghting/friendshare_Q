import {USERLIST,USERINFO,RECORDTIME} from './types'
import {get,post,del} from '../../api/api'

export default {
	//验证码计时
	addRecordTime({commit},params){
		commit(RECORDTIME, params)
	},
	
	//发送验证码
	sendVerifyCode({commit},params){
		return new Promise((resolve, reject) => {
			get('email/sendVerifyCode',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	
	//获取所有
	getUserList({commit},params){
		return new Promise((resolve, reject) => {
			get('user/getByPage',params)
	        .then(res => {
	        	commit(USERLIST, res)
	            resolve(res);
	        })
	    });
	},
	
	//获取用户信息
	getUser({commit},params){
		return new Promise((resolve, reject) => {
			get('user/getUserByUserCode',params)
	        .then(res => {
	        	commit(USERINFO, res)
	            resolve(res);
	        })
	    });
	},
	
	//忘记密码重置
	resetPsw({commit},params){
		return new Promise((resolve, reject) => {
			post('user/resetPsw',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	
	//新增
	addUser({commit},params){
		const roles = params.roles;
		delete params.roles;
		return new Promise((resolve, reject) => {
			post('user/addUser?roles='+roles,params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	//修改
	editUser({commit},params){
		const roles = params.roles;
		delete params.roles;
		delete params.updateDate;
		return new Promise((resolve, reject) => {
			post('user/editUser?roleIds='+roles,params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	//修改密码
	changeUserPsw({commit},params){
		return new Promise((resolve, reject) => {
			post('user/changeUserPsw',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	//登入
	requestLogin({commit},params){
		return new Promise((resolve, reject) => {
			post('user/login',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	
	//验证用户是否存在
	existsUserCode({commit},params){
		return new Promise((resolve, reject) => {
			get('user/existsUserCode',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
}

