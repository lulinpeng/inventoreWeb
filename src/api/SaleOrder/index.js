/*
 *  销售订单相关接口
 */
import axios from '@/utils/http'
import baseURL from '@/utils/baseURL'
// import qs from 'qs'

const saleOrder = {
    addOrder(params){
        return axios.post(baseURL.url + "/saleOrder",JSON.stringify(params))
    },
    getSaleOrderListByType(params){
        return axios.get(baseURL.url + "/saleOrder/orderList",
            {
                params: {
                    type: params,
                }
            })
    },
    getSaleOrderListByStatus(params){
        return axios.get(baseURL.url + "/saleOrder/orderList/audit",
            {
                params: {
                    status: params,
                }
            })
    },
    deleteOrder(params){
        return axios.delete(baseURL.url + "/saleOrder",
            {
                params:{
                    id: params
                }
            })
    },
    updateOrder(params){
        return axios.post(baseURL.url + "/saleOrder/item", JSON.stringify(params))
    }
}

export default  saleOrder