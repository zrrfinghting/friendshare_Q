import {get} from '../../api/api'
import {BOOKTYPETREE, BOOKTYPEINFO} from './mutation_types'
export default {
	//获取分类树
	getBookTypeTree({commit},params) {
		return new Promise((resolve, reject) => {
			get('bookType/getTree',params)
	        .then(res => {
	        	commit(BOOKTYPETREE, res);
	            resolve(res);
	        })
	    });
	},
	//通过typeId获取
	getBookTypeById({commit},params) {
		return new Promise((resolve, reject) => {
			get('bookType/getBookTypeByTypeId',params)
	        .then(res => {
	        	commit(BOOKTYPEINFO, res);
	            resolve(res);
	        })
	    });
	},
}
