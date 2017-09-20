import actions from './actions';
import mutations from './mutations';
import getters from './getters';
//初始化状态
const state = {
	bookList: [],
	bookInfo: {},
	bookListByType:[],
	hotBook: [],
	cheapBook: [],
	newBook: [],
	searchBook:[],
	searchParams:'',
	peopleLike:[],
	youLike:[],
	cheapAllBook:[],
	hotAllBook:[],
}
export default {
    state,
    getters,
    actions,
    mutations
}