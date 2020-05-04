/*
 *  商品相关接口
 */
import axios from '@/utils/http'
import baseURL from '@/utils/baseURL'
// import qs from 'qs'

const product = {
    getProductsList(){
        return axios.get(baseURL.url + '/product/lists');
    },
    addProduct(params){
        return axios.post(baseURL.url + '/product', JSON.stringify(params))
    },
    updateProduct(params){
        return axios.post(baseURL.url + '/product/item', JSON.stringify(params))
    }

}

export default product
