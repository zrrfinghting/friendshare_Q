import {
	MYRECLAIMLIST,
	RECLAIMINFO
} from './mutation_types'
	  
export default {
	[MYRECLAIMLIST](state, data) {
        state.myReclaimList= data;
   	},
   	[RECLAIMINFO](state, data) {
        state.reclaimInfo= data;
   	},
}
