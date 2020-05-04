/*
 *  销售订单相关接口
 */
import axios from '@/utils/http'
import baseURL from '@/utils/baseURL'
// import qs from 'qs'

const purchaseOrder = {
    addOrder(params){
        return axios.post(baseURL.url + "/purchaseOrder",JSON.stringify(params))
    },
    getPurchaseOrderList(params){
        return axios.get(baseURL.url + "/purchaseOrder/orderList",
            {
                params: {
                    type: params,
                }
            })
    },
    getPurchaseOrderListByStatus(params){
        return axios.get(baseURL.url + "/purchaseOrder/orderList/audit",
            {
                params: {
                    status: params,
                }
            })
    },
    deletePurchaseOrder(params){
        return axios.delete(baseURL.url + "/purchaseOrder",
            {
                params:{
                    id: params
                }
            })
    },
    updateOrder(params){
        return axios.post(baseURL.url + "/purchaseOrder/item", JSON.stringify(params))
    }
}

export default  purchaseOrder