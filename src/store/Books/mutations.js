import {BOOKLIST, BOOKINFO,BOOKLISTBYTYPE,HOTBOOK,CHEAPBOOK,NEWBOOK,SEARCHBOOK,SEARCHPARAMS,PEOPLELIKE,YOULIKE,CHEAPALLBOOK,HOTAllBOOK} from './mutation_types'
	  
export default {
		[BOOKLIST](state,data) {
			state.bookList = data;
		},
		[BOOKINFO](state, data) {
			state.bookInfo = data;	
		},
		[BOOKLISTBYTYPE](state, data) {
			state.bookListByType = data;	
		},
		[HOTBOOK](state, data) {
			state.hotBook = data;	
		},
		[CHEAPBOOK](state, data) {
			state.cheapBook = data;	
		},
		[NEWBOOK](state, data) {
			state.newBook = data;	
		},
		[SEARCHBOOK](state, data) {
			state.searchBook = data;	
		},
		[SEARCHPARAMS](state, data) {
			state.searchParams = data;	
		},
		[PEOPLELIKE](state, data) {
			state.peopleLike = data;	
		},
		[YOULIKE](state, data) {
			state.youLike = data;	
		},
		[CHEAPALLBOOK](state, data) {
			state.cheapAllBook = data;	
		},
		[HOTAllBOOK](state, data) {
			state.hotAllBook = data;	
		},
}
