export default {
	bookList: (state) => {
		return state.bookList;
	},
	bookInfo: (state)=> {
		return state.bookInfo;
	},
	bookListByType: (state)=> {
		return state.bookListByType;
	},
	hotBook: (state)=> {
		return state.hotBook;
	},
	hotAllBook: (state)=> {
		return state.hotAllBook;
	},
	cheapBook: (state)=> {
		return state.cheapBook;
	},
	cheapAllBook: (state)=> {
		return state.cheapAllBook;
	},
	newBook: (state)=> {
		return state.newBook;
	},
	searchBook: (state)=> {
		return state.searchBook;
	},
	searchParams:(state)=>{
		return state.searchParams;
	},
	peopleLike:(state)=>{
		return state.peopleLike;
	},
	youLike:(state)=>{
		return state.youLike;
	},
}
