/*
 * user 模块相关接口
 */
import axios from '@/utils/http'
import baseURL from '@/utils/baseURL'
import qs from 'qs'

const user = {
    Login(params){
        return axios.post(baseURL.url + '/login?' + qs.stringify(params))
    },
    logout(){
        return axios.delete(baseURL.url + '/logout')
    },
    getUserInfoByName(param){
        return axios.get(baseURL.url + '/user',
            {params: {username: param}})
    },
    getUsersList() {
        return axios.get(baseURL.url + '/user/lists');
    },
    addUser(params){
        console.log("params: += " , JSON.stringify(params))
        return axios.post(baseURL.url + '/user', JSON.stringify(params))
    },
    updateUser(params){
        return axios.post(baseURL.url + '/user/item', JSON.stringify(params))
    }
}

export  default user