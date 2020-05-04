<template>
    <div class="divClass">
        <!--        header     -->
        <el-page-header  content="待审核订单列表">
        </el-page-header>
        <!--        添加采购订单-->
        <div class="addOrder">
            <el-button disabled size="mini" type="primary" class="MyButton" > <i class="el-icon-circle-plus-outline"></i> 添加订单 </el-button>
        </div>
        <!--        订单展示列表-->
        <el-table
                :data="orders"
                height="100%"
                stripe
                style="width: 100%">
            <el-table-column type="expand" style="{width: 100%}">
                <template slot-scope="props">
                    <el-form label-position="left"  class="demo-table-expand">
                        <el-form-item label="商品名称">
                            <span>{{ props.row.productName }}</span>
                        </el-form-item>
                        <el-form-item label="客户Id">
                            <span>{{ props.row.customerId }}</span>
                        </el-form-item>
                        <el-form-item label="客户名称">
                            <span>{{ props.row.customerName }}</span>
                        </el-form-item>
                        <el-form-item label="单价（元）">
                            <span>{{ props.row.unitPrice }}</span>
                        </el-form-item>
                        <el-form-item label="数量（个）">
                            <span>{{ props.row.number }}</span>
                        </el-form-item>
                        <el-form-item label="总价（元）">
                            <span>{{ props.row.totalPrice }}</span>
                        </el-form-item>
                        <el-form-item label="创建人">
                            <span>{{ props.row.creator }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{ props.row.createTime }}</span>
                        </el-form-item>
                        <el-form-item label="订单描述">
                            <span>{{ props.row.description }}</span>
                        </el-form-item>
                        <el-form-item label="审核时间">
                            <span>{{ props.row.auditTime }}</span>
                        </el-form-item>
                        <el-form-item label="审核人">
                            <span>{{ props.row.auditor }}</span>
                        </el-form-item>
                        <el-form-item label="审核结果">
                            <span>{{ props.row.auditResult}}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    prop="saleOrderId"
                    label="订单编号"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="productName"
                    label="商品名称"
                    width="120">
            </el-table-column>
            <el-table-column label="订单类型" width="100">
                <template slot-scope="scope" >
                    <div>
                        <el-tag v-show="scope.row.type === 1"
                                key="sale"
                                type="success"
                                effect="dark">
                            销售
                        </el-tag>
                        <el-tag v-show="scope.row.type === 2"
                                key="return"
                                type="info"
                                effect="dark">
                            退货
                        </el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="订单状态" width="100">
                <template slot-scope="scope" >
                    <div>
                        <el-tag v-show="scope.row.status === 1"
                                key="waitCommit"
                                type="info"
                                effect="dark">
                            待提交
                        </el-tag>
                        <el-tag v-show="scope.row.status === 2"
                                key="waitAudit"
                                type="primary"
                                effect="dark">
                            待审核
                        </el-tag>
                        <el-tag v-show="scope.row.status === 3"
                                key="AfterAudit"
                                type="success"
                                effect="dark">
                            已完成
                        </el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="creator"
                    label="创建人"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="创建时间"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="描述"
                    width="120">
            </el-table-column>
            <el-table-column label="操作" min-width="150">
                <template slot-scope="scope">
                    <el-button
                            v-show="scope.row.status === 2"
                            size="mini"
                            type="primary"
                            @click="auditSuccess(scope.$index, scope.row)">审核通过</el-button>
                    <el-button
                            v-show="scope.row.status === 2"
                            size="mini"
                            type="danger"
                            @click="auditFailure(scope.$index, scope.row)">审核失败</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import store from "@/store"
    export default {
        name: "SalesAudit",
        store,
        data(){
            return {
                orders: [{
                    saleOrderId: 1,
                    productId: 1,
                    productName: "jiubei",
                    customerId: 1,
                    customerName: "momogongsi",
                    unitPrice: 100,
                    number: 1000,
                    totalPrice: 100000,
                    description: '测试',
                    status: 1,
                    auditor: "",
                    auditResult: "",
                    auditTime: "",
                    creator: "",
                    createTime: "2016-08-20",
                    type: "",
                }],
                formAdd: {
                    saleOrderId: null,
                    productId: null,
                    productName: null,
                    customerId: null,
                    customerName: null,
                    unitPrice: null,
                    number: null,
                    totalPrice: null,
                    description: null,
                    status: 1,
                    auditor: "",
                    auditResult: "",
                    auditTime: "",
                    creator: "",
                    createTime: null,
                    type: 1,
                },
                customers: [],
                products: [],
                formLabelWidth: '120px',
                addDialogVisible: false,
            }
        },
        mounted: function(){
            console.log("store:  " , store)
            this.getOrderList(2)
        },
        methods: {

            getOrderList(params) {
                return this.$api.saleOrder.getSaleOrderListByStatus(params).then(res => {
                    this.orders = res.data.data
                    console.log("orders: ",res.data.date)
                })
            },
            auditSuccess(index, row) {
                console.log(index, row)
                row.status = 3
                if(store.state.user == null){
                    row.auditor = "admin"
                }else {
                    row.auditor = store.state.user.username
                }
                this.$api.saleOrder.updateOrder(row).then(res => {
                    if(res.status === 200){
                        this.getOrderList(2)
                    }
                })
            },
            auditFailure(index, row){
                console.log(index, row)
                row.status = 4
                if(store.state.user == null){
                    row.auditor = "admin"
                }else {
                    row.auditor = store.state.user.username
                }
                this.$api.saleOrder.updateOrder(row).then(res => {
                    if(res.status === 200){
                        this.getOrderList(2)
                    }
                })
            }
        }
    }
</script>

<style>
    .el-table__header-wrapper{
        line-height: 20px;
    }
    .el-dialog__header {
        height: 40px;
    }
    .el-dialog__header {
        position: relative;
        top: -20px;
    }
    .addOrder {
        /*margin-left: 0px;*/
        width: 100px;
        height: 40px;
    }
    .dialog-footer {
        height: 40px;
        position: relative;
        top: -80px;
    }
    .el-button {
        margin-left: 0px;
        top: -60px;
    }
    .MyButton {
        position: relative;
        top: -60px;
    }
    .MyRadio {
        margin-left: 0px;
        width: 200px;
    }
    .div {
        height: 80%;
    }
    .divClass {
        height: 80%;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .MySelect {
        width: 200px;
    }
</style>