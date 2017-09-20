import {ORDERGOODS,CARTGOODS,BUYGOODS} from './types'
import {get,post,del} from '../../api/api'

export default {
	//获取购物车结算商品
	toOrder({commit},params){
    	commit(ORDERGOODS, params)
   },
	//加入购物车
	toCart({commit},params){
    	commit(CARTGOODS, params)
   },
	//立即购买
	toBuy({commit},params){
    	commit(BUYGOODS, params)
   },
	
	//立即购买
	toBuy1(){
		
	}
}

