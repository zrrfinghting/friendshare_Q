import {USERLIST,USERINFO,RECORDTIME} from './types'
	  
export default {
		[USERLIST](state,data) {
				state.userList = data;
		},
		[USERINFO](state,data){
				state.userInfo = data;
		},
		[RECORDTIME](state,data){
				state.recordTime = data;
		},
}
