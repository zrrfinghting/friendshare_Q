import {get,post, del} from '../../api/api'
import {BOOKLIST,BOOKINFO,BOOKLISTBYTYPE,HOTBOOK,CHEAPBOOK,NEWBOOK,SEARCHBOOK,SEARCHPARAMS,PEOPLELIKE,YOULIKE,CHEAPALLBOOK,HOTAllBOOK} from './mutation_types'
export default {
	
	//获取所有图书
	getBookList({commit},params) {
		return new Promise((resolve, reject) => {
			get('book/getByPage',params)
	        .then(res => {
	        	commit(BOOKLIST, res);
	            resolve(res);
	        })
	    });
	},
	
	//根据分类获取书籍(新书推荐)
	getBookListByTypeId({commit},params) {
		return new Promise((resolve, reject) => {
			get('book/getBooksByTypeId',params)
	        .then(res => {
	        	commit(BOOKLISTBYTYPE, res);
	            resolve(res);
	        })
	    });
	},
	
	//根据分类获取书籍（读者推荐）
	getPeopleLike({commit},params) {
		return new Promise((resolve, reject) => {
			get('book/getBooksByTypeId',params)
	        .then(res => {
	        	commit(PEOPLELIKE, res);
	            resolve(res);
	        })
	    });
	},
	
	//根据分类获取书籍（猜您喜欢）
	getYouLike({commit},params) {
		return new Promise((resolve, reject) => {
			get('order/getTopSell',params)
	        .then(res => {
	        	commit(YOULIKE, res);
	            resolve(res);
	        })
	    });
	},
	
	//根据图书编号获取图书
	getBook({commit},params) {
		return new Promise((resolve, reject) => {
			get('book/getBookByBookId',params)
	        .then(res => {
	        	commit(BOOKINFO, res);
	            resolve(res);
	        })
	    });
	},
	
	//热门书籍
	getHotBook({commit},params) {
		return new Promise((resolve, reject) => {
			get('order/getTopSell',params)
	        .then(res => {
	        	commit(HOTBOOK, res);
	            resolve(res);
	        })
	    });
	},
	
	//所有热门书籍
	getAllHotBook({commit},params) {
		return new Promise((resolve, reject) => {
			get('order/getTopSell',params)
	        .then(res => {
	        	commit(HOTAllBOOK, res);
	            resolve(res);
	        })
	    });
	},
	
	//特价书籍
	getCheapBook({commit},params) {
		return new Promise((resolve, reject) => {
			get('book/getDiscount',params)
	        .then(res => {
	        	commit(CHEAPBOOK, res);
	            resolve(res);
	        })
	    });
	},
	
	//所有特价书籍
	getAllCheapBook({commit},params) {
		return new Promise((resolve, reject) => {
			get('book/getDiscount',params)
	        .then(res => {
	        	commit(CHEAPALLBOOK, res);
	            resolve(res);
	        })
	    });
	},
	
	//最新书籍
	getNewBook({commit},params) {
		return new Promise((resolve, reject) => {
			get('book/getByPage',params)
	        .then(res => {
	        	commit(NEWBOOK, res);
	            resolve(res);
	        })
	    });
	},
	//最新书籍
	searchBook({commit},params) {
		return new Promise((resolve, reject) => {
			get('book/queryByTypeIdAndKeyword',params)
	        .then(res => {
	        	commit(SEARCHBOOK, res);
	            resolve(res);
	        })
	    });
	},
	
	//记录查询条件
	searchParams({commit},params) {
		return new Promise((resolve, reject) => {
	        	commit(SEARCHPARAMS,params);
	    });
	},
}

