<template>
    <div class="divClass">
        <!--        header     -->
        <el-page-header  content="采购订单列表">
        </el-page-header>
<!--        添加采购订单-->
        <div class="addOrder">
            <el-button size="mini" type="primary" class="MyButton" @click="showAddDialog"> <i class="el-icon-circle-plus-outline"></i> 添加订单 </el-button>
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
                        <el-form-item label="供应商Id">
                            <span>{{ props.row.supplierId }}</span>
                        </el-form-item>
                        <el-form-item label="供应商名称">
                            <span>{{ props.row.supplierName }}</span>
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
                    prop="purchaseOrderId"
                    label="订单编号"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="productName"
                    label="商品名称"
                    width="120">
            </el-table-column>
<!--            <el-table-column-->
<!--                    prop="productId"-->
<!--                    label="商品Id"-->
<!--                    width="120">-->
<!--            </el-table-column>-->
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
                        <el-tag v-show="scope.row.status === 4"
                                key="AuditFailure"
                                type="danger"
                                effect="dark">
                            终止
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
                            v-show="scope.row.status === 1 || scope.row.status === 2 || scope.row.status === 3"
                            size="mini"
                            type=""
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    <el-button
                            v-show="scope.row.status === 1"
                            size="mini"
                            type="primary"
                            @click="commitOrder(scope.$index, scope.row)">提交审核</el-button>
                    <el-button
                            v-show="scope.row.status === 2"
                            size="mini"
                            type="danger"
                            @click="cancelCommitOrder(scope.$index, scope.row)">取消审核</el-button>
                    <el-button
                            v-show="scope.row.status === 3"
                            size="mini"
                            type="danger"
                            @click="handleReturnOrder(scope.$index, scope.row)">退货</el-button>
                </template>
            </el-table-column>
        </el-table>
<!--        添加订单表单-->
        <el-dialog title="创建订单" :visible.sync="addDialogVisible">
            <el-form :model="formAdd" >
                <el-form-item label="商品Id" :label-width="formLabelWidth" datatype="">
                    <div class="MySelect">
                        <el-select  class="MySelect" v-model.number="formAdd.productId" auto-complete="off" placeholder="选择商品">
                            <el-option v-for="item in products" :key=item.productId :label="item.productId" :value=item.productId >{{item.productName}}</el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="商品名称" :label-width="formLabelWidth">
                    <el-input v-model="formAdd.productName" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="供应商Id" :label-width="formLabelWidth" datatype="">
                    <div class="MySelect">
                        <el-select  class="MySelect" v-model.number="formAdd.supplierId" auto-complete="off" placeholder="选择商品">
                            <el-option v-for="item in suppliers" :key=item.supplierId :label="item.supplierId" :value=item.supplierId >{{item.supplierName}}</el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="供应商名称" :label-width="formLabelWidth">
                    <el-input v-model="formAdd.supplierName" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="单价（元）" :label-width="formLabelWidth">
                    <el-input v-model.number="formAdd.unitPrice" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="数量（个）" :label-width="formLabelWidth">
                    <el-input v-model.number="formAdd.number" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="总价（元）" :label-width="formLabelWidth">
                    <el-input v-model="formAdd.totalPrice" autocomplete="off" :disabled="true" style="{color: red}"></el-input>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth">
                    <el-input v-model="formAdd.description" autocomplete="off" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAdd">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import store from "@/store"
    export default {
        name: "PurchaseOrderManagement",
        store,
        data(){
            return {
                orders: [{
                    purchaseOrderId: 1,
                    productId: 1,
                    productName: "jiubei",
                    supplierId: 1,
                    supplierName: "momogongsi",
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
                    purchaseOrderId: null,
                    productId: null,
                    productName: null,
                    supplierId: null,
                    supplierName: null,
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
                suppliers: [],
                products: [],
                formLabelWidth: '120px',
                addDialogVisible: false,
            }
        },
        mounted: function(){
            console.log("store:  " , store)
            this.getPurchaseOrderList(1)
        },
        watch: {
            'formAdd.productId': {
              handler(val, oldVal){
                  console.log(val, oldVal)
                  this.products.forEach(item => {
                      if(item.productId == val)
                          this.formAdd.productName = item.productName
                  })
              },
              deep: true,
              immediate: true
            },
            'formAdd.supplierId': {
                handler(val, oldVal){
                    console.log(val, oldVal)
                    this.suppliers.forEach(item => {
                        if(item.supplierId == val)
                            this.formAdd.supplierName = item.supplierName
                    })
                },
                deep: true,
                immediate: true
            },
            'formAdd.unitPrice': {
                handler(val, oldVal){
                    console.log(val, oldVal)
                    this.formAdd.totalPrice = this.formAdd.unitPrice * this.formAdd.number
                },
                deep: true,
                immediate: true
            },
            'formAdd.number': {
                handler(val, oldVal){
                    console.log(val, oldVal)
                    this.formAdd.totalPrice = this.formAdd.unitPrice * this.formAdd.number
                },
                deep: true,
                immediate: true
            },

        },
        methods: {
            showAddDialog(){
                this.getSupplierList();
                this.getProductsList();
                this.addDialogVisible = true;
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleAdd(){
                if(store.state.user == null){
                    this.formAdd.creator = "admin"
                }else {
                    this.formAdd.creator = store.state.user.username
                }
                // console.log(store.state.user.username)
                console.log(this.formAdd)
                this.$api.purchaseOrder.addOrder(this.formAdd).then(res => {
                    if(res.status === 200){
                        this.getPurchaseOrderList(1)
                    }
                })
                this.addDialogVisible = false;
            },
            handleDelete(index, row) {
                console.log(index, row);
                this.$api.purchaseOrder.deletePurchaseOrder(row.purchaseOrderId).then(res => {
                    if(res.status === 200){
                        this.getPurchaseOrderList(1)
                    }
                })
            },
            showEditDialog(index, row){
                console.log(index, row);

            },
            getSupplierList() {
                this.$api.supplier.getSupplierLists().then(res => {
                    this.suppliers = res.data.data
                })
            },
            getProductsList() {
                return this.$api.product.getProductsList().then(res => {
                    this.products = res.data.data;
                })
            },
            getPurchaseOrderList(params) {
                return this.$api.purchaseOrder.getPurchaseOrderList(params).then(res => {
                    this.orders = res.data.data

                })
            },
            commitOrder(index, row) {
                console.log(index, row)
                row.status = 2
                this.$api.purchaseOrder.updateOrder(row).then(res => {
                    if(res.status === 200){
                        this.getPurchaseOrderList(1)
                    }
                })
            },
            cancelCommitOrder(index, row){
                console.log(index, row)
                row.status = 1
                this.$api.purchaseOrder.updateOrder(row).then(res => {
                    if(res.status === 200){
                        this.getPurchaseOrderList(1)
                    }
                })
            },
            handleReturnOrder(index,row){
                console.log(index, row)
                // 修改订单类型和状态
                row.type = 2
                row.status = 2
                this.$api.purchaseOrder.updateOrder(row).then(res => {
                    if(res.status === 200){
                        this.getPurchaseOrderList(1)
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