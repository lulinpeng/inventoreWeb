/*
 *  客户相关接口
 */
import axios from '@/utils/http'
import baseURL from '@/utils/baseURL'


const customer = {
    getCustomerList(){
        return axios.get(baseURL.url + '/customer/lists');
    },
    addCustomer(params){
        return axios.post(baseURL.url + '/customer', JSON.stringify(params))
    },
    updateCustomer(params){
        return axios.post(baseURL.url + '/customer/item', JSON.stringify(params))
    }
}



export default customer