import axios from 'axios';
import {Host} from './Host';
import { Loading } from 'element-ui';
const platformUser = sessionStorage.getItem('platformUser')?JSON.parse(sessionStorage.getItem('platformUser')):'';
var api = axios.create({
    headers: {
    	'user_id':platformUser.userCode,
    	'content-type': 'application/json;charset=utf-8',
    	'token':platformUser.token,
    },
    //baseURL:`${Host}`,
});
export function post(url, params) {
	let loadingInstance = Loading.service({ fullscreen: true,text:'拼命加载中' });
    return new Promise((resolve, reject) => {
        api.post('/api/'+url, params)
        .then(response => {
            resolve(response.data);
            //延迟加载
            setTimeout(() => {
		     	loadingInstance.close();
		    }, 300);
        })
        .catch((error) => {
          console.log(error)
           reject(error)
        })
    })
}

export function get(url, params) {
	let loadingInstance = Loading.service({ fullscreen: true,text:'拼命加载中' });
	return new Promise((resolve, reject) => {
        api.get('/api/'+url, {params: params})
        .then(response => {
            resolve(response.data);
            setTimeout(() => {
		     	loadingInstance.close();
		    }, 300);
        })
        .catch((error) => {
          console.log(error)
           reject(error)
        })
    });
}

export function del(url, params) {
	let loadingInstance = Loading.service({ fullscreen: true,text:'拼命加载中' });
	return new Promise((resolve, reject) => {
        api.delete('/api/'+url, {params: params})
        .then(response => {
            resolve(response.data);
            setTimeout(() => {
		     	loadingInstance.close();
		    }, 300);
        })
        .catch((error) => {
          console.log(error)
           reject(error)
        })
    });
}




