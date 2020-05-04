/*
 * 所有API对外界提供的访问方式
 */
import user from '@/api/user'
import product from '@/api/product'
import customer from "@/api/Customer";
import supplier from "@/api/Supplier";
import purchaseOrder from "@/api/PurchaseOrder";
import saleOrder from "@/api/SaleOrder";

export default {
    user,
    product,
    customer,
    supplier,
    purchaseOrder,
    saleOrder
}