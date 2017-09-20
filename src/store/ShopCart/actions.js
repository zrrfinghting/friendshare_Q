import {get, post, del} from '../../api/api'
import {MYCART} from './mutation_types'
export default {
	//添加至购物车
	addToShopCart({commit},params) {
		return new Promise((resolve, reject) => {
			post('shopCart/addToShopCart',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	
	//获取购物车商品信息
	getCartByUserCode({commit},params) {
		return new Promise((resolve, reject) => {
			get('shopCart/getCartByUserCode',params)
	        .then(res => {
	        	commit(MYCART, res);
	            resolve(res);
	        })
	    });
	},
	
	//删除购物车商品
	deleteShopCart({commit},params) {
		return new Promise((resolve, reject) => {
			del('shopCart/deleteShopCart',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	
	//修改购物车商品信息
	editShopCart({commit},params) {
		return new Promise((resolve, reject) => {
			post('shopCart/editShopCart',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	
	//删除购物车商品
	emptyShopCart({commit},params) {
		return new Promise((resolve, reject) => {
			del('shopCart/emptyShopCart',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	
}

