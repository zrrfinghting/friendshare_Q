import {get, post, del} from '../../api/api'
import {MYORDERLIST,ORDERINFO} from './mutation_types'
export default {
	//新增订单
	addOrder({commit},params) {
		return new Promise((resolve, reject) => {
			post('order/addOrder',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	
	//根据用户id,订单分类获取订单号（我的订单）
	getMyOrderList({commit},params) {
		return new Promise((resolve, reject) => {
			get('order/getAllByUserCodeAndState',params)
	        .then(res => {
	        	commit(MYORDERLIST, res);
	            resolve(res);
	        })
	    });
	
	},
	
	//订单详情
	getOrderByOrderId({commit},params) {
		return new Promise((resolve, reject) => {
			get('order/getOrderByOrderId',params)
	        .then(res => {
	        	commit(ORDERINFO, res);
	            resolve(res);
	        })
	    });
	},
	
	//修改订单状态
	changeOrderState({commit},params) {
		return new Promise((resolve, reject) => {
			post('order/changeOrderState',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	}
}

