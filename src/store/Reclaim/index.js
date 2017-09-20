import actions from './actions.js';
import mutations from './mutations.js';
import getters from './getters.js';
//初始化状态
const state = {
	myReclaimList: [],//分页获取wide回收单数据
	reclaimInfo:'',
}
export default {
    state,
    getters,
    actions,
    mutations
}