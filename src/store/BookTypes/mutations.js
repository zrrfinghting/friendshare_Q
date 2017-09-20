import {BOOKTYPETREE, BOOKTYPEINFO} from './mutation_types'
	  
export default {
		[BOOKTYPETREE](state,data) {
			state.bookTypeTree = data;
		},
		[BOOKTYPEINFO](state,data) {
			state.bookTypeInfo = data;
		}
}
