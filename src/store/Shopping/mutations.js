import {ORDERGOODS,CARTGOODS,BUYGOODS} from './types'
	  
export default {
		[ORDERGOODS](state,data) {
				state.orderGoods = data;
		},
		[CARTGOODS](state,data) {
				state.cartGoods = data;
		},
		[BUYGOODS](state,data) {
				state.buyGoods = data;
		},
}
