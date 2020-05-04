
let admin = [
    {
        name: '账户信息',
        id: 'basicInfo',
        icon: 'el-icon-s-home',
        sub: [{
            name: '个人信息',
            componentName: 'UserHome'
        }]
    },
    {
        name: '采购管理',
        id: 'purchasing',
        icon: 'el-icon-s-order',
        sub: [{
            name: '供应商管理',
            componentName: 'SuppliersManagement'
        },{
            name: '采购订单',
            componentName: 'PurchaseOrderManagement'
        },{
            name: '采购退货',
            componentName: 'PurchaseReturnManagement'
        }]
    },
    {
        name: '销售管理',
        id: 'selling',
        icon: 'el-icon-s-order',
        sub: [{
            name: '顾客管理',
            componentName: 'CustomersManagement'
        },{
            name: '销售订单',
            componentName: 'SaleOrderManagement'
        },{
            name: '销售退货',
            componentName: 'SaleReturnManagement'
        }]
    },
    {
        name: '库存管理',
        id: 'stock',
        icon: 'el-icon-s-shop',
        sub: [{
            name: '查看库存',
            componentName: 'StockManagement'
        },{
            name: '采购审核',
            componentName: 'PurchasingAudit',
        },{
            name: '销售审核',
            componentName: 'SalesAudit',
        }]
    },
    {
        name: '系统管理',
        id: 'system',
        icon: 'el-icon-setting',
        sub: [{
            name: '用户管理',
            componentName: 'UsersManagement'
        },{
            name: '商品管理',
            componentName: 'ProductsManagement'
        },{
            name: '注销',
            componentName: 'LogOut'
        }]
    }
]

let purchase =  [
    {
        name: '账户信息',
        id: 'basicInfo',
        icon: 'el-icon-s-home',
        sub: [{
            name: '个人信息',
            componentName: 'UserHome'
        }]
    },
    {
        name: '采购管理',
        id: 'purchasing',
        icon: 'el-icon-s-order',
        sub: [{
            name: '供应商管理',
            componentName: 'SuppliersManagement'
        },{
            name: '采购订单',
            componentName: 'PurchaseOrderManagement'
        },{
            name: '采购退货',
            componentName: 'PurchaseReturnManagement'
        }]
    },
    {
        name: '库存管理',
        id: 'stock',
        icon: 'el-icon-s-shop',
        sub: [{
            name: '查看库存',
            componentName: 'StockManagement'
        }]
    },
    {
        name: '系统管理',
        id: 'system',
        icon: 'el-icon-setting',
        sub: [{
            name: '注销',
            componentName: 'LogOut'
        }]
    }
]

let sale =  [
    {
        name: '账户信息',
        id: 'basicInfo',
        icon: 'el-icon-s-home',
        sub: [{
            name: '个人信息',
            componentName: 'UserHome'
        }]
    },
    {
        name: '销售管理',
        id: 'selling',
        icon: 'el-icon-s-order',
        sub: [{
            name: '顾客管理',
            componentName: 'CustomersManagement'
        },{
            name: '销售订单',
            componentName: 'SaleOrderManagement'
        },{
            name: '销售退货',
            componentName: 'SaleReturnManagement'
        }]
    },
    {
        name: '库存管理',
        id: 'stock',
        icon: 'el-icon-s-shop',
        sub: [{
            name: '查看库存',
            componentName: 'StockManagement'
        }]
    },
    {
        name: '系统管理',
        id: 'system',
        icon: 'el-icon-setting',
        sub: [{
            name: '注销',
            componentName: 'LogOut'
        }]
    }
]

let stock =  [
    {
        name: '账户信息',
        id: 'basicInfo',
        icon: 'el-icon-s-home',
        sub: [{
            name: '个人信息',
            componentName: 'UserHome'
        }]
    },
    {
        name: '库存管理',
        id: 'stock',
        icon: 'el-icon-s-shop',
        sub: [{
            name: '查看库存',
            componentName: 'StockManagement'
        },{
            name: '采购审核',
            componentName: 'PurchasingAudit',
        },{
            name: '销售审核',
            componentName: 'SalesAudit',
        }]
    },
    {
        name: '系统管理',
        id: 'system',
        icon: 'el-icon-setting',
        sub: [{
            name: '注销',
            componentName: 'LogOut'
        }]
    }
]

module.exports = {
    admin,
    purchase,
    sale,
    stock
}