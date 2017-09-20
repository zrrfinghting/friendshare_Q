import {MYORDERLIST,ORDERINFO} from './mutation_types'
	  
export default {
		[MYORDERLIST](state,data) {
				state.myOrderList = data;
		},
		[ORDERINFO](state,data) {
				state.orderInfo = data;
		},
}
