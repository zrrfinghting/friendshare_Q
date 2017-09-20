import {get,post, del} from '../../api/api'
import {MYRECLAIMLIST,RECLAIMINFO} from './mutation_types'

export default {
    //分页获取回我的收单
    getMyReclaimList: ({commit}, params)=> {
    	return new Promise((resolve, reject) => {
			get('reclaim/getByPage',params)
	        .then(res => {
	        	commit(MYRECLAIMLIST,res);
	            resolve(res);
	        })
	    }); 
    },
    
    //新增回收单
	addRetrieve({commit},params){
		return new Promise((resolve, reject) => {
			post('reclaim/saveRetrieve',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	
	//根据id获取回收单
    getReclaimById: ({commit}, params)=> {
    	return new Promise((resolve, reject) => {
			get('reclaim/queryRetrieveById',params)
	        .then(res => {
	        	commit(RECLAIMINFO,res);
	            resolve(res);
	        })
	    }); 
    },
}

