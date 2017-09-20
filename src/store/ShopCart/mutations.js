import {MYCART} from './mutation_types'
	  
export default {
		[MYCART](state,data) {
				state.myCart = data;
		},
}
