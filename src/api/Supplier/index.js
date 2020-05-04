/*
 *  供应商相关接口
 */
import axios from '@/utils/http'
import baseURL from '@/utils/baseURL'

const supplier = {
    getSupplierLists(){
        return axios.get(baseURL.url + '/supplier/lists');
    },
    addSupplier(params){
        return axios.post(baseURL.url + '/supplier', JSON.stringify(params))
    },
    updateSupplier(params){
        return axios.post(baseURL.url + '/supplier/item', JSON.stringify(params))
    }
}



export default supplier